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

  const totalItems = cart.length;

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

        {/* Desktop Menu + Profile */}
        <div className="hidden md:flex items-center gap-6">
          {/* Menu Links */}
          <div className="flex gap-6 text-lg font-medium items-center">
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
          </div>

          {/* Profile Dropdown */}
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
                  onClick={() => {
                    navigate("/profile");
                    setDropdownOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Profile Info & Your orders
                </button>
                <button
                  onClick={() => {
                    toggleTheme();
                    setDropdownOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
                </button>
                <button
                  onClick={() => {
                    handleLogout();
                    setDropdownOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile: Profile + Hamburger */}
        <div className="md:hidden flex items-center gap-4">
          {/* Profile Dropdown */}
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
                  onClick={() => {
                    navigate("/profile");
                    setDropdownOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Profile Info & Your orders
                </button>
                <button
                  onClick={() => {
                    toggleTheme();
                    setDropdownOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
                </button>
                <button
                  onClick={() => {
                    handleLogout();
                    setDropdownOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Logout
                </button>
              </div>
            )}
          </div>

          {/* Hamburger Menu */}
          <button className="text-2xl" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? "✖" : "☰"}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden w-full bg-green-600 dark:bg-gray-900 shadow-md flex flex-col items-start px-6 py-4 gap-4 z-40">
          <NavLink
            to="/home"
            className={navLinkClass}
            onClick={() => setIsOpen(false)}
          >
            Home
          </NavLink>
          <NavLink
            to="/products"
            className={navLinkClass}
            onClick={() => setIsOpen(false)}
          >
            Products
          </NavLink>
          <NavLink
            to="/about"
            className={navLinkClass}
            onClick={() => setIsOpen(false)}
          >
            About
          </NavLink>
          {user?.email !== "admin123@gmail.com" && (
            <NavLink
              to="/cart"
              className={navLinkClass}
              onClick={() => setIsOpen(false)}
            >
              Cart
              {totalItems > 0 && (
                <span className="ml-1 bg-yellow-400 text-black text-xs font-bold px-2 py-0.5 rounded-full">
                  {totalItems}
                </span>
              )}
            </NavLink>
          )}
          <NavLink
            to="/blog"
            className={navLinkClass}
            onClick={() => setIsOpen(false)}
          >
            Blog
          </NavLink>
        </div>
      )}
    </>
  );
}

export default Navbar;
