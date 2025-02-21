import { Box, SimpleGrid, Image, Heading, Text, Button, Spinner, Alert, AlertIcon } from "@chakra-ui/react";
import { db } from "../firebase/config";
import { collection, getDocs } from "firebase/firestore";
import { useCart } from "../context/CartContext";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const ProductList = () => {
  const { addToCart, cart } = useCart(); // Obtenemos el carrito y la función para agregar productos
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "productos"));
      const productsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        image_url: doc.data().image_url,
        name: doc.data().name,
        price: doc.data().price,
        stock: doc.data().stock,
      }));
      setProducts(productsData);
    } catch (err) {
      setError("Hubo un problema al cargar los productos.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  //función para agregar al carrito evitando duplicados
  const handleAddToCart = (product) => {
    if (cart.some((item) => item.id === product.id)) {
      alert(`${product.name} ya está en el carrito.`);
    } else {
      addToCart(product);
      alert(`${product.name} agregado al carrito.`);
      navigate("/cart");
    }
  };

  if (loading) {
    return (
      <Box textAlign="center" mt={10}>
        <Spinner size="xl" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box textAlign="center" mt={10}>
        <Alert status="error">
          <AlertIcon />
          {error}
        </Alert>
      </Box>
    );
  }

  return (
    <Box p={4}>
      <Heading as="h2" size="lg" mb={4}>
        Nuestros productos disponibles
      </Heading>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
        {products.map(({ id, image_url, name, price, stock }) => (
          <Box
            key={id}
            borderWidth="0.5px"
            overflow="hidden"
            borderRadius={5}
            p={4}
            boxShadow="0px 4px 12px rgba(0, 0, 0, 0.3)"
            _hover={{ boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.5)" }}
          >
            <Image
              src={image_url}
              alt={name}
              boxSize="200px"
              objectFit="container"
              mx="auto"
            />
            <Heading fontSize="lg" fontWeight="bold" mt={2} textAlign="center">
              {name}
            </Heading>
           
            <Text fontSize="lg" fontWeight="normal" mt={2} textAlign="center">
              ${price}
            </Text>
            <RouterLink to={`/productos/${id}`}>
              <Button colorScheme="transparent" mt={2} w="full" textColor="blue" fontSize="md" fontWeight="normal">
                Ver más ...
              </Button>
            </RouterLink>
            <Button
              colorScheme="teal"
              mt={2}
              w="full"
              onClick={() => handleAddToCart({ id, name, price, image_url, stock })}
            >
              Agregar al carrito
            </Button>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default ProductList;
