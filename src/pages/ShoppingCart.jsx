import React, { useState } from "react";
import { 
  Box, Image, Text, Button, Heading, SimpleGrid, VStack, Drawer, DrawerOverlay, DrawerContent, DrawerHeader, DrawerBody, DrawerFooter, Input 
} from "@chakra-ui/react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { createOrder } from "../firebase/createOrder";
import { Link as RouterLink, useNavigate } from "react-router-dom";

const ShoppingCart = () => {
  const { cart, updateQuantity, removeFromCart, clearCart, totalItems } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  // Calcular el total
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // Finalizar compra
  const handleCheckout = async () => {
    if (!user || !user.uid) {
      alert("Debes iniciar sesión para completar tu compra.");
      return;
    }

    try {
      await createOrder(cart, user.uid);
      clearCart();
      setOrderSuccess(true);
    } catch (error) {
      console.error("Error al procesar el pedido:", error);
    }
  };

  // Cerrar el Drawer y redirigir al Home
  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    navigate("/");
  };

  return (
    <Box p={4}>
      <Heading as="h2" size="lg" mb={4} textAlign="center">🛒 Mi Carrito ({totalItems})</Heading>

      {cart.length === 0 ? (
        <Text textAlign="center" fontSize="xl" color="gray.500">
          Tu carrito está vacío.
        </Text>
      ) : (
        <>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
            {cart.map(({ id, name, image_url, price, quantity, stock }) => (
              <Box key={id} borderWidth="1px" borderRadius="lg" p={4} boxShadow="md">
                <Image src={image_url} alt={name} boxSize="120px" objectFit="cover" />
                <Text fontWeight="bold">{name}</Text>
                <Text fontSize="lg">${price} c/u</Text>
                <Text fontSize="lg">cantidad: {quantity}</Text>
                <Box display="flex"  align-items="center" justifyContent="space-around">

              
                <Button colorScheme="red" size="sm" mt={2} onClick={() => removeFromCart(id)}>
                  ❌ Eliminar
                </Button>
                </Box>

              </Box>
            ))}
          </SimpleGrid>

          <Text fontSize="xl" fontWeight="bold" mt={6} textAlign="center">
            Total a pagar: ${total.toFixed(2)}
          </Text>

          <Box display="flex" justifyContent="center">
            <Button colorScheme="red" mt={4} onClick={clearCart}>
              🗑 Vaciar Carrito
            </Button>
            <Button colorScheme="green" mt={4} ml={2} onClick={() => setIsDrawerOpen(true)}>
              🛍 Revisar pedido
            </Button>
          </Box>

          <RouterLink to={`/productos`}>
            <Button colorScheme="transparent" mt={2} w="full" textColor="blue" fontSize="md" fontWeight="normal">
              Seguir comprando ...
            </Button>
          </RouterLink>
        </>
      )}

      {/* Drawer de Confirmación de Pedido */}
      <Drawer isOpen={isDrawerOpen} placement="right" onClose={handleCloseDrawer}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader>🛍 Resumen de su Pedido</DrawerHeader>
          <DrawerBody>
            {orderSuccess ? (
              <Text fontSize="lg" fontWeight="bold" color="green.500">
                ✅ ¡Su compra se realizó con éxito! Nos comunicaremos a la brevedad con usted para confirmar el pago.
              </Text>
                
            ) : (
              <VStack spacing={4} align="start">
                {cart.map(({ id, name, quantity }) => (
                  <Text key={id}>{name} x {quantity}</Text>
                ))}
                <Text fontSize="lg" fontWeight="bold">Total: ${total.toFixed(2)}</Text>
              </VStack>
            )}
          </DrawerBody>
          <DrawerFooter>
            {orderSuccess ? (
              <Button colorScheme="blue" onClick={handleCloseDrawer}>Ir al Home</Button>
            ) : (
              <Button colorScheme="green" onClick={handleCheckout}>Confirmar Compra</Button>
            )}
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default ShoppingCart;