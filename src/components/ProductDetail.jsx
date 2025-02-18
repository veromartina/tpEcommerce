import { Card as CardChakra, CardBody, Divider, Heading, Image, Stack, Text, Button } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../firebase/config";  // Asegúrate de importar tu configuración de Firebase
import { doc, getDoc } from "firebase/firestore";

const ProductDetails = () => {
  const { id } = useParams(); // Obtiene el id del producto de la URL
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const docRef = doc(db, "productos", id); // Referencia al producto por id
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setProduct(docSnap.data());  // Seteamos los datos del producto
        } else {
          setError("Producto no encontrado");
        }
      } catch (err) {
        setError("Hubo un problema al cargar el producto");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct(); // Llamamos a la función para obtener el producto al cargar el componente
  }, [id]);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>{error}</Text>;
  }

  if (!product) {
    return <Text>No se encontró el producto.</Text>;
  }

  // Desestructuramos los detalles del producto
  const { name, description, price, image_url } = product;

  return (
    <CardChakra maxW="sm">
      <CardBody>
        <Image
          src={image_url} 
          alt={name}
          borderRadius="lg"
        />
        <Stack mt="6" spacing="3">
          <Heading size="md">{name}</Heading>
          <Text>{description}</Text>
          <Text color="blue.600" fontSize="2xl">
            $ {price}
          </Text>
        </Stack>
        <Button colorScheme="pink" onClick={() => navigate(-1)}>
          Atrás
        </Button>
      </CardBody>
      <Divider />
    </CardChakra>
  );
};

export default ProductDetails;