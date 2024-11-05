import { Box, Text, Stack, IconButton } from "@chakra-ui/react";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import { Link} from "react-router-dom";
const Footer = () => {
  return (
    <Box
      as="footer"
      position="fixed"
      bottom="0"
      left="0"
      width="100%"
      bg="gray.800"
      color="white"
      py={3}
      zIndex="1000" // Ensure it stays on top of other content
    >
      <Stack direction="row" justify="space-between" align="center" px={10}>
        {/* Left Side - Company Info */}
        <Stack>
          <Text fontWeight="bold" fontSize="lg">
            Coffee Shop
          </Text>
          <Text fontSize="sm">© 2024 Coffee Shop. All rights reserved.</Text>
        </Stack>

        {/* Middle - Links */}
        <Stack direction="row" spacing={6}>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </Stack>

        {/* Right Side - Social Media Icons */}
        <Stack direction="row" spacing={4}>
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
