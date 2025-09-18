import { useEffect, useState, useRef } from "react";
import { getAuth, updateProfile } from "firebase/auth";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Profile() {
  const [user, setUser] = useState(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);
  //profile name
  const getNameFromEmail = (email) => {
    if (!email) return "No Name";
    let namePart = email.split("@")[0];
    namePart = namePart.replace(/[0-9]/g, "");
    return namePart.charAt(0).toUpperCase() + namePart.slice(1);
  };
  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    console.log("Selected file:", file);
    if (!file || !user) return;

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "profileImage"); // ✅ Must match your preset in Cloudinary

    try {
      setUploading(true);

      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dvtx9vyr9/image/upload",
        {
          method: "POST",
          body: data,
        }
      );

      const uploadedImage = await res.json();
      console.log("Cloudinary response:", uploadedImage); // ✅ Debugging log

      if (uploadedImage.secure_url) {
        const photoURL = uploadedImage.secure_url;

        const auth = getAuth();
        await updateProfile(auth.currentUser, { photoURL });

        setUser({ ...user, photoURL });
        alert("✅ Profile picture updated!");
      } else {
        throw new Error(uploadedImage.error?.message || "Image upload failed");
      }
    } catch (error) {
      console.error("❌ Upload failed:", error);
      alert("Failed to upload image: " + error.message);
    } finally {
      setUploading(false);
    }
  };

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
      <Navbar />

      <div className="flex-grow p-6 flex flex-col items-center">
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 w-full max-w-2xl mb-8">
          <div className="flex flex-col items-center">
            {/* ✅ Profile Image with clickable upload */}
            <div
              onClick={handleImageClick}
              className="relative w-32 h-32 cursor-pointer"
            >
              <img
                src={
                  user.photoURL ||
                  "https://dummyimage.com/150x150/cccccc/000000&text=Profile"
                }
                alt="Profile"
                className={`w-32 h-32 rounded-full border-4 border-green-600 object-cover ${
                  uploading ? "opacity-50" : "opacity-100"
                }`}
              />
              {uploading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full">
                  <span className="text-white">Uploading...</span>
                </div>
              )}
            </div>

            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleFileChange}
            />

            <h2 className="text-2xl font-bold mt-4">
              {user.displayName || getNameFromEmail(user.email)}
            </h2>
            <p className="text-gray-600 dark:text-gray-300">{user.email}</p>
          </div>

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

      <Footer />
    </div>
  );
}

export default Profile;
