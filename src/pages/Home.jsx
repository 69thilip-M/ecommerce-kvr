import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
function Home() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col bg-green-50">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <div className="relative flex flex-col items-center justify-center text-center flex-grow bg-green-100">
        {/* Background GIF */}
        <img
          src="https://media.giphy.com/media/l3vQ6bJkY8dVZ2E1C/giphy.gif"
          alt="Fresh veggies gif"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />

        {/* Overlay Content */}
        <div className="relative z-10 max-w-3xl px-6 py-10">
          <h1 className="text-5xl md:text-6xl font-extrabold text-green-800 drop-shadow-lg">
            Fresh Fruits & Veggies 🍎🥦
          </h1>
          <p className="mt-4 text-lg md:text-xl text-gray-700 font-medium">
            Get your favorite groceries delivered straight to your home with
            love & freshness.
          </p>
          <div className="mt-6 flex justify-center gap-4">
            <button
              className="px-6 py-3 bg-green-600 text-white rounded-xl shadow-lg hover:bg-green-700 transition"
              onClick={() => navigate("/products")}
            >
              Shop Now 🛒
            </button>
            <button
              className="px-6 py-3 bg-white text-green-700 border border-green-600 rounded-xl shadow hover:bg-green-50 transition"
              onClick={() => navigate("/about")}
            >
              Learn More
            </button>
          </div>
        </div>
      </div>

      {/* Feature Section */}
      <div className="bg-white py-16 px-6 grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
        <div className="flex flex-col items-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/415/415733.png"
            alt="Fresh"
            className="w-20 h-20 mb-4"
          />
          <h3 className="text-xl font-semibold text-green-700">100% Fresh</h3>
          <p className="text-gray-600 mt-2">
            Only the best quality fruits & veggies, handpicked for you.
          </p>
        </div>
        <div className="flex flex-col items-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/1046/1046784.png"
            alt="Delivery"
            className="w-20 h-20 mb-4"
          />
          <h3 className="text-xl font-semibold text-green-700">
            Fast Delivery
          </h3>
          <p className="text-gray-600 mt-2">
            Get your groceries delivered within hours at your doorstep.
          </p>
        </div>
        <div className="flex flex-col items-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/744/744922.png"
            alt="Affordable"
            className="w-20 h-20 mb-4"
          />
          <h3 className="text-xl font-semibold text-green-700">Best Prices</h3>
          <p className="text-gray-600 mt-2">
            Freshness doesn’t have to be expensive — we keep it affordable.
          </p>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Home;
