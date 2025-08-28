import { useState } from "react";
import { useNavigate } from "react-router-dom";
import productsData from "./productsData";
import Navbar from "../components/Navbar"; // Adjust path if needed
import Footer from "../components/Footer";

function Products() {
  const [category, setCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  // Filter products based on category and search
  const filteredProducts = productsData.filter((product) => {
    const matchesCategory = category === "all" || product.category === category;
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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
                className="border rounded-xl shadow-lg p-4 bg-white hover:scale-105 transform transition cursor-pointer"
                onClick={() => navigate(`/product/${product.id}`)}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-40 object-cover rounded-lg mb-4"
                />
                <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
                <p className="text-gray-600 mb-2">{product.category}</p>
                <p className="text-green-700 font-bold text-lg">
                  ₹{product.price}
                </p>
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
