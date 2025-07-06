import { useState } from "react";
import image from "../assets/for pass.jpg";
import logo from "../assets/Shopping-logo.webp";

const ForgottenPassword = () => {
  const [email, setEmail] = useState("");

  return (
    <div className="h-screen flex items-center justify-center bg-slate-300 px-4">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 flex flex-col items-center">
        {/* Image with Logo Overlay */}
        <div className="relative mb-6 w-50">
          <img
            src={image}
            alt="Forgot Password Illustration"
            className="w-full h-auto rounded-md h-56 "
          />


          </div>
        {/* <div className="flex gap-2 ">
              <img
            src={logo}
            alt="Logo"
            className="w-10 h-10 "
          />
           <h1 className="text-lg mt-1 font-semibold">Shopping-Essential</h1> */}
        {/* </div> */}
        

        {/* Title */}
        <h2 className="text-2xl font-semibold text-center text-slate-800 mb-4">
          Forgot Password 
        </h2>

        {/* Form */}
        <form className="w-full flex flex-col gap-4">
          <label className="text-slate-700 text-sm" htmlFor="email">
            Enter your registered email
          </label>
          <input
            type="email"
            id="email"
            className="p-3 rounded-lg border border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-600"
            placeholder="example@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <button
            type="submit"
            className="mt-2 bg-slate-900 text-white py-2 rounded-lg hover:bg-slate-700 transition duration-300"
          >
            Send Reset Link
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgottenPassword;
