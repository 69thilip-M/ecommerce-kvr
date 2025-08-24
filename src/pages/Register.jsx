import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { useState } from "react";
import { app } from "../firebase";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [popup, setPopup] = useState({ show: false, message: "", type: "" });

  const auth = getAuth(app);
  const navigate = useNavigate();
  const googleProvider = new GoogleAuthProvider();

  // signup
  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setPopup({
        show: true,
        message: "✅ Signup successful!",
        type: "success",
      });
      setTimeout(() => navigate("/"), 2000); // redirect after 2s
    } catch (err) {
      setPopup({ show: true, message: "❌ " + err.message, type: "error" });
    }
  };

  // google signup
  const handleGoogleSignup = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      setPopup({
        show: true,
        message: "✅ Google signup successful!",
        type: "success",
      });
      setTimeout(() => navigate("/home"), 2000);
    } catch (err) {
      setPopup({ show: true, message: "❌ " + err.message, type: "error" });
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 relative">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
        <h2 className="mb-6 text-center text-2xl font-bold text-gray-700">
          Register 👋
        </h2>
        <form onSubmit={handleSignup} className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full rounded-lg border border-gray-300 p-3 text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="w-full rounded-lg border border-gray-300 p-3 text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
            required
          />
          <button
            type="submit"
            className="w-full rounded-lg bg-blue-600 p-3 font-semibold text-white transition duration-300 hover:bg-blue-700"
          >
            Sign up
          </button>
        </form>

        <div className="my-6 flex items-center justify-center">
          <div className="h-px w-1/4 bg-gray-300"></div>
          <span className="mx-2 text-gray-500">OR</span>
          <div className="h-px w-1/4 bg-gray-300"></div>
        </div>

        <button
          className="w-full rounded-lg bg-red-500 p-3 font-semibold text-white transition duration-300 hover:bg-red-600"
          onClick={handleGoogleSignup}
        >
          Continue with Google
        </button>

        <p className="text-center mt-4 text-gray-600">
          Already have an account?
          <Link to="/" className="ml-1 text-green-600 font-semibold">
            Login
          </Link>
        </p>
      </div>

      {/* ✅ Popup */}
      {popup.show && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
          <div
            className={`p-6 rounded-xl shadow-xl text-center ${
              popup.type === "success" ? "bg-green-100" : "bg-red-100"
            }`}
          >
            <p
              className={`text-lg font-semibold ${
                popup.type === "success" ? "text-green-700" : "text-red-700"
              }`}
            >
              {popup.message}
            </p>
            <button
              onClick={() => setPopup({ ...popup, show: false })}
              className="mt-4 rounded-lg bg-gray-800 px-4 py-2 text-white hover:bg-gray-900"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Register;
