import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/Shopping-logo.webp";
import cart from "../assets/cart-148964_1920.png";
import { FiMenu } from "react-icons/fi";
import { toast } from "react-toastify";

const Navbar = ({ cartCount, isLoggedIn, setIsloggedIn }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    setIsloggedIn(false);
    toast.success("Logged out successfully");
    navigate("/login");
  };

  return (
    <nav className="bg-[#020617] overflow-y-hidden w-screen  text-white fixed top-0 left-0  z-50 shadow-md">
      <div className="flex justify-between  items-center h-12 px-4 sm:px-8 md:px-12">
        {/* Logo + Title */}
        <div className="flex items-center gap-3">
          <img src={logo} alt="Logo" className="w-10 h-auto" />
          <Link to="/" className="text-xl font-bold tracking-wide">
            Shop<span className="text-green-400">Essential</span>
          </Link>
        </div>

        {/* Right Side - Buttons */}
        <div className="hidden md:flex gap-3 items-center">
          <Link
            to="/addtocart"
            className="flex items-center gap-2 bg-green-600 hover:bg-green-500 px-3 py-2 rounded transition"
          >
            <img src={cart} alt="Cart" className="w-5 h-5" />
            <span>{cartCount}</span>
          </Link>

          {!isLoggedIn ? (
            <>
              <Link to="/login">
                <button className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded transition">
                  Login
                </button>
              </Link>
              <Link to="/signup">
                <button className="bg-gray-100 text-black hover:bg-gray-200 px-4 py-2 rounded transition">
                  Signup
                </button>
              </Link>
            </>
          ) : (
            <>
              <Link to="/dashboard">
                <button className="bg-yellow-500 hover:bg-yellow-400 px-4 py-2 rounded transition">
                  Dashboard
                </button>
              </Link>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-500 px-4 py-2 rounded transition"
              >
                Logout
              </button>
            </>
          )}
        </div>

        {/* Mobile Menu Icon */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={toggleMenu}
          aria-label="Toggle Menu"
        >
          <FiMenu className="text-2xl" />
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-slate-800 text-white w-full px-6 py-4 flex flex-col gap-4 transition-all duration-300">
          <Link to="/" onClick={toggleMenu}>
            Home
          </Link>
          <Link to="/about" onClick={toggleMenu}>
            About
          </Link>
          <Link to="/contact" onClick={toggleMenu}>
            Contact
          </Link>

          {!isLoggedIn ? (
            <>
              <Link to="/login" onClick={toggleMenu}>
                Login
              </Link>
              <Link to="/signup" onClick={toggleMenu}>
                Signup
              </Link>
            </>
          ) : (
            <>
              <Link to="/dashboard" onClick={toggleMenu}>
                Dashboard
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  toggleMenu();
                }}
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
