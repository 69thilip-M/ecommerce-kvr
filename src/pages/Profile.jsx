import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg font-semibold">Please log in to view profile.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-green-100 dark:bg-gray-900 dark:text-white">
      {/* Navbar */}
      <Navbar />

      {/* Profile Content */}
      <div className="flex-grow p-6 flex flex-col items-center">
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 w-full max-w-2xl mb-8">
          <div className="flex flex-col items-center">
            <img
              src={user.photoURL || "https://via.placeholder.com/150"}
              alt="Profile"
              className="w-32 h-32 rounded-full border-4 border-green-600 mb-4"
            />
            <h2 className="text-2xl font-bold">
              {user.displayName || "No Name"}
            </h2>
            <p className="text-gray-600 dark:text-gray-300">{user.email}</p>
          </div>

          {/* ✅ Firebase Account Details */}
          <div className="mt-6">
            <h3 className="text-xl font-semibold border-b pb-2 mb-4">
              Account Details
            </h3>
            <ul className="space-y-3">
              <li>
                <span className="font-semibold">Email: </span> {user.email}
              </li>
              <li>
                <span className="font-semibold">Provider: </span>{" "}
                {user.providerData[0]?.providerId}
              </li>
              <li>
                <span className="font-semibold">First Login: </span>{" "}
                {new Date(user.metadata.creationTime).toLocaleString()}
              </li>
              <li>
                <span className="font-semibold">Last Login: </span>{" "}
                {new Date(user.metadata.lastSignInTime).toLocaleString()}
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Profile;
