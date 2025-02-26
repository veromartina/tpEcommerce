import React from "react";
import { Box, IconButton, HStack, Text, Flex, Image } from "@chakra-ui/react";
import { FaWhatsapp, FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <Box
      as="footer"
      width="100%"
      minHeight="60px"
      py={4}
      px={6}
      bg="#bce7d7"
      position="fixed"
      bottom={0}
      left={0}
      zIndex={1000}
    >
      <Flex
        justify="space-between"
        align="center"
        maxW="1200px"
        mx="auto"
        flexDirection={{ base: "column", md: "row" }}
      >
        <Image src="/mujer.png" alt="Logo" boxSize="50px" />
        
        <Text fontSize="sm" textAlign="center" mb={{ base: 2, md: 0 }}>
          © 2025 - Martina Veronica Soledad || E-commerce. Todos los derechos reservados.
        </Text>

        <HStack spacing={4}>
          <IconButton as="a" href="https://wa.me/1234567890" target="_blank" icon={<FaWhatsapp />} aria-label="WhatsApp" variant="ghost" fontSize="2xl" _hover={{ color: "green.500" }} />
          <IconButton as="a" href="https://www.facebook.com/veronica.martina.92/" target="_blank" icon={<FaFacebook />} aria-label="Facebook" variant="ghost" fontSize="2xl" _hover={{ color: "blue.600" }} />
          <IconButton as="a" href="https://www.instagram.com/veronica.martina.92/" target="_blank" icon={<FaInstagram />} aria-label="Instagram" variant="ghost" fontSize="2xl" _hover={{ color: "pink.500" }} />
          <IconButton as="a" href="https://www.linkedin.com/in/ver%C3%B3nica-martina-575075273/" target="_blank" icon={<FaLinkedin />} aria-label="LinkedIn" variant="ghost" fontSize="2xl" _hover={{ color: "blue.800" }} />
        </HStack>
      </Flex>
    </Box>
  );
};

export default Footer;
