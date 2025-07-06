import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/Shopping-logo.webp";
import login from "../assets/login2.jpg";
import axios from "axios";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { LoginRoutes } from "../utils/APIRoutes";
import "react-toastify/dist/ReactToastify.css";
import { Eye, EyeOff } from "lucide-react";
import { FaGoogle, FaFacebookF } from "react-icons/fa";




const Login = ({ setIsloggedIn }) => {
  const navigate = useNavigate();
  const [values, setValues] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const toastOptions = {
    position: "bottom-right",
    autoClose: 2000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const Validation = () => {
    const { email, password } = values;
    if (!email) {
      toast.error("Please enter a valid email", toastOptions);
      return false;
    } else if (password.length < 5) {
      toast.error("Password must be at least 5 characters", toastOptions);
      return false;
    }
    return true;
  };

  const ChangeHandler = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const SubmitHandler = async (e) => {
    e.preventDefault();
    if (Validation()) {
      try {
        const { email, password } = values;
        const { data } = await axios.post(LoginRoutes, { email, password });

        if (!data.status) {
          toast.error("Incorrect login credentials", toastOptions);
        } else {
          toast.success("Logged in successfully", toastOptions);
          localStorage.setItem("shop-essential", JSON.stringify(data.user));
          setIsloggedIn(true);
          navigate("/dashboard");
        }
      } catch (error) {
        toast.error("Something went wrong. Try again.", toastOptions);
      }
    }
  };

  const AdminSubmit = () => {
    navigate("/adminlogin");
  };

  return (
    <div className="h-screen bg-gray-300 flex items-center justify-center mt-6 px-4 py-10">
      <div className="w-full max-w-4xl flex flex-col md:flex-row rounded-2xl shadow-2xl overflow-hidden bg-white">
        
        {/* Left Side - Hidden on small screens */}
        <div
          className="hidden md:flex w-1/2 relative bg-cover bg-center flex-col px-6 py-10 justify-between"
          style={{ backgroundImage: `url(${login})` }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-60 z-0 rounded-l-2xl"></div>

          {/* Logo top-left */}
          <div className="relative z-10 flex items-center gap-3">
            <img src={logo} alt="Logo" className="w-10 h-10" />
            <h1 className="text-white text-xl font-semibold">Shop Essential</h1>
          </div>

          {/* Message in center */}
          <div className="relative z-10 text-center space-y-4 mt-auto mb-auto">
            <h2 className="text-3xl font-bold text-yellow-400">
              Simplify your shopping
            </h2>
            <p className="text-sm text-gray-200 max-w-xs mx-auto">
              Fast, secure, and smart — manage your account and shop with ease.
            </p>
          </div>
        </div>

        {/* Right Side */}
        <form
          onSubmit={SubmitHandler}
          className="w-full md:w-1/2 bg-[#1f2937] text-white flex flex-col justify-center px-6 py-10 space-y-6"
        >
          {/* Logo and Heading */}
          <div className="flex flex-col items-center gap-2 mb-4">
            <h1 className="text-2xl md:text-3xl font-bold">Sign In</h1>
            <p className="text-gray-400 text-sm">Enter your details below</p>
          </div>

          <div className="space-y-4">
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full px-4 py-3 bg-gray-800 text-white border border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 placeholder-gray-400"
              value={values.email}
              onChange={ChangeHandler}
              required
            />

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                className="w-full px-4 py-3 bg-gray-800 text-white border border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 placeholder-gray-400 pr-10"
                value={values.password}
                onChange={ChangeHandler}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-200"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <div className="text-right text-sm text-yellow-400 hover:underline cursor-pointer">
            <Link to="/password">Forgot Password?</Link>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-yellow-400 text-black font-semibold text-sm rounded-lg hover:bg-yellow-300 transition-all"
          >
            Sign In
          </button>

          {/* Social Buttons (below Sign In) */}
          <div className="flex gap-3 justify-center mt-4 w-full">
            <button className="flex items-center w-full justify-center gap-2 bg-yellow-400 text-black px-5 py-2 rounded-md font-semibold shadow-md hover:scale-105 hover:shadow-yellow-300 transition">
              <FaGoogle className="text-lg" />
              <span className="text-sm font-medium">Google</span>
            </button>

            <button className="flex items-center w-full justify-center gap-2 bg-yellow-400 text-black px-5 py-2 rounded-md font-semibold shadow-md hover:scale-105 hover:shadow-yellow-300 transition">
              <FaFacebookF className="text-lg" />
              <span className="text-sm font-medium">Facebook</span>
            </button>
          </div>

          {/* Signup and Admin Link */}
          <p className="text-center text-sm text-gray-400 mt-6">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-yellow-400 hover:underline">
              Sign Up
            </Link>
          </p>

          <button
            type="button"
            onClick={AdminSubmit}
            className="w-full mt-2 bg-gray-700 text-white py-3 rounded-xl hover:bg-gray-600 transition-all"
          >
            Admin Login
          </button>
        </form>
      </div>

      <ToastContainer />
    </div>
  );
};

export default Login;
