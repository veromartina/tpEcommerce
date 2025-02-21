
import { createContext, useContext, useState, useEffect } from "react";
import { db } from "../firebase/config";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const [cart, setCart] = useState([]);

  // Carga el carrito desde Firestore cuando el usuario inicia sesión
  useEffect(() => {
    const loadCart = async () => {
      if (!user || !user.uid) {
        setCart([]); // Si no hay usuario, limpia el carrito
        return;
      }

      try {
        const cartRef = doc(db, "cart", user.uid);
        const cartSnap = await getDoc(cartRef);

        if (cartSnap.exists()) {
          setCart(cartSnap.data().items || []);
        } else {
          setCart([]); // Si no existe, inicializamos el carrito vacío
        }
      } catch (error) {
        console.error("Error al cargar el carrito:", error);
      }
    };

    loadCart();
  }, [user]); // Se ejecuta cada vez que el usuario cambia

  // Guarda el carrito en Firestore cuando cambie
  useEffect(() => {
    const saveCart = async () => {
      if (!user || !user.uid || cart.length === 0) return;

      try {
        const cartRef = doc(db, "cart", user.uid);
        await setDoc(cartRef, { items: cart });
      } catch (error) {
        console.error("Error al guardar el carrito:", error);
      }
    };

    saveCart();
  }, [cart, user]);

  // Función para agregar productos al carrito
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  // Función para eliminar un producto del carrito
  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  // Función para actualizar la cantidad de un producto en el carrito
  const updateQuantity = (productId, quantity) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId
          ? { ...item, quantity: Math.max(1, quantity) }
          : item
      )
    );
  };

  // Función para vaciar el carrito
  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);

