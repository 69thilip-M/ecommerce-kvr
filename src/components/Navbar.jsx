import { NavLink, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/");
  };

  const navLinkClass = ({ isActive }) =>
    isActive
      ? "text-yellow-300 font-semibold"
      : "hover:text-yellow-300 transition";

  return (
    <nav className="bg-green-600 text-white px-6 py-4 shadow-md flex items-center justify-between w-full">
      {/* Logo */}
      <NavLink
        to="/home"
        className="text-2xl font-bold flex items-center gap-2"
      >
        🌽🍎 Veggie Store
      </NavLink>

      {/* Menu Links */}
      <div className="hidden md:flex gap-6 text-lg font-medium">
        <NavLink to="/home" className={navLinkClass}>
          Home
        </NavLink>
        <NavLink to="/products" className={navLinkClass}>
          Products
        </NavLink>
        <NavLink to="/about" className={navLinkClass}>
          About
        </NavLink>
        <NavLink to="/cart" className={navLinkClass}>
          Cart
        </NavLink>
        <NavLink to="/profile" className={navLinkClass}>
          👤 Profile
        </NavLink>
        <button
          onClick={handleLogout}
          className="hover:text-yellow-300 transition"
        >
          🚪 Logout
        </button>
      </div>

      {/* Mobile Menu Button */}
      <button className="md:hidden text-2xl">☰</button>
    </nav>
  );
}

export default Navbar;
