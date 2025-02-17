import React from "react";
import { Box, IconButton, HStack, Text } from "@chakra-ui/react";
import {
  FaWhatsapp,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa"; 

const Footer = () => {
  return (
    <Box
      as="footer"
      position="relative"
      bottom="0"
      width="100%"
      py={4}
      bg="gray.600"
      color="white"
    >
      <HStack
        justify={{ base: "center", md: "center" }} 
        spacing={{ base: 4, md: 6 }} 
        wrap="wrap" 
        direction={{ base: "column", sm: "row" }} 
      >
        <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer">
          <IconButton
            icon={<FaWhatsapp />}
            aria-label="WhatsApp"
            colorScheme="teal"
            fontSize={{ base: "3xl", sm: "2xl" }} 
            variant="ghost"
            _hover={{ color: "green.500" }}
          />
        </a>
        <a href="https://www.facebook.com/veronica.martina.92/" target="_blank" rel="noopener noreferrer">
          <IconButton
            icon={<FaFacebook />}
            aria-label="Facebook"
            colorScheme="blue"
            fontSize={{ base: "3xl", sm: "2xl" }}
            variant="ghost"
            _hover={{ color: "facebook.500" }}
          />
        </a>
        <a href="https://www.instagram.com/veronica.martina.92/" target="_blank" rel="noopener noreferrer">
          <IconButton
            icon={<FaInstagram />}
            aria-label="Instagram"
            colorScheme="pink"
            fontSize={{ base: "3xl", sm: "2xl" }}
            variant="ghost"
            _hover={{ color: "pink.500" }}
          />
        </a>
        <a href="https://www.linkedin.com/in/ver%C3%B3nica-martina-575075273/" target="_blank" rel="noopener noreferrer">
          <IconButton
            icon={<FaLinkedin />}
            aria-label="LinkedIn"
            colorScheme="linkedin"
            fontSize={{ base: "3xl", sm: "2xl" }}
            variant="ghost"
            _hover={{ color: "linkedin.500" }}
          />
        </a>
      </HStack>
      <Text textAlign="center" mt={4} fontSize="sm">
      © 2025 - Martina Veronica Soledad || E-commerce. Todos los derechos reservados.
      </Text>
    </Box>
  );
};

export default Footer;