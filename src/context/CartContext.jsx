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
  const [isCartLoaded, setIsCartLoaded] = useState(false);
  const auth = getAuth();

  // 🔹 Track user login/logout
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsAuthReady(true);
      setIsCartLoaded(false); // reset whenever user changes
    });
    return () => unsubscribe();
  }, [auth]);

  // 🔹 Fetch user-specific cart
  useEffect(() => {
    const fetchCart = async () => {
      if (user) {
        try {
          const cartRef = doc(db, "carts", user.uid);
          const cartSnap = await getDoc(cartRef);

          if (cartSnap.exists()) {
            setCart(cartSnap.data().items || []);
          } else {
            setCart([]);
          }
        } catch (error) {
          console.error("❌ Error fetching cart:", error);
        }
        setIsCartLoaded(true);
      } else {
        setCart([]); // Clear cart if logged out
        setIsCartLoaded(false);
      }
    };

    if (isAuthReady) {
      fetchCart();
    }
  }, [user, isAuthReady]);

  // 🔹 Save cart whenever it changes
  useEffect(() => {
    const saveCart = async () => {
      if (user && isCartLoaded) {
        try {
          const cartRef = doc(db, "carts", user.uid);
          await setDoc(cartRef, { items: cart });
        } catch (error) {
          console.error("❌ Error saving cart:", error);
        }
      }
    };

    saveCart();
  }, [cart, user, isCartLoaded]);

  // 🔹 Add item to cart
  // const addToCart = (product) => {
  //   setCart((prevCart) => {
  //     if (!prevCart.find((item) => item.id === product.id)) {
  //       return [...prevCart, product];
  //     }
  //     return prevCart;
  //   });
  // };

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        // If already in cart, increase quantity
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  // inside CartProvider

  // 🔹 Update item quantity
  const updateQuantity = (id, quantity) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
      )
    );
  };

  // 🔹 Remove item from cart
  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  // 🔹 Check if product in cart
  const isInCart = (id) => cart.some((item) => item.id === id);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        isInCart,
        user,
        isAuthReady,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
