import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { app } from "../firebase";
import { getAuth } from "firebase/auth";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // State for errors
  const auth = getAuth(app);
  const navigate = useNavigate();
  const googleprovider = new GoogleAuthProvider();
  // login
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("loggedIn");
      navigate("/home");
    } catch (error) {
      console.log(error.message);
      setError(error.message); // Show error in popup
    }
  };
  // google login handle
  const handleGooglelogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithPopup(auth, googleprovider);
      console.log("google login successful");
      navigate("/home");
    } catch (error) {
      console.log(error.message);
      setError(error.message); // Show error in popup
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-green-50 relative">
      <div className="bg-white p-8 rounded-2xl shadow-md w-96">
        <h2 className="text-2xl font-bold text-center text-green-700 mb-6">
          Login
        </h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            className="w-full border p-2 mb-4 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full border p-2 mb-4 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
          >
            Login
          </button>
        </form>
        <button
          className="w-full rounded-lg mt-5 bg-red-500 p-3 font-semibold text-white transition duration-300 hover:bg-red-600"
          onClick={handleGooglelogin}
        >
          Continue with Google
        </button>
        <p className="text-center mt-4 text-gray-600">
          Don’t have an account?{" "}
          <Link to="/register" className="text-green-600 font-semibold">
            Register
          </Link>
        </p>
      </div>

      {/* Error Popup Modal */}
      {error && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80 text-center">
            <h3 className="text-red-600 font-bold text-lg mb-3">Error</h3>
            <p className="text-gray-700 mb-4">{error}</p>
            <button
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              onClick={() => setError("")}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;
