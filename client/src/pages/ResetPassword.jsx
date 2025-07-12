import React, { useContext, useRef, useState } from "react";
import { assets } from "../assets/assets.js";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext.jsx";
import axios from "axios";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const { backend } = useContext(AppContext);

  axios.defaults.withCredentials = true;

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isEmailSent, setisEmailSent] = useState("");
  const [otp, setOtp] = useState(0);
  const [isOtpSubmitted, setisOtpSubmitted] = useState(false);

  const inputRef = useRef([]); // to study , doubt little

  const handleInput = (e, index) => {
    if (e.target.value.length > 0 && index < inputRef.current.length - 1) {
      inputRef.current[index + 1].focus(); // to move the pointer automatically in the otp boxes
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && e.target.value === "" && index > 0) {
      inputRef.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    const paste = e.clipboardData.getData("text");
    const pasteArray = paste.split("");
    pasteArray.forEach((char, index) => {
      if (inputRef.current[index]) {
        inputRef.current[index].value = char;
      }
    });
  };

  const onSubmitEmail = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(backend + "/api/auth/send-reset-otp", {
        email,
      });

      if (data.success) {
        toast.success(data.message);
        setisEmailSent(true);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const onSubmitOtp = async (e) => {
    e.preventDefault();
    try {
      const otpArray = inputRef.current.map((e) => {
        return e.value;
      }); // input field data in the otpArray
      setOtp(otpArray.join(""));
      setisOtpSubmitted(true);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const onSubmitNewPassword = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(backend + "/api/auth/reset-password", {
        email,
        otp,
        newPassword,
      });

      if (data.success) {
        toast.success("Password Reset Successfully !");
        navigate("/login");
      } else {
        toast.error(data.error);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-white">
      <img
        src={assets.logo}
        alt=""
        className="absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer"
        onClick={() => {
          navigate("/");
        }}
      />

      {/* email id input form  */}

      {!isEmailSent && (
        <form
          onSubmit={onSubmitEmail}
          action="#"
          className="backdrop-blur-lg bg-white/10 border border-white/20 p-8 rounded-xl shadow-2xl w-96 text-sm"
        >
          <h1 className="text-slate-600 text-center text-2xl font-semibold mb-4">
            Reset Password
          </h1>
          <p className="text-center mb-6 text-blue-600">
            Enter the registered email id
          </p>
          <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-white/20 backdrop-blur-sm border border-black/30 shadow-inner focus:outline-none focus:ring-2 focus:ring-indigo-400">
            <img src={assets.mail_icon} alt="" />
            <input
              type="email"
              placeholder="Email Id"
              className="w-full px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-md text-slate-700 placeholder:text-gray-400 outline-none border border-white/20 shadow-sm"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button className="w-full py-3 bg-gradient-to-r from-indigo-400 via-blue-500 to-indigo-600 rounded-full text-white font-semibold shadow-md hover:brightness-110 transition">
            Get Otp
          </button>
        </form>
      )}
      {/* otp form */}

      {!isOtpSubmitted && isEmailSent && (
        <form
          onSubmit={onSubmitOtp}
          action=""
          className="backdrop-blur-lg bg-white/10 border border-white/20 p-8 rounded-xl shadow-2xl w-96 text-sm"
        >
          <h1 className="text-slate-600 text-center text-2xl font-semibold mb-4">
            Reset Password Otp
          </h1>
          <p className="text-center mb-6 text-blue-600">
            Enter the 6 digit code sent to your email id
          </p>
          <div
            className="flex justify-between mb-8"
            onPaste={(e) => handlePaste(e)}
          >
            {Array(6)
              .fill(0)
              .map((_, index) => (
                <input
                  type="text"
                  className="w-12 h-12 text-slate-700 text-center text-xl rounded-md bg-white/20 backdrop-blur-sm border border-white/30 shadow-inner focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  maxLength="1"
                  key={index}
                  required
                  ref={(e) => (inputRef.current[index] = e)}
                  onInput={(e) => handleInput(e, index)} // to handle the manual click on each otp box
                  onKeyDown={(e) => handleKeyDown(e, index)}
                />
              ))}
          </div>
          <button className="w-full py-3 bg-gradient-to-r from-indigo-400 via-blue-500 to-indigo-600 rounded-full text-white font-semibold shadow-md hover:brightness-110 transition">
            Reset
          </button>
        </form>
      )}

      {/* new password form */}

      {isOtpSubmitted && isEmailSent && (
        <form
          onSubmit={onSubmitNewPassword}
          action="#"
          className="backdrop-blur-lg bg-white/10 border border-white/20 p-8 rounded-xl shadow-2xl w-96 text-sm"
        >
          <h1 className="text-slate-600 text-center text-2xl font-semibold mb-4">
            New Password
          </h1>
          <p className="text-center mb-6 text-blue-600">
            Enter new password for authentication
          </p>
          <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-white/20 backdrop-blur-sm border border-black/30 shadow-inner focus:outline-none focus:ring-2 focus:ring-indigo-400">
            <img src={assets.lock_icon} alt="" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="New Password"
              className="w-full px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-md text-slate-700 placeholder:text-gray-400 outline-none border border-white/20 shadow-sm"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="text-slate-700 hover:text-indigo-600"
            >
              {showPassword ? (
                <EyeSlashIcon className="h-5 w-5" />
              ) : (
                <EyeIcon className="h-5 w-5" />
              )}
            </button>
          </div>
          <button className="w-full py-3 bg-gradient-to-r from-indigo-400 via-blue-500 to-indigo-600 rounded-full text-white font-semibold shadow-md hover:brightness-110 transition">
            Update Password
          </button>
        </form>
      )}
    </div>
  );
};

export default ResetPassword;
