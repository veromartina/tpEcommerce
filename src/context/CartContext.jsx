import { createContext, useContext, useState } from "react";

const CartContext = createContext();
import { useToast } from "@chakra-ui/react";

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Total de productos en el carrito (para el icono en el header)
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Actualizar cantidad de un producto
  const updateQuantity = (id, quantity) => {
    setCart((prevCart) =>
      prevCart.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  // Agregar producto al carrito
  const toast = useToast();
  const addToCart = (product) => {
    setCart((prevCart) => {
      const itemExists = prevCart.find((item) => item.id === product.id);
      if (itemExists) {
        // Verificar si la cantidad total supera el stock
        if (itemExists.quantity + 1 > product.stock) {
          toast({
            title: "Stock insuficiente",
            description: "No puedes agregar más unidades de este producto.",
            status: "warning",
            duration: 3000,
            isClosable: true,
            position: "top-right",
          });
          return prevCart;
        }

        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      // Agregar nuevo producto si hay stock disponible
      if (product.stock > 0) {
        return [...prevCart, { ...product, quantity: 1 }];
      } else {
        toast({
          title: "Producto agotado",
          description: "Este producto no tiene stock disponible.",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });
        return prevCart;
      }
    });
  };
  // Eliminar producto
  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  // Vaciar carrito
  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        totalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
