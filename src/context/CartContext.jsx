
import { createContext, useContext, useState, useEffect } from "react";
import { db } from "../firebase/config";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";

// Creamos el contexto del carrito
const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useAuth(); // Obtenemos el usuario desde el contexto de autenticación
  const [cart, setCart] = useState([]); // Estado para almacenar los productos del carrito

  // Cargar el carrito desde Firestore cuando el usuario inicie sesión
  useEffect(() => {
    const loadCart = async () => {
      if (user) {
        const cartRef = doc(db, "carts", user.uid);
        const cartSnap = await getDoc(cartRef);
        if (cartSnap.exists()) {
          setCart(cartSnap.data().items || []); // Si existe el carrito, cargamos los productos
        } else {
          setCart([]); // Si no existe, dejamos el carrito vacío
        }
      } else {
        setCart([]); // Si no hay usuario, limpiamos el carrito
      }
    };

    loadCart();
  }, [user]); // Cargar cuando el usuario cambie

  // Guardar el carrito en Firestore cuando cambie
  useEffect(() => {
    const saveCart = async () => {
      if (user) {
        const cartRef = doc(db, "carts", user.uid);
        await setDoc(cartRef, { items: cart });
      }
    };

    saveCart();
  }, [cart, user]); // Guardar el carrito cuando cambie o cuando cambie el usuario

  // Función para agregar productos al carrito
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 } // Si ya existe, incrementamos la cantidad
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }]; // Si no existe, lo agregamos con cantidad 1
      }
    });
  };

  // Función para eliminar un producto del carrito
  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  // Función para actualizar la cantidad de un producto
  const updateQuantity = (productId, quantity) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId
          ? { ...item, quantity: Math.max(1, quantity) } // Aseguramos que la cantidad no sea menor que 1
          : item
      )
    );
  };

  // Función para limpiar el carrito
  const clearCart = () => {
    setCart([]);
  };

  // Proveemos el valor del contexto
  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Hook para acceder al contexto
export const useCart = () => useContext(CartContext);
