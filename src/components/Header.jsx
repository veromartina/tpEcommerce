import { Button, HStack, Link, SimpleGrid, Text, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, useDisclosure, IconButton, useBreakpointValue, Box, Image } from "@chakra-ui/react";
import React from "react";
import { NavLink, Link as RouterLink } from "react-router-dom";

const Header = () => {
  // Drawer control
  const { isOpen, onOpen, onClose } = useDisclosure();
  
  // Determina si es una pantalla pequeña (hasta 425px)
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <SimpleGrid>
      <HStack 
        justify="space-between" 
        marginY="15px" 
        marginX="10px"
        width="100%"
        align="center"
      >
        <Box >
      <Image
        src="/mujer.png" 
        alt="Icono"
        width="100%"  
      />
    </Box>

        {/* Ícono de menú en pantallas pequeñas */}
        {isMobile && (
          <IconButton 
            aria-label="Menu" 
            variant="outline" 
            onClick={onOpen} 
            colorScheme="teal"
          />
        )}

        {/* Links de navegación con tamaño de letra responsivo */}
        {!isMobile ? (
          <HStack spacing={4} display="flex">
            <NavLink as={Link} to="/">
              <Text fontSize={{ base: "sm", md: "md", lg: "lg" }} _hover={{ color: "teal.500" }}>
                Home
              </Text>
            </NavLink>

            <NavLink as={Link} to="/productos" onClick={onClose}>
              <Text fontSize={{ base: "sm", md: "md", lg: "lg" }} _hover={{ color: "teal.500" }}>
                Nuestros productos
              </Text>
            </NavLink>

            <NavLink as={Link} to="/register">
              <Text fontSize={{ base: "sm", md: "md", lg: "lg" }} _hover={{ color: "teal.500" }}>
                Registrarme
              </Text>
            </NavLink>

            <NavLink as={Link} to="/create">
              <Text fontSize={{ base: "sm", md: "md", lg: "lg" }} _hover={{ color: "teal.500" }}>
                Mis pedidos
              </Text>
            </NavLink>
          </HStack>
        ) : null}

        {/* Botón "Iniciar sesión" */}
      
          <Button
           as="a" href="/login" 
            colorScheme="teal"
            variant="solid"
            size="sm"
            _hover={{ bg: "teal.600", transform: "scale(1.05)" }}
            _focus={{ boxShadow: "outline" }}
            ml={4}
          >
            Iniciar sesión
          </Button>

          {/* Botón "Cerrar  sesión" */}
      
          <Button
           as="a" href="/" 
            colorScheme="teal"
            variant="solid"
            size="sm"
            _hover={{ bg: "teal.600", transform: "scale(1.05)" }}
            _focus={{ boxShadow: "outline" }}
            ml={4}
          >
            Cerrar sesión
          </Button>
        
      </HStack>

      {/* Drawer - Menú en móviles */}
      <Drawer isOpen={isOpen} placement="top" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Menú</DrawerHeader>

          <DrawerBody>
            <NavLink as={Link} to="/" onClick={onClose}>
              <Text fontSize="xl" mb={4}>Home</Text>
            </NavLink>
            <NavLink as={Link} to="/productos" onClick={onClose}>
              <Text fontSize="xl" mb={4}>Nuestros productos</Text>
            </NavLink>
            <NavLink as={Link} to="/register" onClick={onClose}>
              <Text fontSize="xl" mb={4}>Registrarme</Text>
            </NavLink>
            <NavLink as={Link} to="/create" onClick={onClose}>
              <Text fontSize="xl" mb={4}>Mis pedidos</Text>
            </NavLink>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </SimpleGrid>
  );
};

export default Header;


