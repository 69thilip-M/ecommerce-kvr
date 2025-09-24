/* eslint-disable no-unused-vars */
// src/pages/Cart.jsx
import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useCart } from "../context/CartContext";
import { db } from "../firebase";
import { doc, getDoc, setDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { motion, AnimatePresence } from "framer-motion";

function Cart() {
  const { cart, removeFromCart, updateQuantity, clearCart, user } = useCart();

  const [showConfirm, setShowConfirm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [saving, setSaving] = useState(false);
  const [pendingOrder, setPendingOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  // Simulate page loading delay
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const totalAmount = cart.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );

  const clearCartSafe = () => {
    if (typeof clearCart === "function") {
      clearCart();
      return;
    }
    cart.forEach((i) => removeFromCart(i.id));
  };

  const handleOrderNow = () => {
    if (!cart || cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    setShowConfirm(true);
  };

  const confirmOrder = () => {
    const snapshot = {
      id: Date.now().toString(),
      items: cart.map((it) => ({ ...it })),
      total: totalAmount,
      placedAt: new Date().toISOString(),
    };

    let message = "🛒 New Order Details:\n\n";
    snapshot.items.forEach((item, index) => {
      message += `${index + 1}. ${item.name} (x${item.quantity || 1}) - ₹${
        item.price * (item.quantity || 1)
      }\n`;
    });
    message += `\n💰 Total Amount: ₹${snapshot.total}\n\nPlease confirm my order. ✅`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappLink = `https://wa.me/918825875206?text=${encodedMessage}`;
    window.open(whatsappLink, "_blank");

    setPendingOrder(snapshot);
    setShowConfirm(false);
    setShowSuccess(true);
  };

  const handleSuccessOk = async () => {
    if (!pendingOrder || !user) {
      setShowSuccess(false);
      return;
    }

    setSaving(true);

    try {
      const ordersRef = doc(db, "orders", user.uid);
      const docSnap = await getDoc(ordersRef);

      if (docSnap.exists()) {
        await updateDoc(ordersRef, {
          data: arrayUnion(pendingOrder),
        });
      } else {
        await setDoc(ordersRef, { data: [pendingOrder] });
      }

      clearCartSafe();
      setPendingOrder(null);
      setShowSuccess(false);
    } catch (err) {
      console.error("Error saving order:", err);
      alert("Failed to save order.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-green-100 dark:bg-gray-900 flex flex-col text-gray-900 dark:text-gray-100 relative">
      <Navbar />

      <div className="flex-grow p-6">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 max-w-5xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6">
            Shopping Cart
          </h1>

          {cart.length === 0 ? (
            <p className="text-center text-gray-600 dark:text-gray-400">
              Your cart is empty.
            </p>
          ) : (
            <div className="overflow-x-auto">
              {/* Table */}
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                    <th className="p-3 text-left">Item</th>
                    <th className="p-3 text-center">Quantity</th>
                    <th className="p-3 text-center">Price</th>
                    <th className="p-3 text-center">Amount</th>
                    <th className="p-3 text-center">Remove</th>
                  </tr>
                </thead>
                <tbody>
                  <AnimatePresence>
                    {cart.map((item) => (
                      <motion.tr
                        key={item.id}
                        layout
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -30 }}
                        transition={{
                          duration: 0.6,
                          type: "spring",
                          stiffness: 150,
                          damping: 20,
                        }}
                        className="border-b border-gray-200 dark:border-gray-600"
                      >
                        <td className="p-4 flex items-center gap-4">
                          <motion.img
                            src={item.image}
                            alt={item.name}
                            className="w-16 h-16 object-cover rounded-lg shadow"
                            layout
                            initial={{ scale: 0.85, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{
                              duration: 0.6,
                              type: "spring",
                              stiffness: 120,
                            }}
                          />
                          <div>
                            <h2 className="font-semibold text-gray-800 dark:text-gray-200">
                              {item.name}
                            </h2>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {item.description || "No description available"}
                            </p>
                          </div>
                        </td>
                        <td className="p-4 text-center">
                          <div className="flex justify-center items-center gap-2">
                            <motion.button
                              whileTap={{ scale: 0.9 }}
                              onClick={() =>
                                updateQuantity(
                                  item.id,
                                  Math.max(1, (item.quantity || 1) - 1)
                                )
                              }
                              className="px-2 py-1 bg-yellow-400 hover:bg-yellow-500 text-white rounded"
                            >
                              -
                            </motion.button>
                            <motion.span
                              layout
                              className="px-3 py-1 bg-gray-100 dark:bg-gray-600 rounded"
                            >
                              {item.quantity || 1}
                            </motion.span>
                            <motion.button
                              whileTap={{ scale: 0.9 }}
                              onClick={() =>
                                updateQuantity(
                                  item.id,
                                  (item.quantity || 1) + 1
                                )
                              }
                              className="px-2 py-1 bg-yellow-400 hover:bg-yellow-500 text-white rounded"
                            >
                              +
                            </motion.button>
                          </div>
                        </td>
                        <td className="p-4 text-center text-green-600 dark:text-green-400 font-medium">
                          ₹{item.price}
                        </td>
                        <td className="p-4 text-center font-semibold">
                          <motion.span layout>
                            ₹{item.price * (item.quantity || 1)}
                          </motion.span>
                        </td>
                        <td className="p-4 text-center">
                          <motion.button
                            whileTap={{ scale: 0.9 }}
                            onClick={() => removeFromCart(item.id)}
                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg"
                          >
                            ✕
                          </motion.button>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>

              {/* Total & Order */}
              <motion.div
                className="flex justify-between items-center mt-6"
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
              >
                <p className="text-lg font-semibold">
                  Total:{" "}
                  <span className="text-green-600 dark:text-green-400">
                    ₹{totalAmount}
                  </span>
                </p>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={handleOrderNow}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl shadow-md font-medium"
                >
                  Order Now →
                </motion.button>
              </motion.div>
            </div>
          )}
        </div>
      </div>

      <Footer />

      {/* Loader Overlay */}
      <AnimatePresence>
        {(loading || saving) && (
          <motion.div
            className="fixed inset-0 bg-white/80 dark:bg-gray-900/80 flex justify-center items-center z-50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex flex-col items-center">
              <img
                src="https://i.gifer.com/ZZ5H.gif"
                alt="Loading..."
                className="w-20 h-20 mb-4"
              />
              <p className="text-gray-700 dark:text-gray-300 font-medium">
                {saving ? "Processing your order..." : "Loading your cart..."}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Confirm Modal */}
      <AnimatePresence>
        {showConfirm && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg max-w-sm w-full"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, type: "spring", stiffness: 120 }}
            >
              <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
                Confirm Order
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Do you want to place this order?
              </p>
              <div className="flex justify-end gap-4">
                <button
                  onClick={() => setShowConfirm(false)}
                  className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmOrder}
                  className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg"
                >
                  Place Order
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Success Modal */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg max-w-sm w-full text-center"
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, type: "spring", stiffness: 120 }}
            >
              <h2 className="text-xl font-semibold mb-4 text-green-600">
                ✅ Order Placed!
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Your order has been placed successfully. We’ll contact you soon.
              </p>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={handleSuccessOk}
                disabled={saving}
                className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
              >
                {saving ? "Saving..." : "OK"}
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Cart;
