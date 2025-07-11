import React, { useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets.js";
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext";
import axios from "axios";

const VerifyEmail = () => {
  axios.defaults.withCredentials = true;
  const navigate = useNavigate();
  const { backend, isLoggedIn, userData, getUserData } = useContext(AppContext);

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

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      const otpArray = inputRef.current.map((e) => {
        return e.value;
      }); // input field data in the otpArray
      const otp = otpArray.join("");
      const { data } = await axios.post(backend + "/api/auth/verify-account", {
        otp,
      });

      if (data.success) {
        toast.success(data.message);
        getUserData();
        navigate("/");
      } else {
        console.log("OTP Error Response:", data);
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    // to study more about this
    if (!isLoggedIn || (userData && userData.isVerified)) {
      // route protection logic (to some extent)
      navigate("/");
    }
  }, [isLoggedIn, userData, navigate]);

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
      <form
        action=""
        className="backdrop-blur-lg bg-white/10 border border-white/20 p-8 rounded-xl shadow-2xl w-96 text-sm"
        onSubmit={onSubmitHandler}
      >
        <h1 className="text-slate-600 text-center text-2xl font-semibold mb-4">
          Email Verify Otp
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
          verify
        </button>
      </form>
    </div>
  );
};

export default VerifyEmail;
