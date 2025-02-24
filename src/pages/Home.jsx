import React from "react";
import { Box, Button, Text, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <Box
      position="relative"
      width="100%"
      height="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      color="white"
      px={4} // Espaciado en móviles
    >
      <Box
        position="absolute"
        top={0}
        left={0}
        width="100%"
        height="100%"
        backgroundImage="url('/home.jpg')" 
        backgroundSize="contain" 
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
        backgroundAttachment="fixed"
        zIndex={-1}
      />
      <Box
        position="absolute"
        top={0}
        left={0}
        width="100%"
        height="100%"
        bg="black"
        opacity={0.5} 
        zIndex={-1}
      />

      <VStack spacing={4}>
        <Text fontSize={{ base: "3xl", md: "5xl" }} fontWeight="bold">
          Mujer Bonita
        </Text>
        <Text fontSize={{ base: "lg", md: "2xl" }} letterSpacing="wide">
          VESTIDOS DE FIESTA
        </Text>
        <Link to="/productos">
          <Button
            bg="white"
            color="black"
            size="lg"
            fontWeight="bold"
            px={8}
            py={6}
            _hover={{ bg: "gray.200" }}
          >
            VER COLECCIÓN
          </Button>
        </Link>
      </VStack>
    </Box>
  );
};

export default Home;