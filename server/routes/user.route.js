import express from "express";
import { getUserData } from "../controllers/user.controller.js";
import extractToken from "../middleware/extractToken.js";

const userRouter = express.Router();

userRouter.get("/data", extractToken, getUserData);

export default userRouter;
