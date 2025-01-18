const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const User = require("../models/User");

const router = express.Router();

// Forget Password
router.post("/forget-password", async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ error: "User not found" });

  const resetToken = crypto.randomBytes(32).toString("hex");
  const tokenExpiry = Date.now() + 3600000; // 1 hour

  user.resetToken = resetToken;
  user.resetTokenExpiry = tokenExpiry;
  await user.save();

  const resetLink = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: { user: process.env.EMAIL, pass: process.env.EMAIL_PASSWORD },
  });

  await transporter.sendMail({
    from: process.env.EMAIL,
    to: user.email,
    subject: "Password Reset Request",
    html: `<h3>Click <a href="${resetLink}">here</a> to reset your password. The link expires in 1 hour.</h3>`,
  });

  res.json({ message: "Password reset email sent!" });
});

// Verify Token and Reset Password
router.post("/reset-password", async (req, res) => {
  const { resetToken, newPassword } = req.body;

  const user = await User.findOne({
    resetToken,
    resetTokenExpiry: { $gt: Date.now() },
  });
  if (!user) return res.status(400).json({ error: "Invalid or expired token" });

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  user.password = hashedPassword;
  user.resetToken = undefined;
  user.resetTokenExpiry = undefined;

  await user.save();
  res.json({ message: "Password reset successfully!" });
});

module.exports = router;
