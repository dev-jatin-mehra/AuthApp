import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.route.js";

const app = express();
const port = process.env.PORT || 4000;

const allowedOrigins = [
  "http://localhost:5173",
  "https://macu-auth.vercel.app",
]; 

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: allowedOrigins, credentials: true })); // Send the cookies in response from express app

app.get("/", (req, res) => {
  res.send("Auth Backend");
});

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

app.listen(port, () => {
  try {
    console.log(`Server started on PORT : ${port}`);
    connectDB();
  } catch (error) {
    console.log(`Server Connection Error at PORT : ${port}`);
    process.exit(1);
  }
});
