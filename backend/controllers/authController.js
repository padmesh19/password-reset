const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const User = require("../models/User");
const { EMAIL, EMAIL_PASSWORD, FRONTEND_URL } = require("../utils/config");

const authController = {
  register: async (req, res) => {
    try {
      // get the details from the request body
      const { email, password } = req.body;

      // validate the email
      const user = await User.findOne({ email });

      // if the email is already in use, send a response
      if (user) {
        return res.status(400).json({ message: "Email already in use" });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a model object
      const newUser = new User({ email, password: hashedPassword });

      // Save the user to the database
      await newUser.save();

      // Send a response
      res.status(201).json({ message: "Registration successful" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  forgetPassword: async (req, res) => {
    try {
      const { email } = req.body;

      const user = await User.findOne({ email });
      if (!user) return res.status(404).json({ error: "User not found" });

      const resetToken = crypto.randomBytes(32).toString("hex");
      const tokenExpiry = Date.now() + 3600000; // 1 hour

      user.resetToken = resetToken;
      user.resetTokenExpiry = tokenExpiry;
      await user.save();
      const resetLink = `${FRONTEND_URL}/reset-password/${resetToken}`;
      const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: { user: EMAIL, pass: EMAIL_PASSWORD },
      });

      await transporter.sendMail({
        from: EMAIL,
        to: user.email,
        subject: "Password Reset Request",
        html: `<h3>Click <a href="${resetLink}">here</a> to reset your password. The link expires in 1 hour.</h3>`,
      });

      res.json({ message: "Password reset email sent!" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  resetPassword: async (req, res) => {
    try {
      const { resetToken, newPassword } = req.body;

      const user = await User.findOne({
        resetToken,
        resetTokenExpiry: { $gt: Date.now() },
      });
      if (!user)
        return res.status(400).json({ error: "Invalid or expired token" });

      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
      user.resetToken = undefined;
      user.resetTokenExpiry = undefined;

      await user.save();
      res.json({ message: "Password reset successfully!" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = authController;
