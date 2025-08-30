import { useState } from "react";
import { useNavigate } from "react-router-dom";
import productsData from "./productsData";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FaCartPlus, FaTrash } from "react-icons/fa";

function Products() {
  const [category, setCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [cart, setCart] = useState([]); // 🛒 cart state
  const navigate = useNavigate();

  // Filter products based on category and search
  const filteredProducts = productsData.filter((product) => {
    const matchesCategory = category === "all" || product.category === category;
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // ✅ Add to cart
  const handleAddToCart = (product) => {
    if (!cart.find((item) => item.id === product.id)) {
      setCart([...cart, product]);
    }
  };

  // ❌ Remove from cart
  const handleRemoveFromCart = (productId) => {
    setCart(cart.filter((item) => item.id !== productId));
  };

  // Check if product is in cart
  const isInCart = (productId) => cart.some((item) => item.id === productId);

  return (
    <div className="h-screen bg-green-100 flex flex-col">
      {/* Navbar */}
      <Navbar />

      <div className="p-6 bg-green-100 flex-grow">
        <h1 className="text-3xl font-bold mb-6 text-center text-green-700">
          Our Products
        </h1>

        {/* Category Buttons */}
        <div className="flex justify-center gap-4 mb-6">
          <button
            onClick={() => setCategory("all")}
            className={`px-4 py-2 rounded-lg font-semibold transition ${
              category === "all"
                ? "bg-green-600 text-white"
                : "bg-white text-green-700 border"
            }`}
          >
            All
          </button>

          <button
            onClick={() => setCategory("Vegetables")}
            className={`px-4 py-2 rounded-lg font-semibold transition ${
              category === "Vegetables"
                ? "bg-green-600 text-white"
                : "bg-white text-green-700 border"
            }`}
          >
            Vegetables
          </button>

          <button
            onClick={() => setCategory("Fruits")}
            className={`px-4 py-2 rounded-lg font-semibold transition ${
              category === "Fruits"
                ? "bg-green-600 text-white"
                : "bg-white text-green-700 border"
            }`}
          >
            Fruits
          </button>
        </div>

        {/* 🔍 Search Bar */}
        <div className="flex justify-center mb-8">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-1/2 px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-600"
          />
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl"
              >
                {/* Product Image */}
                <div
                  className="cursor-pointer relative"
                  onClick={() => navigate(`/product/${product.id}`)}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                  <span className="absolute top-2 right-2 bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                    {product.category}
                  </span>
                </div>

                {/* Product Details */}
                <div className="p-5 flex flex-col justify-between h-44">
                  <h2 className="text-lg font-bold text-gray-800 mb-2">
                    {product.name}
                  </h2>

                  <p className="text-green-700 font-semibold text-xl mb-3">
                    ₹{product.price}{" "}
                    <span className="text-sm text-gray-500">/ 1kg</span>
                  </p>

                  {/* Add / Remove from Cart */}
                  {isInCart(product.id) ? (
                    <button
                      onClick={() => handleRemoveFromCart(product.id)}
                      className="w-full mt-auto flex items-center justify-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-600 transition"
                    >
                      <FaTrash className="text-lg" /> Remove from Cart
                    </button>
                  ) : (
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="w-full mt-auto flex items-center justify-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition"
                    >
                      <FaCartPlus className="text-lg" /> Add to Cart
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600 mt-10">
            No products found for "{searchTerm}"
          </p>
        )}
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Products;
