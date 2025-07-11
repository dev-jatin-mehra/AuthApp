import React, { useContext } from "react";
import { assets } from "../assets/assets.js";
import { AppContext } from "../context/AppContext.jsx";

function Header() {
  const { userData } = useContext(AppContext);

  return (
    <div className="flex flex-col items-center mt-20 px-4 text-center text-gray-800">
      <img
        src={assets.header_img}
        alt=""
        className="w-36 h-36 rounded-full mb-6"
      />

      <h1 className="flex items-center gap-2 text-xl sm:text-3xl font-medium mb-2">
        Hey {userData ? userData.name : "Developer"} !{" "}
        <img src={assets.hand_wave} alt="" className="w-8 aspect-square" />{" "}
      </h1>

      <h2 className="text-3xl sm:text-5xl font-semibold mb-4">
        Welcome to our app{" "}
      </h2>

      <div className="backdrop-blur-md bg-white/20 border border-white/30 shadow-lg rounded-xl px-6 py-4 mb-8 max-w-md text-center">
        <p className="text-black">
          We’re excited to have you here! Explore features, manage your account,
          and start your journey with us
        </p>
      </div>

      <button className="border border-gray-500 rounded-full px-8 py-2.5 hover:bg-gray-200 transition-all">
        Get Started
      </button>
    </div>
  );
}

export default Header;
