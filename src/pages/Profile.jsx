import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Profile() {
  // Dummy order data (you can fetch from backend later)
  const orders = [
    {
      id: 1,
      date: "2025-08-15",
      total: 450,
      status: "Delivered",
      items: ["Tomatoes - 2kg", "Potatoes - 1kg", "Onions - 1kg"],
    },
    {
      id: 2,
      date: "2025-08-20",
      total: 320,
      status: "Pending",
      items: ["Carrots - 2kg", "Capsicum - 1kg"],
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-green-100 dark:bg-gray-900 dark:text-white">
      {/* Main Navbar */}
      <Navbar />

      {/* Profile Content */}
      <div className="flex-grow p-6 flex flex-col items-center">
        {/* Profile Info */}
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 w-full max-w-2xl mb-8">
          <div className="flex flex-col items-center">
            <img
              src="https://via.placeholder.com/150"
              alt="Profile"
              className="w-32 h-32 rounded-full border-4 border-green-600 mb-4"
            />
            <h2 className="text-2xl font-bold">John Doe</h2>
            <p className="text-gray-600 dark:text-gray-300">
              johndoe@gmail.com
            </p>
          </div>

          <div className="mt-6">
            <h3 className="text-xl font-semibold border-b pb-2 mb-4">
              Account Details
            </h3>
            <ul className="space-y-3">
              <li>
                <span className="font-semibold">Full Name: </span> John Doe
              </li>
              <li>
                <span className="font-semibold">Email: </span> johndoe@gmail.com
              </li>
              <li>
                <span className="font-semibold">Phone: </span> +91 9876543210
              </li>
              <li>
                <span className="font-semibold">Address: </span> 123 Veggie
                Street, Healthy City
              </li>
            </ul>
          </div>
        </div>

        {/* Orders Section */}
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 w-full max-w-3xl">
          <h3 className="text-xl font-semibold border-b pb-2 mb-4">
            Your Orders
          </h3>
          {orders.length === 0 ? (
            <p className="text-gray-600 dark:text-gray-400">
              You have no orders yet.
            </p>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="border border-gray-300 dark:border-gray-700 rounded-lg p-4"
                >
                  <div className="flex justify-between items-center">
                    <h4 className="font-semibold text-green-700">
                      Order #{order.id}
                    </h4>
                    <span
                      className={`px-3 py-1 text-sm rounded-full ${
                        order.status === "Delivered"
                          ? "bg-green-200 text-green-800"
                          : "bg-yellow-200 text-yellow-800"
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Date: {order.date}
                  </p>
                  <p className="mt-2">
                    <span className="font-semibold">Items:</span>{" "}
                    {order.items.join(", ")}
                  </p>
                  <p className="mt-1 font-medium text-green-700">
                    Total: ₹{order.total}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Profile;
