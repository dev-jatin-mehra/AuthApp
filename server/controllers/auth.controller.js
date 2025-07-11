import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import transporter from "../config/nodeMailer.js";

//Register Api
export const register = async (req, res) => {
  const { name, email, password } = req.body;

  //Null Check
  if (!name || !email || !password)
    return res.json({ success: false, message: "Missing Details" });

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ success: false, message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    // Token Generation
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // Cookie store for 7 days
    });

    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: "🎉 Welcome to Macu Auth! (Experimental)",
      html: `
    <div style="font-family: Arial, sans-serif; background: #f9fafb; max-width: 600px; margin: auto; padding: 20px; border-radius: 12px;">
      <div style="text-align: center;">
        <img src="https://media.giphy.com/media/du3J3cXyzhj75IOgvA/giphy.gif" 
             alt="Welcome ${name}" 
             style="width: 120px; margin-bottom: 20px;" />
        <h2 style="color: #1f2937;">Welcome to <span style="color: #6366f1;">Macu Auth</span> 👋</h2>
        <p style="font-size: 16px; color: #4b5563;">
          We're thrilled to have you on board. 🎉
          <br /><br />
          Macu Auth helps you securely log in, register, and manage sessions with ease. You're all set to verify your email and get started.
        </p>
        <p style="margin-top: 30px; font-size: 14px; color: #9ca3af;">
          Need help? Just reply to this email or visit our support page.
        </p>
        <p style="margin-top: 30px; font-size: 12px; color: #d1d5db;">
          © ${new Date().getFullYear()} Macu Auth. All rights reserved.
        </p>
      </div>
    </div>
  `,
    };

    await transporter.sendMail(mailOptions);

    return res.json({ success: true });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Login Api function
export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.json({ success: false, message: "Enter the credentials" });

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "Invalid email" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.json({ success: false, message: "Invalid password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // Cookie store for 7 days
    });

    return res.json({ success: true });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

//Logout Api function
export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    });
    return res.json({ success: true, message: "Logged Out" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

//sendOtp Api function
export const sendVerifyOtp = async (req, res) => {
  try {
    const { userId } = req.body;

    const user = await User.findById(userId);
    if (user.isVerified) {
      return res.json({ success: false, message: "Account already verified" });
    }

    const otp = String(Math.floor(100000 + Math.random() * 900000));

    user.verifyOtp = otp;
    user.verifyOtpExpireAt = Date.now() + 24 * 60 * 60 * 1000;
    await user.save();

    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: "🔐 Verify Your Macu Auth Account",
      html: `
    <div style="font-family: Arial, sans-serif; background-color: #f4f4f5; padding: 20px; border-radius: 10px; max-width: 600px; margin: auto;">
      <div style="text-align: center;">
        <img src="https://media.giphy.com/media/fxsqOYnIMEefC/giphy.gif" alt="Macu Auth Logo" style="width: 80px; margin-bottom: 20px;" />
        <h2 style="color: #1f2937;">Verify Your Email Address</h2>
        <p style="color: #4b5563; font-size: 16px;">
          To complete your registration with <strong>Macu Auth</strong>, please use the verification code below:
        </p>
        <div style="margin: 30px auto; background-color: #111827; color: #ffffff; width: fit-content; padding: 15px 30px; border-radius: 8px; font-size: 24px; letter-spacing: 5px;">
          ${otp}
        </div>
        <p style="color: #6b7280; font-size: 14px;">
          This code is valid for a limited time. If you didn’t request this, please ignore this email.
        </p>
        <p style="margin-top: 40px; font-size: 12px; color: #9ca3af;">
          © ${new Date().getFullYear()} Macu Auth. All rights reserved.
        </p>
      </div>
    </div>
  `,
    };

    await transporter.sendMail(mailOptions);
    res.json({
      success: true,
      message: `Verification Otp sent to ${user.email}`,
    });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

//verifyOtp Api function
export const verifyemail = async (req, res) => {
  const { userId, otp } = req.body;

  if (!userId || !otp) {
    return res.json({ success: false, message: "Missing Details" });
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.json({ success: false });
    }

    if (user.verifyOtp === "" || user.verifyOtp !== otp) {
      return res.json({ success: false, message: "Invalid OTP" });
    }

    if (user.verifyOtpExpireAt < Date.now()) {
      return res.json({ success: false, message: "OTP Expired" });
    }

    user.isVerified = true;
    user.verifyOtp = "";
    user.verifyOtpExpireAt = 0;
    await user.save();
    return res.json({ success: true, message: "Verification Complete" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

//Checking the Auth State Api function
export const isAuth = async (req, res) => {
  try {
    return res.json({ success: true });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

// Send the password reset OTP Api function
export const sendResetOtp = async (req, res) => {
  const { email } = req.body;

  if (!email) return res.json({ success: false, message: "Email is Required" });

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User not found !" });
    }

    const otp = String(Math.floor(100000 + Math.random() * 900000));

    user.resetOtp = otp;
    user.resetOtpExpireAt = Date.now() + 15 * 60 * 1000;

    await user.save();

    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: "🔐 Reset Your Password - OTP Inside",
      html: `
    <div style="font-family: Arial, sans-serif; background-color: #f9fafb; padding: 20px; max-width: 600px; margin: auto; border-radius: 8px;">
      <div style="text-align: center;">
        <img src="https://media.giphy.com/media/pa37AAGzKXoek/giphy.gif" alt="Logo" style="width: 60px; margin-bottom: 20px;" />
        <h2 style="color: #111827;">Reset Your Password</h2>
        <p style="color: #4b5563; font-size: 16px;">
          We received a request to reset the password for your account associated with this email.
        </p>
        <p style="margin: 20px 0; font-size: 16px; color: #1f2937;">
          Use the following OTP to proceed:
        </p>
        <div style="margin: 20px auto; background-color: #111827; color: #ffffff; display: inline-block; padding: 15px 30px; font-size: 24px; letter-spacing: 4px; border-radius: 6px;">
          ${otp}
        </div>
        <p style="color: #6b7280; font-size: 14px; margin-top: 30px;">
          This code is valid for a limited time. If you didn’t request this, please ignore this email.
        </p>
        <p style="margin-top: 40px; font-size: 12px; color: #9ca3af;">
          © ${new Date().getFullYear()} Macu Auth. All rights reserved.
        </p>
      </div>
    </div>
  `,
    };

    await transporter.sendMail(mailOptions);

    return res.json({ success: true, message: "Otp sent to your email" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

//Reset user Password Api function
export const resetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;

  if (!email || !otp || !newPassword)
    return res.json({ success: false, message: "Are the fields are requried" });
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    if (user.resetOtp === "" || user.resetOtp !== otp) {
      return res.json({ success: false, message: "Otp is incorrect" });
    }

    if (user.resetOtpExpireAt < Date.now()) {
      return res.json({ success: false, message: "OTP Expired" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    user.resetOtp = "";
    user.resetOtpExpireAt = 0;

    await user.save();

    return res.json({
      success: true,
      message: "Password has been reset successfully",
    });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};
