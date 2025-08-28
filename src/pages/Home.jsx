import Navbar from "../components/Navbar"; // Adjust path if needed
import Footer from "../components/Footer";

function Home() {
  return (
    <div className="h-screen bg-green-100 flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Content Section */}
      <div className="flex flex-col items-center justify-center flex-grow">
        <h1 className="text-3xl font-bold text-green-700">
          Welcome to Veggie Store 🌽🍎
        </h1>
        <p className="mt-4 text-lg text-gray-700">
          Fresh Fruits & Vegetables at your doorstep.
        </p>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default Home;
