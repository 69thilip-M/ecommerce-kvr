// src/components/Navbar.jsx
import { NavLink, useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useState, useEffect, useRef } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useCart } from "../context/CartContext";
import logo from "../assets/images/kmrlogo.png";

function Navbar() {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [showBanner] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const auth = getAuth();
  const { cart } = useCart();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, setUser);
    return () => unsubscribe();
  }, [auth]);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    navigate("/");
  };

  const navLinkClass = ({ isActive }) =>
    isActive
      ? "text-yellow-300 font-semibold"
      : "hover:text-yellow-300 transition";

  // ✅ Cart count = number of unique items
  const totalItems = cart.length;

  // ✅ Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      {/* 🔥 Top Offer Banner */}
      {showBanner && (
        <div className="w-full bg-yellow-400 text-black font-bold overflow-hidden relative">
          <div className="marquee flex whitespace-nowrap">
            <span className="mx-8">
              🎉 First Order Offer! Get{" "}
              <span className="text-red-600">20% OFF</span> on all products 🎉
            </span>
            <span className="mx-8">
              🌞 Every <span className="text-red-600">Sunday</span> is a Holiday
              – Shop Anytime Online!
            </span>
          </div>
        </div>
      )}

      {/* Navbar */}
      <nav className="bg-green-600 dark:bg-gray-900 text-white px-6 py-4 shadow-md flex items-center justify-between w-full relative">
        {/* Logo */}
        <NavLink to="/home" className="flex items-center gap-2">
          <img src={logo} alt="KMR Logo" className="h-10 w-10 object-cover" />
          <span className="text-2xl font-bold">KMR</span>
        </NavLink>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6 text-lg font-medium items-center">
          <NavLink to="/home" className={navLinkClass}>
            Home
          </NavLink>
          <NavLink to="/products" className={navLinkClass}>
            Products
          </NavLink>
          <NavLink to="/about" className={navLinkClass}>
            About
          </NavLink>

          {user?.email !== "admin123@gmail.com" && (
            <NavLink to="/cart" className={navLinkClass}>
              Cart
              {totalItems > 0 && (
                <span className="ml-1 bg-yellow-400 text-black text-xs font-bold px-2 py-0.5 rounded-full">
                  {totalItems}
                </span>
              )}
            </NavLink>
          )}

          <NavLink to="/blog" className={navLinkClass}>
            Blog
          </NavLink>

          {/* ✅ Profile Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <img
              src={
                user?.photoURL ||
                "https://cdn-icons-png.flaticon.com/512/847/847969.png"
              }
              alt="Profile"
              className="h-10 w-10 rounded-full cursor-pointer border-2 border-white"
              onClick={() => setDropdownOpen((prev) => !prev)}
            />

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 text-black dark:text-white rounded-lg shadow-lg py-2 z-50">
                <button
                  onClick={() => navigate("/profile")}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Profile Info & Your orders
                </button>
                {/* <button
                  onClick={() => navigate("/orders")}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Your Orders
                </button> */}
                <button
                  onClick={toggleTheme}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
                </button>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? "✖" : "☰"}
        </button>
      </nav>
    </>
  );
}

export default Navbar;
