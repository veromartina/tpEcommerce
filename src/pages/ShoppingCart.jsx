
import React from "react";
import { Box, Image, Text, Button, Heading, SimpleGrid } from "@chakra-ui/react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { createOrder } from "../firebase/createOrder";
import { Link as RouterLink } from "react-router-dom";

const ShoppingCart = () => {
  const { cart, removeFromCart, clearCart } = useCart();
  const { user } = useAuth();

  // Calcular el total
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

 //crear pedido
 const handleCheckout = async () => {
  if (!user || !user.uid) {
    alert("Debes iniciar sesión para completar tu compra.");
    return;
  }

  try {
    const orderRef = await createOrder(cart, user.uid);
    console.log("Pedido creado con ID:", orderRef.id);

    // 🛑 Limpiar carrito en Firestore
    clearCart();

  } catch (error) {
    console.error("Error al procesar el pedido:", error);
  }
};

  return (
    <Box p={4}>
      <Heading as="h2" size="lg" mb={4} textAlign="center">🛒 Mi Carrito</Heading>

      {cart.length === 0 ? (
        <Text textAlign="center" fontSize="xl" color="gray.500">
          Tu carrito está vacío.
        </Text>
      ) : (
        <>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
            {cart.map(({ id, name, image_url, price, quantity }) => (
              <Box key={id} borderWidth="1px" borderRadius="lg" p={4} boxShadow="md">
                <Image src={image_url} alt={name} boxSize="120px" objectFit="cover" />
                <Text fontWeight="bold">{name}</Text>
                <Text fontSize="lg">${price}</Text>
                <Button colorScheme="red" size="sm" mt={2} onClick={() => removeFromCart(id)}>
                  ❌ Eliminar
                </Button>
              </Box>
            ))}
          </SimpleGrid>

          <Text fontSize="xl" fontWeight="bold" mt={6} textAlign="center">
            Total: ${total.toFixed(2)}
          </Text>
          <Box display="flex" justifyContent="center">
            <Button colorScheme="red" mt={4} onClick={clearCart}>
              🗑 Vaciar Carrito
            </Button>
            <Button colorScheme="green" mt={4} ml={2} onClick={handleCheckout}>
              🛍 Finalizar Compra
            </Button>
          </Box>
          <RouterLink to={`/productos`}>
              <Button colorScheme="transparent" mt={2} w="full" textColor="blue" fontSize="md" fontWeight="normal">
                Seguir comprando ...
              </Button>
            </RouterLink>
        </>
      )}
    </Box>
  );
};

export default ShoppingCart;
