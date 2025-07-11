import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets.js";
import { AppContext } from "../context/AppContext.jsx";
import axios from "axios";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import { toast } from "react-toastify";

const Login = () => {
  const { backend, setisLoggedIn, getUserData } = useContext(AppContext);
  const [state, setState] = useState("Sign Up");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  console.log({ backend }); // to debug

  const onSubmitHandle = async (e) => {
    try {
      e.preventDefault();

      axios.defaults.withCredentials = true;

      if (state === "Sign Up") {
        const { data } = await axios.post(backend + "/api/auth/register", {
          name,
          email,
          password,
        });

        if (data.success) {
          setisLoggedIn(true);
          getUserData();
          navigate("/");
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(backend + "/api/auth/login", {
          email,
          password,
        });

        if (data.success) {
          setisLoggedIn(true);
          getUserData();
          navigate("/");
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-white">
      <img
        onClick={() => {
          navigate("/");
        }}
        src={assets.logo}
        alt=""
        className="absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer"
      />
      <div
        className="bg-white/10 backdrop-blur-lg border border-white/20
        p-10 rounded-xl shadow-xl w-full sm:w-96 text-indigo-300 text-sm"
      >
        <h2 className="text-3xl font-semibold text-slate-700 text-center mb-3">
          {state === "Sign Up" ? "Create  Account" : "Log In"}
        </h2>
        <p className="text-center text-sm mb-6 text-blue-600">
          {state === "Sign Up"
            ? "Create Your Account"
            : "Log In To Your Account"}
        </p>

        <form onSubmit={onSubmitHandle}>
          {state === "Sign Up" && (
            <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-white/20 backdrop-blur-sm border border-black/30 shadow-inner focus:outline-none focus:ring-2 focus:ring-indigo-400">
              <img src={assets.person_icon} alt="" />
              <input
                onChange={(e) => {
                  setName(e.target.value);
                }}
                value={name}
                type="text"
                placeholder="Full Name"
                className="w-full px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-md text-slate-700 placeholder:text-gray-400 outline-none border border-white/20 shadow-sm"
                required
              />
            </div>
          )}

          <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-white/20 backdrop-blur-sm border border-black/30 shadow-inner focus:outline-none focus:ring-2 focus:ring-indigo-400">
            <img src={assets.mail_icon} alt="" />
            <input
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              value={email}
              type="email"
              placeholder="Email Id"
              className="w-full px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-md text-slate-700 placeholder:text-gray-400 outline-none border border-white/20 shadow-sm"
              required
            />
          </div>
          <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-white/20 backdrop-blur-sm border border-black/30 shadow-inner focus:outline-none focus:ring-2 focus:ring-indigo-400">
            <img src={assets.lock_icon} alt="" />
            <input
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              value={password}
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-md text-slate-700 placeholder:text-gray-400 outline-none border border-white/20 shadow-sm"
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

          {state === "Login" && (
            <p
              onClick={() => {
                navigate("/reset-password");
              }}
              className="mb-4 text-blue-600 cursor-pointer"
            >
              Forgot Password ?
            </p>
          )}

          <button className="w-full py-3 bg-gradient-to-r from-indigo-400 via-blue-500 to-indigo-600 rounded-full text-white font-semibold shadow-md hover:brightness-110 transition">
            {state}
          </button>
        </form>

        {state === "Sign Up" ? (
          <p className="text-slate-700 text-center text-xs mt-4">
            Already Have an Account?{" "}
            <span
              onClick={() => {
                setState("Login");
              }}
              className="text-blue-600 cursor-pointer underline"
            >
              Login Here
            </span>
          </p>
        ) : (
          <p className="text-slate-700 text-center text-xs mt-4">
            Don't Have an Account?{" "}
            <span
              onClick={() => {
                setState("Sign Up");
              }}
              className="text-blue-600 cursor-pointer underline"
            >
              SignUp
            </span>
          </p>
        )}
      </div>
    </div>
  );
};

export default Login;
