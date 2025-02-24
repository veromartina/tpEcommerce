import {
  Button,
  HStack,
  Text,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  useDisclosure,
  IconButton,
  useBreakpointValue,
  Box,
  Image,
  Flex,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import React from "react";
import { NavLink, Link as RouterLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
//import { useCart } from "../context/CartContext";


const Header = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isMobile = useBreakpointValue({ base: true, md: true, lg: false });
  const { logout } = useAuth();

  return (
    <Box as="header" width="100%" py={2} px={6} boxShadow="sm" bg="#bce7d7" position="fixed"
    zIndex={1000}>
      <HStack justify="space-between" align="center" maxW="1200px" mx="auto">
        {/* Logo y nombre de la tienda */}
        <HStack spacing={2}>
          <Image src="/mujer.png" alt="Logo" boxSize="50px" />
          <Text fontSize={{ base: '20px', md: '30px', lg: '46px' }}fontWeight="bold" fontFamily="'Playfair Display', serif">
            Mujer Bonita
          </Text>
        </HStack>

        {/* Menú en pantallas grandes */}
        {!isMobile ? (
          <HStack spacing={6}>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/productos"  >Nuestros productos</NavLink>
            <NavLink to="/register">Registrarme</NavLink>
            <NavLink to="/login">Iniciar sesión</NavLink>
            <Button colorScheme="red" onClick={logout}>
              Cerrar sesión
            </Button>
            <RouterLink to="/cart">
              <Button variant="ghost" fontSize="2xl">🛒</Button>
            </RouterLink>
          </HStack>
        ) : (
          <IconButton
            aria-label="Abrir menú"
            icon={<HamburgerIcon />}
            onClick={onOpen}
            variant="outline"
          />
        )}
      </HStack>

      {/* Menú móvil */}
      <Drawer isOpen={isOpen} placement="top" onClose={onClose} >
        <DrawerOverlay />
        <DrawerContent bg="#bce7d7" fontFamily="'Playfair Display', serif">
          <DrawerCloseButton /> 
          <DrawerHeader>Menú</DrawerHeader>
          <DrawerBody>
            <Flex direction="column" gap={4}>
              <NavLink to="/" onClick={onClose}>Home</NavLink>
              <NavLink to="/productos" onClick={onClose}>Nuestros productos</NavLink>
              <NavLink to="/register" onClick={onClose}>Registrarme</NavLink>
              <NavLink to="/login" onClick={onClose}>Iniciar sesión</NavLink>
              <NavLink to="/orders" onClick={onClose}>Mis pedidos</NavLink>
              
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default Header;
