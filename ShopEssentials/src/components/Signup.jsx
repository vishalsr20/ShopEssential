import { useState } from "react";
import logo from "../assets/Shopping-logo.webp";
import { Link, useNavigate } from "react-router-dom";
import { FaRegEye, FaEyeSlash } from "react-icons/fa";
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
    if (name === "") {
      toast.error("Please fill in all fields");
      return false;
    } else if (email === "") {
      toast.error("Please provide an email");
      return false;
    } else if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return false;
    }
    return true;
  };

  return (
    <div className="flex justify-center items-center bg-slate-900 h-screen">
      <div className="w-[420px] bg-slate-800 p-6 rounded-xl shadow-lg">
        <form onSubmit={submitHandler} className="space-y-4">
          {/* Logo and Header */}
          <div className="flex justify-center items-center gap-2 mb-4">
            <img src={logo} alt="Logo" className="w-8" />
            <h1 className="text-2xl text-white font-semibold">Sign Up</h1>
          </div>

          {/* Name Input */}
          <div>
            <input
              type="text"
              placeholder="Enter your name"
              name="name"
              value={values.name}
              onChange={ChangeHandler}
              className="w-full p-3 bg-slate-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Email Input */}
          <div>
            <input
              type="email"
              placeholder="Enter your email"
              name="email"
              value={values.email}
              onChange={ChangeHandler}
              className="w-full p-3 bg-slate-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Password Input */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              name="password"
              value={values.password}
              onChange={ChangeHandler}
              className="w-full p-3 bg-slate-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <span
              className="absolute right-3 top-3 cursor-pointer"
              onClick={togglePassword}
            >
              {showPassword ? (
                <FaRegEye className="text-white" />
              ) : (
                <FaEyeSlash className="text-white" />
              )}
            </span>
          </div>

          {/* Confirm Password Input */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Confirm your password"
              name="confirmPassword"
              value={values.confirmPassword}
              onChange={ChangeHandler}
              className="w-full p-3 bg-slate-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full p-3 bg-green-600 text-white rounded-md hover:bg-green-500 transition-all"
          >
            Sign Up
          </button>

          {/* Already have an account */}
          <div className="text-center text-white">
            <p>
              Have an account?{" "}
              <Link to="/login" className="text-green-500 hover:underline">
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>

      <ToastContainer />
    </div>
  );
};

export default Signup;
