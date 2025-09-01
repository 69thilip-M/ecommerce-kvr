import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function AppProduct() {
  const [price, setPrice] = useState(50);
  const [image, setImage] = useState(null);

  // handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-green-50 dark:bg-gray-900 transition-colors">
      {/* Navbar */}
      <Navbar />

      {/* Form Wrapper */}
      <div className="flex-grow flex items-center justify-center px-4">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg w-full max-w-lg transition-colors">
          {/* Title */}
          <h1 className="text-2xl font-bold text-green-700 dark:text-green-400 mb-6 text-center">
            Add New Product 🥦🍎
          </h1>

          {/* Form */}
          <form className="space-y-5">
            {/* Product Name */}
            <div>
              <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-2">
                Product Name
              </label>
              <input
                type="text"
                placeholder="Enter product name"
                className="w-full px-4 py-2 border rounded-lg 
                focus:outline-none focus:ring-2 focus:ring-green-400 
                dark:bg-gray-700 dark:text-white dark:border-gray-600"
              />
            </div>

            {/* Category Dropdown */}
            <div>
              <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-2">
                Category
              </label>
              <select
                className="w-full px-4 py-2 border rounded-lg 
                focus:outline-none focus:ring-2 focus:ring-green-400
                dark:bg-gray-700 dark:text-white dark:border-gray-600"
              >
                <option value="fruits">Fruits</option>
                <option value="vegetables">Vegetables</option>
                <option value="others">Others</option>
              </select>
            </div>

            {/* Price with slider + input */}
            <div>
              <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-2">
                Price (₹)
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  className="w-24 px-3 py-2 border rounded-lg 
                  focus:outline-none focus:ring-2 focus:ring-green-400 
                  dark:bg-gray-700 dark:text-white dark:border-gray-600"
                />
                <input
                  type="range"
                  min="0"
                  max="1000"
                  step="10"
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  className="flex-1 accent-green-600"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-2">
                Description
              </label>
              <textarea
                placeholder="Enter product description"
                rows="3"
                className="w-full px-4 py-2 border rounded-lg 
                focus:outline-none focus:ring-2 focus:ring-green-400
                dark:bg-gray-700 dark:text-white dark:border-gray-600"
              ></textarea>
            </div>

            {/* Stock */}
            <div>
              <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-2">
                Stock
              </label>
              <input
                type="number"
                placeholder="Enter available stock"
                className="w-full px-4 py-2 border rounded-lg 
                focus:outline-none focus:ring-2 focus:ring-green-400
                dark:bg-gray-700 dark:text-white dark:border-gray-600"
              />
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-2">
                Upload Product Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full px-3 py-2 border rounded-lg 
                focus:outline-none focus:ring-2 focus:ring-green-400
                dark:bg-gray-700 dark:text-white dark:border-gray-600"
              />
              {/* Preview */}
              {image && (
                <div className="mt-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    Preview:
                  </p>
                  <img
                    src={image}
                    alt="Product Preview"
                    className="w-32 h-32 object-cover rounded-lg border dark:border-gray-600"
                  />
                </div>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg transition"
            >
              Add Product
            </button>
          </form>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default AppProduct;
