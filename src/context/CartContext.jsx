import { createContext, useContext, useState, useEffect } from "react";
import { db } from "../firebase/config";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user, logout } = useAuth();
  const [cart, setCart] = useState([]);

  // Cargar el carrito desde Firestore al iniciar sesión
  useEffect(() => {
    const loadCart = async () => {
      if (!user) {
        setCart([]); // Si no hay usuario, limpiar carrito
        return;
      }

      try {
        const cartRef = doc(db, "cart", user.uid); // Se usa user directamente
        const cartSnap = await getDoc(cartRef);

        if (cartSnap.exists()) {
          setCart(cartSnap.data().items || []);
        } else {
          setCart([]); // Si no hay carrito guardado, inicializar vacío
        }
      } catch (error) {
        console.error("Error al cargar el carrito:", error);
      }
    };

    loadCart();
  }, [user]);

  // Guardar el carrito en Firestore cuando cambia
  useEffect(() => {
    const saveCart = async () => {
      if (!user || cart.length === 0) return;

      try {
        const cartRef = doc(db, "cart", user.uid); // Se usa user directamente
        await setDoc(cartRef, {uid:user.uid, items: cart });
      } catch (error) {
        console.error("Error al guardar el carrito:", error);
      }
    };

    saveCart();
  }, [cart, user]);

  // Guardar carrito antes de cerrar sesión
  const handleLogout = async () => {
    if (user) {
      try {
        // 💡 Opcional: eliminar el carrito de Firestore en lugar de solo limpiarlo
        const cartRef = doc(db, "cart", user.uid);
        await setDoc(cartRef, { uid: user.uid, items: [] }); // Guardar carrito vacío
      } catch (error) {
        console.error("Error al limpiar el carrito en Firestore:", error);
      }
    }
  
    await logout(); 
    setCart([]); // Vaciar carrito localmente
  };

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

  // Función para vaciar el carrito
const clearCart = async () => {
  setCart([]);
  
  if (user) {
    try {
      const cartRef = doc(db, "cart", user.uid);
      await setDoc(cartRef, { uid: user.uid, items: [] }); // Guardar carrito vacío en Firestore
    } catch (error) {
      console.error("Error al vaciar el carrito en Firestore:", error);
    }
  }
};

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart, handleLogout }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);