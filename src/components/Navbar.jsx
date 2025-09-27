// src/components/Navbar.jsx
import { NavLink, useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useCart } from "../context/CartContext";
import logo from "../assets/images/kmrlogo.png"; // ✅ Import your logo
import CloseIcon from "@mui/icons-material/Close"; // ✅ Material UI Close Icon
import Blog from "../pages/Blog";
function Navbar() {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [showBanner] = useState(true); // ✅ Banner visibility
  const auth = getAuth();
  const { cart } = useCart();

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

  return (
    <>
      {/* 🔥 Top Offer Banner with Close Button */}

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
            {/* <span className="mx-8">
              🎊 <span className="text-red-600">Festival Season</span> Special
              Discounts – Don’t Miss Out!
            </span>
            <span className="mx-8">
              🚚 <span className="text-red-600">Free Delivery</span> on Holidays
              & Weekends!
            </span>
            <span className="mx-8">
              🎁 Celebrate{" "}
              <span className="text-red-600">Christmas & New Year</span> with
              Big Savings!
            </span>
            <span className="mx-8">
              🌸 <span className="text-red-600">Holiday Offers</span> – Limited
              Time Only!
            </span> */}
            {/* <span className="mx-8">
              🛍️ <span className="text-red-600">Special Sale</span> Every
              Holiday – Shop & Save!
            </span> */}
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

          <NavLink to="/profile" className={navLinkClass}>
            Profile
          </NavLink>

          <NavLink to="/blog" className={navLinkClass}>
            Blog
          </NavLink>
          <button
            onClick={handleLogout}
            className="hover:text-yellow-300 transition"
          >
            Logout
          </button>

          <button
            onClick={toggleTheme}
            className="ml-4 px-3 py-1 rounded bg-white text-black dark:bg-gray-700 dark:text-white"
          >
            {theme === "light" ? "🌙 Dark" : "☀️ Light"}
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? "✖" : "☰"}
        </button>

        {/* Mobile Dropdown Menu */}
        {isOpen && (
          <div className="absolute top-full left-0 w-full bg-green-700 dark:bg-gray-800 flex flex-col gap-4 p-4 md:hidden">
            {["home", "products", "about"].map((link) => (
              <NavLink
                key={link}
                to={`/${link}`}
                className={navLinkClass}
                onClick={() => setIsOpen(false)}
              >
                {link.charAt(0).toUpperCase() + link.slice(1)}
              </NavLink>
            ))}

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
              to="/profile"
              className={navLinkClass}
              onClick={() => setIsOpen(false)}
            >
              Profile
            </NavLink>

            <button
              onClick={() => {
                handleLogout();
                setIsOpen(false);
              }}
              className="hover:text-yellow-300 transition"
            >
              Logout
            </button>

            <button
              onClick={toggleTheme}
              className="px-3 py-1 rounded bg-white text-black dark:bg-gray-700 dark:text-white"
            >
              {theme === "light" ? "Dark Mode" : "Light Mode"}
            </button>
          </div>
        )}
      </nav>
    </>
  );
}

export default Navbar;
