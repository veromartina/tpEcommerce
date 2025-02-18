import React, { useState, useEffect } from "react";
import { createOrder } from "../services/orders.service";
import { useAuth } from "../context/AuthContext";
import { Box, Button, Card, Heading, Text, Image } from "@chakra-ui/react";
//import { getProducts } from "../services/products.service"; // Servicio para obtener los productos (debe estar implementado)

export const Create = () => {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { user } = useAuth();
  console.log(user);

  {/* Cargar productos de la base de datos (esto puede venir de Firebase o de otra fuente)
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await getProducts(); // Asegúrate de tener este servicio
        setSelectedProducts(products);
      } catch (err) {
        console.log("Error loading products", err);
      }
    };
    fetchProducts();
  }, []);
*/ }
  const handleProductSelect = (product) => {
    setSelectedProducts(prevSelected => [...prevSelected, product]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const order = await createOrder(selectedProducts, user.uid); // Asumiendo que seleccionaste varios productos
      console.log(order);
    } catch (error) {
      setError(true);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box maxW="1200px" mx="auto" mt="10" p="6" borderWidth="1px" borderRadius="lg" boxShadow="md">
      <Heading size="lg" mb="6" textAlign="center">
        Mi pedido
      </Heading>
      <Box display="grid" gridTemplateColumns="repeat(auto-fill, minmax(250px, 1fr))" gap="6">
        {selectedProducts.map((product) => (
          <Card key={product.id} p="4" borderWidth="1px" borderRadius="md">
            <Image src={product.image_url} alt={product.name} />
            <Text fontSize="lg" fontWeight="bold">{product.name}</Text>
            <Text>Precio: ${product.price}</Text>
            <Button onClick={() => handleProductSelect(product)}>Seleccionar</Button>
          </Card>
        ))}
      </Box>
      <Button m={2} type="submit" onClick={handleSubmit} isLoading={loading} colorScheme="teal">
        {loading ? "Creando..." : "Crear orden"}
      </Button>
      {error && <p>Hubo un error al crear la orden.</p>}
    </Box>
  );
};








/*
import React, { useState } from "react";
import { createOrder } from "../services/orders.service";
import { useAuth } from "../context/AuthContext"
import { Box, Button, Card, Heading } from "@chakra-ui/react";

export const Create = () => {
  const [values, setValues] = useState({
    name: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { user } = useAuth()
  console.log(user)

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const order = await createOrder(values.name, uid, image_url, price);
      console.log(order);

    } catch (error) {
      setError(true);
      console.log(error);

    } finally {
      setLoading(false);
    }
  }

  return (
    <Box maxW="400px" mx="auto" mt="10" p="6" borderWidth="1px"
    borderRadius="lg" boxShadow="md">
      <Heading size="lg" mb="6" textAlign="center">
        Crear pedido
      </Heading>
      <form onSubmit={onSubmit}>
        <div>
          <Card
          id="name"
          name="name"
          type="text"
          value={values.name}
      
          onChange={handleChange}
        />

        </div>
        {error && <p>Hubo un error</p>}
        <Button m={2} type="submit">{loading ? "Creando..." : "Crear orden" }</Button>
      </form>
    </Box>
  )
}
*/

