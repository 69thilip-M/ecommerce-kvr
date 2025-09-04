// src/pages/Products.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import productsData from "./productsData";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FaCartPlus, FaTrash, FaPlus, FaEdit } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";

function Products() {
  const [category, setCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [allProducts, setAllProducts] = useState(productsData);
  const { addToCart, removeFromCart, isInCart } = useCart();
  const navigate = useNavigate();

  // ✅ Fetch Firebase products once
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "addProducts"));
        const firebaseProducts = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setAllProducts([...productsData, ...firebaseProducts]);
      } catch (error) {
        console.error("Error fetching Firebase products:", error);
      }
    };

    fetchProducts();
  }, []);

  // ✅ Delete product from Firebase
  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "addProducts", id));
      setAllProducts((prev) => prev.filter((p) => p.id !== id));
      alert("Product deleted successfully!");
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  // ✅ Apply filters
  const filteredProducts = allProducts.filter((product) => {
    const productCategory = (product.category || "").toLowerCase();
    const selectedCategory = category.toLowerCase();

    const matchesCategory =
      selectedCategory === "all" || productCategory === selectedCategory;

    const productName =
      product.name?.toLowerCase() || product.productName?.toLowerCase() || "";

    const matchesSearch = productName.includes(searchTerm.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-green-100 dark:bg-gray-900 flex flex-col transition-colors duration-300">
      <Navbar />

      <div className="p-6 flex-grow">
        {/* Header + Add Product */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-green-700 dark:text-green-400 text-center md:text-left">
            Our Products
          </h1>

          <button
            onClick={() => navigate("/add-product")}
            className="mt-4 md:mt-0 flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg font-medium shadow-md transition"
          >
            <FaPlus /> Add Product
          </button>
        </div>

        {/* Category Tabs + Search */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-3">
            {["all", "Fruits", "Vegetables", "dairy"].map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-4 py-2 rounded-full font-medium transition ${
                  category.toLowerCase() === cat.toLowerCase()
                    ? "bg-green-600 text-white shadow-md"
                    : "bg-white dark:bg-gray-800 text-green-700 dark:text-green-300 border border-green-600 hover:bg-green-50 dark:hover:bg-gray-700"
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
            className="w-full md:w-64 px-4 py-2 rounded-lg border border-green-400 dark:border-green-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl"
              >
                {/* Image */}
                <div
                  className="cursor-pointer relative"
                  onClick={() => navigate(`/product/${product.id}`)}
                >
                  <img
                    src={product.image}
                    alt={product.name || product.productName}
                    className="w-full h-48 object-cover"
                  />
                  {product.category && (
                    <span className="absolute top-2 right-2 bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                      {product.category}
                    </span>
                  )}
                </div>

                {/* Details */}
                <div className="p-5 flex flex-col justify-between h-auto">
                  <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-2">
                    {product.name || product.productName}
                  </h2>

                  {/* ✅ Description */}
                  {product.description && (
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-2 line-clamp-2">
                      {product.description}
                    </p>
                  )}

                  <p className="text-green-700 dark:text-green-400 font-semibold text-xl mb-3">
                    ₹{product.price}{" "}
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      / 1kg
                    </span>
                  </p>

                  {/* ✅ Edit + Delete buttons above Add to Cart */}
                  <div className="flex justify-between gap-3 mb-3">
                    <button
                      onClick={() => navigate(`/edit-product/${product.id}`)}
                      className="flex-1 flex items-center justify-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg font-medium transition"
                    >
                      <FaEdit /> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="flex-1 flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition"
                    >
                      <FaTrash /> Delete
                    </button>
                  </div>

                  {/* ✅ Add to Cart button */}
                  {isInCart(product.id) ? (
                    <button
                      onClick={() => removeFromCart(product.id)}
                      className="w-full mt-auto flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition"
                    >
                      <FaTrash className="text-lg" /> Remove from Cart
                    </button>
                  ) : (
                    <button
                      onClick={() => addToCart(product)}
                      className="w-full mt-auto flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition"
                    >
                      <FaCartPlus className="text-lg" /> Add to Cart
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600 dark:text-gray-400 mt-10">
            No products found for "{searchTerm}"
          </p>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default Products;
