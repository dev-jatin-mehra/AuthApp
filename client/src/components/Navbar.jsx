import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets.js";
import { AppContext } from "../context/AppContext.jsx";
import { useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function Navbar() {
  const navigate = useNavigate();

  const { userData, backend, setUserData, setisLoggedIn } =
    useContext(AppContext);

  const verifyEmailViaOtp = async () => {
    try {
      axios.defaults.withCredentials = true; // to ask

      const { data } = await axios.post(backend + "/api/auth/send-verify-otp");

      if (data.success) {
        navigate("/verify-email");
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const logout = async () => {
    try {
      axios.defaults.withCredentials = true;

      const { data } = await axios.post(backend + "/api/auth/logout");

      if (data.success) {
        setUserData(null);
        setisLoggedIn(false);
        window.location.href = "/"; // full reload
        // navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="w-full flex justify-between items-center p-4 sm:p-6 sm:px-24 absolute top-0 ">
      <img src={assets.logo} alt="" className="w-28 sm:w-32" />

      {userData ? (
        <div className="w-8 h-8 flex justify-center items-center rounded-full bg-black text-white relative group">
          {userData.name[0].toUpperCase()}

          <div className="absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-10">
            <ul className="list-none m-0 pt-2 bg-gray-100 text-sm ">
              {!userData.isVerified && (
                <li
                  onClick={verifyEmailViaOtp}
                  className="py-1 px-2 hover:bg-gray-200 cursor-pointer whitespace-nowrap"
                >
                  Verify email
                </li>
              )}

              <li
                onClick={() =>
                  window.open("https://github.com/dev-jatin-mehra", "_blank")
                }
                className="px-2 py-1 hover:bg-gray-200 cursor-pointer whitespace-nowrap "
              >
                About
              </li>

              <li
                onClick={logout}
                className="px-2 py-1 hover:bg-gray-200 cursor-pointer pr-10"
              >
                Logout
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <button
          onClick={() => {
            navigate("/login");
          }}
          className="flex items-center gap-2 border border-gray-500 rounded-full px-6 py-2 text-gray-800 hover:bg-gray-200 transition-all"
        >
          Login <img src={assets.arrow_icon} alt="" />
        </button>
      )}
    </div>
  );
}

export default Navbar;
