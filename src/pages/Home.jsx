// Simple Home Page after login
function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-green-100">
      {/* Title */}
      <h1 className="text-3xl font-bold text-green-700">
        Welcome to Veggie Store 🌽🍎
      </h1>

      {/* Subtitle */}
      <p className="mt-4 text-lg text-gray-700">
        Fresh Fruits & Vegetables at your doorstep.
      </p>
    </div>
  );
}

export default Home;
