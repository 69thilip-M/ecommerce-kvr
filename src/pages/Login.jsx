// Import hooks and router helpers
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  // State variables to store user input
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // React Router hook used for redirection
  const navigate = useNavigate();

  // Function runs when the form is submitted
  const handleLogin = (e) => {
    e.preventDefault(); // Prevents page reload on submit

    // ✅ Fake authentication check
    // Later you will replace this with Firebase/Backend API
    if (email === "test@example.com" && password === "123456") {
      console.log("Login successful!");
      navigate("/home"); // Redirect to Home page
    } else {
      alert("Invalid email or password!");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-green-50">
      <div className="bg-white p-8 rounded-2xl shadow-md w-96">
        {/* Page Title */}
        <h2 className="text-2xl font-bold text-center text-green-700 mb-6">
          Login
        </h2>

        {/* Login Form */}
        <form onSubmit={handleLogin}>
          {/* Email Field */}
          <input
            type="email"
            placeholder="Email"
            className="w-full border p-2 mb-4 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)} // Save input to state
            required
          />

          {/* Password Field */}
          <input
            type="password"
            placeholder="Password"
            className="w-full border p-2 mb-4 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Save input to state
            required
          />

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
          >
            Login
          </button>
        </form>

        {/* Link to Register page */}
        <p className="text-center mt-4 text-gray-600">
          Don’t have an account?{" "}
          <Link to="/register" className="text-green-600 font-semibold">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
