// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// kural
//   apiKey: "AIzaSyAysZw7k1iMEtuuD1AvI1BF4ay3RiMqj2E",
//   authDomain: "ecommerce-store-f9059.firebaseapp.com",
//   projectId: "ecommerce-store-f9059",
//   storageBucket: "ecommerce-store-f9059.firebasestorage.app",
//   messagingSenderId: "203169603869",
//   appId: "1:203169603869:web:46f6cec76cdc9c8f2ac1f4",
//   measurementId: "G-SXCQDDFECD",

// lens and lines
// apiKey: "AIzaSyAFJPaGtovhfjfN1zaZXvfmsKp6vP9A3rM",
//   authDomain: "ecommerce-vegies.firebaseapp.com",
//   projectId: "ecommerce-vegies",
//   storageBucket: "ecommerce-vegies.firebasestorage.app",
//   messagingSenderId: "934891785742",
//   appId: "1:934891785742:web:44540cc82b3e9a3cf1765f",
//   measurementId: "G-CLWLPG0Q5L",
const firebaseConfig = {
  apiKey: "AIzaSyAFJPaGtovhfjfN1zaZXvfmsKp6vP9A3rM",
  authDomain: "ecommerce-vegies.firebaseapp.com",
  projectId: "ecommerce-vegies",
  storageBucket: "ecommerce-vegies.firebasestorage.app",
  messagingSenderId: "934891785742",
  appId: "1:934891785742:web:44540cc82b3e9a3cf1765f",
  measurementId: "G-CLWLPG0Q5L",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// ✅ Firestore (for storing products)
export const db = getFirestore(app);
export const storage = getStorage(app);
