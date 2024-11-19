import { useState } from "react";
import logo from "../assets/Shopping-logo.webp";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import cart from "../assets/cart-148964_1920.png";

const Navbar = (props) => {
  const navigate = useNavigate();
  const { cartCount } = props;
  let isLoggedIn = props.isLoggedIn;
  let setIsloggedIn = props.setIsloggedIn;
  const [isOpen, setIsOpen] = useState(false);

  function toggleMenu() {
    setIsOpen(!isOpen);
  }

  return (
    <nav className="bg-gray-800 text-white fixed top-0 left-0 w-full z-10 shadow-lg">
      <div className="w-full">
      <div className="flex  justify-between items-center h-14 bg-slate-950 text-white px-4 sm:px-8 md:px-12">
        {/* Logo and Title */}
        <div className="flex items-center gap-4">
          <img src={logo} alt="Logo" width={40} />
          <Link to="/" className="font-bold text-xl">
            ShopEssential
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/adminlogin"> Admin login</Link>
        </div>

        {/* Cart and User Authentication */}
        <div className="flex gap-4 items-center">
          <Link
            to="/addtocart"
            className="flex items-center gap-1 bg-green-500 text-white px-3 py-2 rounded-sm hover:bg-green-400 transition-all duration-200 ease-in-out"
          >
            <img src={cart} alt="cart" width={20} />
            <span>{cartCount}</span>
          </Link>

          {/* Conditional Rendering for Login/Signup/Logout */}
          {!isLoggedIn && (
            <>
              <Link to="/login">
                <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-all">
                  Login
                </button>
              </Link>

              <Link to="/signup">
                <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-all">
                  Signup
                </button>
              </Link>
            </>
          )}

          {isLoggedIn && (
            <>
              <Link to="/dashboard">
                <button className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700 transition-all">
                  Dashboard
                </button>
              </Link>

              <Link to="/">
                <button
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-all"
                  onClick={() => {
                    
                    navigate("/login")
                    
                    setIsloggedIn(false);
                  }}
                >
                  Logout
                </button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white"
          onClick={toggleMenu}
        >
          <span className="text-2xl">&#9776;</span>
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-800 text-white absolute top-14 left-0 w-full p-4 z-40">
          <ul className="flex flex-col gap-4">
            <Link to="/" onClick={toggleMenu}>
              Home
            </Link>
            <Link to="/about" onClick={toggleMenu}>
              About
            </Link>
            <Link to="/contact" onClick={toggleMenu}>
              Contact
            </Link>
            {!isLoggedIn && (
              <>
                <Link to="/login" onClick={toggleMenu}>
                  Login
                </Link>
                <Link to="/signup" onClick={toggleMenu}>
                  Signup
                </Link>
              </>
            )}
            {isLoggedIn && (
              <>
                <Link to="/dashboard" onClick={toggleMenu}>
                  Dashboard
                </Link>
                <Link to="/" onClick={() => {
                
                  setIsloggedIn(false);
                  toggleMenu();
                }}>
                  Logout
                </Link>
              </>
            )}
          </ul>
        </div>
      )}

      <ToastContainer />
    </div>
    </nav>
  );
};

export default Navbar;
