import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  // State variables to store user input
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Used for redirecting after successful registration
  const navigate = useNavigate();

  // Function runs when register form is submitted
  const handleRegister = (e) => {
    e.preventDefault();

    // ✅ Fake registration (replace later with backend/Firebase)
    console.log("User registered:", { name, email, password });

    // Redirect to home after successful registration
    navigate("/");
  };

  return (
    <div className="flex items-center justify-center h-screen bg-green-50">
      <div className="bg-white p-8 rounded-2xl shadow-md w-96">
        {/* Title */}
        <h2 className="text-2xl font-bold text-center text-green-700 mb-6">
          Register
        </h2>

        {/* Register Form */}
        <form onSubmit={handleRegister}>
          {/* Name Field */}
          <input
            type="text"
            placeholder="Full Name"
            className="w-full border p-2 mb-4 rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          {/* Email Field */}
          <input
            type="email"
            placeholder="Email"
            className="w-full border p-2 mb-4 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {/* Password Field */}
          <input
            type="password"
            placeholder="Password"
            className="w-full border p-2 mb-4 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
          >
            Register
          </button>
        </form>

        {/* Link to Login */}
        <p className="text-center mt-4 text-gray-600">
          Already have an account?{" "}
          <Link to="/" className="text-green-600 font-semibold">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
