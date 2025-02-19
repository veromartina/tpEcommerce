import React from "react";
import { Box, Image, Text, Button, Heading, SimpleGrid } from "@chakra-ui/react";
import { useCart } from "../context/CartContext";

const ShoppingCart = () => {
  const { cart, removeFromCart, clearCart } = useCart();

  // Calcula el total del carrito
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <Box p={4}>
      <Heading as="h2" size="lg" mb={4} textAlign="center">
        🛒 Mi Carrito
      </Heading>

      {cart.length === 0 ? (
        <Text textAlign="center" fontSize="xl" color="gray.500">
          Tu carrito está vacío.
        </Text>
      ) : (
        <>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
            {cart.map(({ id, name, image_url, price, quantity }) => (
              <Box
                key={id}
                borderWidth="1px"
                borderRadius="lg"
                p={4}
                boxShadow="md"
                display="flex"
                flexDirection="column"
                alignItems="center"
              >
                <Image src={image_url} alt={name} boxSize="120px" objectFit="cover" />
                <Text fontWeight="bold" mt={2} textAlign="center">
                  {name}
                </Text>
                <Text fontSize="lg" mt={1} textAlign="center">
                  ${price} x {quantity} = <b>${price * quantity}</b>
                </Text>
                <Button
                  colorScheme="red"
                  size="sm"
                  mt={2}
                  onClick={() => removeFromCart(id)}
                >
                  ❌ Eliminar
                </Button>
              </Box>
            ))}
          </SimpleGrid>

          <Text fontSize="xl" fontWeight="bold" mt={6} textAlign="center">
            Total: ${total.toFixed(2)}
          </Text>

          <Button
            colorScheme="red"
            mt={4}
            w="full"
            onClick={clearCart}
            isDisabled={cart.length === 0}
          >
            🗑 Vaciar Carrito
          </Button>
        </>
      )}
    </Box>
  );
};

export default ShoppingCart;