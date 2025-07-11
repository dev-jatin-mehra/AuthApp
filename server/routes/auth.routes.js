import express from "express";
import {
  login,
  logout,
  isAuth,
  register,
  verifyemail,
  sendResetOtp,
  resetPassword,
  sendVerifyOtp,
} from "../controllers/auth.controller.js";
import extractToken from "../middleware/extractToken.js";

const authRouter = express.Router();

authRouter.post("/login", login);
authRouter.post("/logout", logout);
authRouter.post("/register", register);
authRouter.get("/isauth", extractToken, isAuth);
authRouter.post("/send-reset-otp", sendResetOtp);
authRouter.post("/reset-password", resetPassword);
authRouter.post("/verify-account", extractToken, verifyemail);
authRouter.post("/send-verify-otp", extractToken, sendVerifyOtp);

export default authRouter;
