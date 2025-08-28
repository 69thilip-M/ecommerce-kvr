import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/");
  };

  return (
    <nav className="bg-green-600 text-white px-6 py-4 shadow-md flex items-center justify-between">
      {/* Logo */}
      <Link to="/home" className="text-2xl font-bold flex items-center gap-2">
        🌽🍎 Veggie Store
      </Link>

      {/* Menu Links */}
      <div className="hidden md:flex gap-6 text-lg font-medium">
        <Link to="/home" className="hover:text-yellow-300 transition">
          Home
        </Link>
        <Link to="/products" className="hover:text-yellow-300 transition">
          Products
        </Link>
        <Link to="/about" className="hover:text-yellow-300 transition">
          About
        </Link>
        <Link to="/cart" className="hover:text-yellow-300 transition">
          Cart
        </Link>
        <Link to="/profile" className="hover:text-yellow-300 transition">
          👤 Profile
        </Link>
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
