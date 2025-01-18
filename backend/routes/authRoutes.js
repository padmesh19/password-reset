const express = require("express");
const authController = require("../controllers/authController");
const authRouter = express.Router();

//Register User
authRouter.post("/register", authController.register);

// Forget Password
authRouter.post("/forget-password", authController.forgetPassword);

// Verify Token and Reset Password
authRouter.post("/reset-password", authController.resetPassword);

module.exports = authRouter;
