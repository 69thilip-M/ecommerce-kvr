import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useCart } from "../context/CartContext";

function Cart() {
  const { cart, removeFromCart, updateQuantity } = useCart();

  // ✅ Calculate total amount
  const totalAmount = cart.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );

  // ✅ Handle WhatsApp Order
  const handleOrderNow = () => {
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    // Build order message
    let message = "🛒 New Order Details:\n\n";
    cart.forEach((item, index) => {
      message += `${index + 1}. ${item.name} (x${item.quantity || 1}) - ₹${
        item.price * (item.quantity || 1)
      }\n`;
    });
    message += `\n💰 Total Amount: ₹${totalAmount}\n\nPlease confirm my order. ✅`;

    // Encode message for URL
    const encodedMessage = encodeURIComponent(message);

    // WhatsApp link
    const whatsappLink = `https://wa.me/918825875206?text=${encodedMessage}`;

    // Open WhatsApp
    window.open(whatsappLink, "_blank");
  };

  return (
    <div className="min-h-screen bg-green-100 dark:bg-gray-900 flex flex-col text-gray-900 dark:text-gray-100">
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
              {/* cart table same as before */}
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
                  {cart.map((item) => (
                    <tr
                      key={item.id}
                      className="border-b border-gray-200 dark:border-gray-600"
                    >
                      {/* Item Info */}
                      <td className="p-4 flex items-center gap-4">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-lg shadow"
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

                      {/* Quantity */}
                      <td className="p-4 text-center">
                        <div className="flex justify-center items-center gap-2">
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.id,
                                Math.max(1, (item.quantity || 1) - 1)
                              )
                            }
                            className="px-2 py-1 bg-yellow-400 hover:bg-yellow-500 text-white rounded"
                          >
                            -
                          </button>
                          <span className="px-3 py-1 bg-gray-100 dark:bg-gray-600 rounded">
                            {item.quantity || 1}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.id, (item.quantity || 1) + 1)
                            }
                            className="px-2 py-1 bg-yellow-400 hover:bg-yellow-500 text-white rounded"
                          >
                            +
                          </button>
                        </div>
                      </td>

                      {/* Price */}
                      <td className="p-4 text-center text-green-600 dark:text-green-400 font-medium">
                        ₹{item.price}
                      </td>

                      {/* Amount */}
                      <td className="p-4 text-center font-semibold">
                        ₹{item.price * (item.quantity || 1)}
                      </td>

                      {/* Remove */}
                      <td className="p-4 text-center">
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg"
                        >
                          ✕
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* ✅ Cart Footer */}
              <div className="flex justify-between items-center mt-6">
                <p className="text-lg font-semibold">
                  Total:{" "}
                  <span className="text-green-600 dark:text-green-400">
                    ₹{totalAmount}
                  </span>
                </p>
                <button
                  onClick={handleOrderNow}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl shadow-md font-medium"
                >
                  Order Now →
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Cart;
