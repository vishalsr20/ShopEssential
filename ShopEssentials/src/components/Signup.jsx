import { useState } from "react";
import logo from "../assets/Shopping-logo.webp";
import loginImage from "../assets/login2.jpg";
import { Link, useNavigate } from "react-router-dom";
import { FaRegEye, FaEyeSlash, FaGoogle, FaFacebookF } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { SignupRoutes } from "../utils/APIRoutes";

const Signup = ({ setIsloggedIn, isLoggedIn }) => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const ChangeHandler = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (handleValidation()) {
      const { name, email, password, confirmPassword } = values;
      const { data } = await axios.post(SignupRoutes, {
        name,
        email,
        password,
        confirmPassword,
      });

      if (data.status === false) {
        toast.error("User already exists");
      } else {
        toast.success("User created successfully");
        localStorage.setItem("shop-essential", JSON.stringify(data.user));
        setIsloggedIn(true);
        navigate("/dashboard");
      }
    }
  };

  const handleValidation = () => {
    const { name, email, password, confirmPassword } = values;
    if (!name || !email || !password || !confirmPassword) {
      toast.error("Please fill in all fields");
      return false;
    } else if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return false;
    }
    return true;
  };

  return (
    <div className="h-screen bg-gray-300 flex items-center mt-6 justify-center px-4 py-10">
      <div className="w-full max-w-4xl h-auto flex flex-col md:flex-row rounded-2xl overflow-hidden shadow-2xl bg-white">

        {/* Left Side - Hidden on small screens */}
        <div
          className="hidden md:flex w-1/2 relative bg-cover bg-center flex-col px-6 py-10 justify-between"
          style={{ backgroundImage: `url(${loginImage})` }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-60 z-0 rounded-l-2xl"></div>

          {/* Logo on top-left */}
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
        <div className="w-full md:w-1/2 bg-[#1f2937] text-white flex items-center justify-center px-6 py-10">
          <div className="w-full max-w-sm">

            {/* Heading */}
            <div className="flex flex-col items-center gap-2 mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-white">Sign Up</h2>
              <p className="text-sm text-gray-400 font-medium">
                Create your new account
              </p>
            </div>

            {/* Form */}
            <form onSubmit={submitHandler} className="space-y-5">
              <input
                type="text"
                name="name"
                value={values.name}
                onChange={ChangeHandler}
                placeholder="Name"
                className="w-full px-4 py-3 bg-gray-800 text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 placeholder-gray-400"
              />

              <input
                type="email"
                name="email"
                value={values.email}
                onChange={ChangeHandler}
                placeholder="Email"
                className="w-full px-4 py-3 bg-gray-800 text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 placeholder-gray-400"
              />

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={values.password}
                  onChange={ChangeHandler}
                  placeholder="Password"
                  className="w-full px-4 py-3 bg-gray-800 text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 placeholder-gray-400"
                />
                <span
                  className="absolute right-4 top-3.5 text-yellow-400 cursor-pointer"
                  onClick={togglePassword}
                >
                  {showPassword ? <FaRegEye /> : <FaEyeSlash />}
                </span>
              </div>

              <input
                type={showPassword ? "text" : "password"}
                name="confirmPassword"
                value={values.confirmPassword}
                onChange={ChangeHandler}
                placeholder="Confirm Password"
                className="w-full px-4 py-3 bg-gray-800 text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 placeholder-gray-400"
              />

              <button
                type="submit"
                className="w-full py-3 bg-yellow-400 text-black font-semibold text-sm rounded-lg hover:bg-yellow-300 transition-all"
              >
                Sign Up
              </button>
            </form>

            {/* Social Buttons */}
            <div className="flex gap-3 justify-center mt-5 w-full">
              <button className="flex items-center w-full justify-center gap-2 bg-yellow-400 text-black px-5 py-2 rounded-md font-semibold shadow-md hover:scale-105 hover:shadow-yellow-300 transition">
                <FaGoogle className="text-lg" />
                <span className="text-sm font-medium"> Google</span>
              </button>

              <button className="flex items-center w-full justify-center gap-2 bg-yellow-400 text-black px-5 py-2 rounded-md font-semibold shadow-md hover:scale-105 hover:shadow-yellow-300 transition">
                <FaFacebookF className="text-lg" />
                <span className="text-sm font-medium"> Facebook</span>
              </button>
            </div>

            {/* Login Link */}
            <p className="mt-6 text-sm text-center text-gray-400">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-yellow-400 font-medium hover:underline"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default Signup;
