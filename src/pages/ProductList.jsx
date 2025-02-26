import { 
  Box, SimpleGrid, Image, Heading, Text, Button, Spinner, Alert, AlertIcon, Input 
} from "@chakra-ui/react"; 
import { db } from "../firebase/config";
import { collection, getDocs } from "firebase/firestore";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const ProductList = () => {
  const { addToCart } = useCart(); 
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedQuantities, setSelectedQuantities] = useState({}); //Estado global de cantidades

  useEffect(() => {
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

     
        const initialQuantities = {};
        productsData.forEach((product) => {
          initialQuantities[product.id] = 1;
        });
        setSelectedQuantities(initialQuantities);
      } catch (err) {
        setError("Hubo un problema al cargar los productos.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // ✅ Manejo de cantidad seleccionada
  const handleQuantityChange = (productId, value) => {
    const parsedValue = Number(value);
    const product = products.find(p => p.id === productId);

    // Si el valor está dentro del rango permitido, actualiza el estado
    if (parsedValue >= 1 && parsedValue <= product.stock) {
      setSelectedQuantities((prev) => ({
        ...prev,
        [productId]: parsedValue
      }));
    }
  };

  // ✅ Agregar al carrito con la cantidad correcta
  const handleAddToCart = (product) => {
    const quantity = selectedQuantities[product.id];

    if (!user) {
      alert("⚠️ Debes iniciar sesión para agregar productos al carrito.");  //ver por el boton desabilitado
      return;
    }

    if (quantity < 1 || quantity > product.stock) {
      alert("❌ Cantidad no válida.");
      return;
    }

    addToCart({ ...product, quantity });
    alert(`🛒 ${product.name} agregado al carrito.`);
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
    <Box>
      <Box width="100%" height="70px" display="flex" justifyContent="center" alignItems="center">
        <Heading as="h2" fontFamily="'Playfair Display', serif" fontSize={{ base: '15px', md: '25px', lg: '35px'}} fontWeight="bold">
          Nuestros productos disponibles
        </Heading>
      </Box>
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
            <Image src={image_url} alt={name} boxSize="200px" objectFit="contain" mx="auto" />
            <Heading fontWeight="bold" mt={2} textAlign="center" fontFamily="'Playfair Display', serif" fontSize={{ base: '5px', md: '10px', lg: '15px' }}>
              {name}
            </Heading>
            <Text fontSize="lg" fontWeight="normal" mt={2} textAlign="center">
              ${price}
            </Text>
            <Text textAlign="center">Stock:{stock}</Text>
            <RouterLink to={`/productos/${id}`}>
              <Button colorScheme="transparent" mt={2} w="full" textColor="blue" fontSize="md" fontWeight="normal">
                Ver más ...
              </Button>
            </RouterLink>
            <Box display="flex" justifyContent="center">
              <Button
                colorScheme="teal"
                mt={2}
                w="150px"
                onClick={() => handleAddToCart({ id, name, price, image_url, stock })}
                isDisabled={!user} // Deshabilita el botón si el usuario no ha iniciado sesión
              >
                Agregar al carrito
              </Button>
            </Box>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default ProductList;


 
