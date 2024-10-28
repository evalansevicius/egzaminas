import {
  Box,
  Flex,
  HStack,
  IconButton,
  useDisclosure,
  Stack,
  Button,
  useColorMode,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import {
  HamburgerIcon,
  CloseIcon,
  SunIcon,
  MoonIcon,
  
} from "@chakra-ui/icons";

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode(); //light/dark mode

  return (
    <Box bg={colorMode === "light" ? "gray.100" : "gray.800"} px={4}>
      <Flex h={16} alignItems="center" justifyContent="space-between">
        {/* Hamburger Menu Icon "MOBILE" */}
        <IconButton
          size="md"
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label="Open Menu"
          display={{ md: "none" }}
          onClick={isOpen ? onClose : onOpen}
        />

        {/* Logo and Links */}
        <HStack spacing={8} alignItems="center">
          <Box
            fontWeight="bold"
            color={colorMode === "light" ? "black" : "white"}
          >
            Coffee Shop
          </Box>
          <HStack as="nav" spacing={4} display={{ base: "none", md: "flex" }}>
            <Link
              px={2}
              py={1}
              rounded="md"
              _hover={{ textDecoration: "none", bg: "gray.700" }}
              href="#"
            >
              Home
            </Link>
            <Link
              px={2}
              py={1}
              rounded="md"
              _hover={{ textDecoration: "none", bg: "gray.700" }}
              href="#"
            >
              Products
            </Link>
            <Link
              px={2}
              py={1}
              rounded="md"
              _hover={{ textDecoration: "none", bg: "gray.700" }}
              href="#"
            >
              About
            </Link>
            <Link
              px={2}
              py={1}
              rounded="md"
              _hover={{ textDecoration: "none", bg: "gray.700" }}
              href="#"
            >
              Contact
            </Link>
          </HStack>
        </HStack>

        <Flex alignItems="center">
          {/* Sign In Button */}
          <Link to={"/register"}>
            <Button colorScheme="teal" size="sm" mr={4}>
              Sign In
            </Button>
          </Link>
          <Link to={"/cart"}>
            <Button colorScheme="teal" size="sm" mr={4}>
              Cart
            </Button>
          </Link>
          

       
          {/* Color Mode Toggle */}
          <IconButton
            ml={4}
            icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
            aria-label="Toggle Color Mode"
            onClick={toggleColorMode}
          />
        </Flex>
      </Flex>

      {/* Collapsible Menu for Mobile */}
      {isOpen ? (
        <Box pb={4} display={{ md: "none" }}>
          <Stack as="nav" spacing={4}>
            <Link href="#">Home</Link>
            <Link href="#">Products</Link>
            <Link href="#">About</Link>
            <Link href="#">Contact</Link>
          </Stack>
        </Box>
      ) : null}
    </Box>
  );
};

export default Navbar;
