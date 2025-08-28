import { Link, useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const handleLogout = () => {
    // clear session or token if you are storing any
    localStorage.removeItem("authToken");
    // navigate back to login page in the SAME TAB
    navigate("/");
  };
  return (
    <div className="h-screen bg-green-100 flex flex-col">
      {/* Navbar */}
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

          {/* Categories Dropdown */}
          {/* <div className="relative group">
            <button className="hover:text-yellow-300 transition">
              Categories
            </button>
            <div className="absolute hidden group-hover:block bg-white text-green-700 rounded-lg shadow-md mt-2">
              <Link
                to="/categories/fruits"
                className="block px-4 py-2 hover:bg-green-100 rounded"
              >
                Fruits
              </Link>
              <Link
                to="/categories/vegetables"
                className="block px-4 py-2 hover:bg-green-100 rounded"
              >
                Vegetables
              </Link>
            </div>
          </div> */}

          <Link to="/cart" className="hover:text-yellow-300 transition">
            Cart
          </Link>
          {/* <Link to="/add-product" className="hover:text-yellow-300 transition">
            Add Product
          </Link> */}
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

      {/* Content Section */}
      <div className="flex flex-col items-center justify-center flex-grow">
        <h1 className="text-3xl font-bold text-green-700">
          Welcome to Veggie Store 🌽🍎
        </h1>

        <p className="mt-4 text-lg text-gray-700">
          Fresh Fruits & Vegetables at your doorstep.
        </p>
      </div>
    </div>
  );
}

export default Home;
