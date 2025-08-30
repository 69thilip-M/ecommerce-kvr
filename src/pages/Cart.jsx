import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useCart } from "../context/CartContext";

function Cart() {
  const { cart, removeFromCart } = useCart();

  return (
    <div className="h-screen bg-green-100 flex flex-col">
      <Navbar />

      <div className="flex-grow p-6">
        <h1 className="text-3xl font-bold text-green-700 mb-6 text-center">
          Your Cart
        </h1>

        {cart.length === 0 ? (
          <p className="text-center text-gray-600">Your cart is empty.</p>
        ) : (
          <div className="grid gap-4 max-w-3xl mx-auto">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between bg-white p-4 rounded-lg shadow"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div>
                    <h2 className="font-semibold text-gray-800">{item.name}</h2>
                    <p className="text-green-700 font-medium">
                      ₹{item.price} / 1kg
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default Cart;
