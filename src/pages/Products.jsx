import { useState } from "react";
import { useNavigate } from "react-router-dom";
import productsData from "./productsData";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FaCartPlus, FaTrash } from "react-icons/fa";
import { useCart } from "../context/CartContext";

function Products() {
  const [category, setCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const { addToCart, removeFromCart, isInCart } = useCart();
  const navigate = useNavigate();

  const filteredProducts = productsData.filter((product) => {
    const matchesCategory = category === "all" || product.category === category;
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-green-100 flex flex-col">
      <Navbar />

      <div className="p-6 flex-grow">
        <h1 className="text-3xl font-bold mb-6 text-center text-green-700">
          Our Products
        </h1>

        {/* ✅ Category Tabs + Search */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-3">
            {["all", "Fruits", "Vegetables", "dairy"].map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-4 py-2 rounded-full font-medium transition ${
                  category === cat
                    ? "bg-green-600 text-white shadow-md"
                    : "bg-white text-green-700 border border-green-600 hover:bg-green-50"
                }`}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-64 px-4 py-2 rounded-lg border border-green-400 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* ✅ Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl"
              >
                {/* Image */}
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

                {/* Details */}
                <div className="p-5 flex flex-col justify-between h-44">
                  <h2 className="text-lg font-bold text-gray-800 mb-2">
                    {product.name}
                  </h2>

                  <p className="text-green-700 font-semibold text-xl mb-3">
                    ₹{product.price}{" "}
                    <span className="text-sm text-gray-500">/ 1kg</span>
                  </p>

                  {isInCart(product.id) ? (
                    <button
                      onClick={() => removeFromCart(product.id)}
                      className="w-full mt-auto flex items-center justify-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-600 transition"
                    >
                      <FaTrash className="text-lg" /> Remove from Cart
                    </button>
                  ) : (
                    <button
                      onClick={() => addToCart(product)}
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

      <Footer />
    </div>
  );
}

export default Products;
