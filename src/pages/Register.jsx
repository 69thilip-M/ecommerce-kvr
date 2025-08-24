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

  const auth = getAuth(app);
  const navigate = useNavigate();
  const googleProvider = new GoogleAuthProvider();
  // signup
  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      console.log("✅ Signup successful");
      navigate("/home");
    } catch (err) {
      console.log("❌ Signup error:", err.message);
    }
  };
  //googlesignup
  const handleGoogleSignup = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      console.log("✅ Google signup successful");
      navigate("/home");
    } catch (err) {
      console.log("❌ Google signup error:", err.message);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
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
    </div>
  );
}

export default Register;
