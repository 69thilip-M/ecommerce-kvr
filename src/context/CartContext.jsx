// src/context/CartContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { db } from "../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);
  const [isAuthReady, setIsAuthReady] = useState(false);
  const [isCartLoaded, setIsCartLoaded] = useState(false); // ✅ Added to prevent overwriting empty cart
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsAuthReady(true);
    });
    return () => unsubscribe();
  }, [auth]);

  useEffect(() => {
    const fetchCart = async () => {
      if (user) {
        const cartRef = doc(db, "carts", user.uid);
        const cartSnap = await getDoc(cartRef);
        if (cartSnap.exists()) {
          setCart(cartSnap.data().items || []);
        } else {
          setCart([]);
        }
        setIsCartLoaded(true); // ✅ Mark as loaded after fetching
      }
    };

    if (isAuthReady) {
      fetchCart();
    }
  }, [user, isAuthReady]);

  useEffect(() => {
    const saveCart = async () => {
      if (user && isCartLoaded) {
        const cartRef = doc(db, "carts", user.uid);
        await setDoc(cartRef, { items: cart });
      }
    };

    if (isAuthReady && isCartLoaded) {
      saveCart();
    }
  }, [cart, user, isAuthReady, isCartLoaded]);

  const addToCart = (product) => {
    if (!cart.find((item) => item.id === product.id)) {
      setCart([...cart, product]);
    }
  };

  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const isInCart = (id) => cart.some((item) => item.id === id);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, isInCart, user, isAuthReady }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
