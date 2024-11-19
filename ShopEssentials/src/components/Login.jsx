import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/Shopping-logo.webp";
import axios from "axios";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { LoginRoutes } from "../utils/APIRoutes";
import 'react-toastify/dist/ReactToastify.css';

const Login = ({ setIsloggedIn }) => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    password: ""
  });

  const SubmitHandler = async (e) => {
    e.preventDefault();
    if (Validation()) {
      console.log("login details", LoginRoutes);
      const { email, password } = values;
      const { data } = await axios.post(LoginRoutes, {
        email,
        password
      });

      if (!data.status) {
        toast.error("Incorrect login credentials");
      } else {
        toast.success("Logged in successfully");
        console.log("data", data);
        localStorage.setItem("shop-essential", JSON.stringify(data.user));
        setIsloggedIn(true);
        navigate("/dashboard");
      }
    } else {
      toast.error("Incorrect data");
    }
  };

  function ChangeHandler(e) {
    setValues({
      ...values,
      [e.target.name]: e.target.value
    });
  }

  function Validation() {
    const { email, password } = values;
    if (email === "") {
      toast.error("Please enter a valid email", toastOptions);
      return false;
    } else if (password.length < 5) {
      toast.error("Password length should be greater than 5 characters", toastOptions);
      return false;
    }
    return true;
  }

  const toastOptions = {
    position: "bottom-right",
    autoClose: 2000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark"
  };

  function AdminSubmit() {
    navigate("/adminlogin");
  }

  return (
    <div className="w-screen bg-slate-900 h-screen flex justify-center items-center">
      <form
        onSubmit={(e) => SubmitHandler(e)}
        className="w-[420px] border-slate-700 rounded-lg bg-slate-500 flex flex-col mx-auto items-center justify-center space-y-6 p-6"
      >
        <div className="flex items-center space-x-4">
          <img src={logo} alt="Logo" width={50} />
          <h1 className="text-xl text-white font-semibold">Login</h1>
        </div>
        
        <div className="flex flex-col w-full space-y-4">
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter Your E-mail"
            className="p-2 rounded-md text-black"
            value={values.email}
            onChange={(e) => ChangeHandler(e)}
            required
          />
          
          <input
            type="password"
            name="password"
            placeholder="Enter your Password"
            className="p-2 rounded-md text-black"
            value={values.password}
            onChange={(e) => ChangeHandler(e)}
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white py-2 rounded-md w-full hover:bg-blue-600 transition-all"
        >
          Sign In
        </button>

        <div className="text-center text-white">
          <p>
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-400 underline">Sign Up</Link>
          </p>
        </div>

        <div className="text-center">
          <button
            onClick={AdminSubmit}
            className="bg-gray-500 text-white py-2 rounded-md mt-4 w-full hover:bg-gray-600 transition-all"
          >
            Admin Login
          </button>
        </div>
      </form>

      <ToastContainer />
    </div>
  );
};

export default Login;
