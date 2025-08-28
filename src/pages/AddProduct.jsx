import { useState } from "react";
import Navbar from "../components/Navbar"; // Adjust path if needed
import Footer from "../components/Footer";

function AppProduct() {
  const [price, setPrice] = useState(50); // default price
  const [image, setImage] = useState(null); // for preview

  // handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-green-50">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-lg">
        {/* Title */}
        <h1 className="text-2xl font-bold text-green-700 mb-6 text-center">
          Add New Product 🥦🍎
        </h1>

        {/* Form */}
        <form className="space-y-5">
          {/* Product Name */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Product Name
            </label>
            <input
              type="text"
              placeholder="Enter product name"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          {/* Category Dropdown */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Category
            </label>
            <select className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400">
              <option value="fruits">Fruits</option>
              <option value="vegetables">Vegetables</option>
              <option value="others">Others</option>
            </select>
          </div>

          {/* Price with slider + input */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Price (₹)
            </label>
            <div className="flex items-center gap-4">
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="w-24 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
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
            <label className="block text-gray-700 font-semibold mb-2">
              Description
            </label>
            <textarea
              placeholder="Enter product description"
              rows="3"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            ></textarea>
          </div>

          {/* Stock */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Stock
            </label>
            <input
              type="number"
              placeholder="Enter available stock"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Upload Product Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            {/* Preview */}
            {image && (
              <div className="mt-4">
                <p className="text-sm text-gray-600 mb-2">Preview:</p>
                <img
                  src={image}
                  alt="Product Preview"
                  className="w-32 h-32 object-cover rounded-lg border"
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
  );
}

export default AppProduct;
