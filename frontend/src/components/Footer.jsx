import { Box, Text, Stack, IconButton } from "@chakra-ui/react";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <Box
      as="footer"
      position="relative"
      width="100%"
      bg="gray.800"
      color="white"
      py={4}
      zIndex="1000" // Ensures the footer stays on top of other content if needed
    >
      <Stack direction={{ base: "column", md: "row" }} justify="space-between" align="center" px={4} spacing={4}>
        {/* Left Side - Company Info */}
        <Stack spacing={1} textAlign={{ base: "center", md: "left" }}>
          <Text fontWeight="bold" fontSize="lg">
            Coffee Shop
          </Text>
          <Text fontSize="sm">© 2024 Coffee Shop. All rights reserved.</Text>
        </Stack>

        {/* Middle - Links */}
        <Stack direction="row" spacing={6} justify={{ base: "center", md: "center" }} align="center">
          <Link to="/" style={{ textDecoration: "none", color: "white" }}>Home</Link>
          <Link to="/about" style={{ textDecoration: "none", color: "white" }}>About</Link>
          <Link to="/contact" style={{ textDecoration: "none", color: "white" }}>Contact</Link>
        </Stack>

        {/* Right Side - Social Media Icons */}
        <Stack direction="row" spacing={4} justify={{ base: "center", md: "center" }} align="center">
          <IconButton
            as={Link}
            href="#"
            icon={<FaFacebook />}
            bg="gray.700"
            _hover={{ bg: "white", color: "gray.700" }}
            isRound
          />
          <IconButton
            as={Link}
            href="#"
            icon={<FaInstagram />}
            bg="gray.700"
            _hover={{ bg: "white", color: "gray.700" }}
            isRound
          />
          <IconButton
            as={Link}
            href="#"
            icon={<FaTwitter />}
            bg="gray.700"
            _hover={{ bg: "white", color: "gray.700" }}
            isRound
          />
        </Stack>
      </Stack>
    </Box>
  );
};

export default Footer;
