import React, { useEffect, useContext, useRef } from "react";
import {
  Box,
  Flex,
  HStack,
  Button,
  useDisclosure,
  Stack,
  useColorMode,
  Text,
  Link as ChakraLink,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/authContext";

const Navbar = () => {
  const {
    isLoggedIn,
    setIsLoggedIn,
    role,
    setRole,
    name,
    setName,
    handleLogout,
    storedRole,
    storedName,
    token,
  } = useContext(AuthContext);

  const navigate = useNavigate();
  const cancelRef = useRef();
  const menuDisclosure = useDisclosure();
  const logoutDialogDisclosure = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();

  useEffect(() => {
    if (token) {
      setIsLoggedIn(true);
      if (storedRole === "user") {
        setRole(null);
        setName(storedName);
      } else {
        setRole(storedRole);
        setName(null);
      }
    } else {
      setIsLoggedIn(false);
      setRole(null);
      setName(null);
    }
  }, [token, setIsLoggedIn, setRole, setName, storedRole, storedName]);

  const confirmLogout = () => {
    logoutDialogDisclosure.onOpen();
  };

  return (
    <Box
      bg={colorMode === "light" ? "gray.100" : "gray.800"}
      px={4}
      position="sticky"
      top="0"
      zIndex="1000"
      shadow="md"
    >
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <Button
          size="lg"
          display={{ md: "none" }}
          onClick={menuDisclosure.onToggle}
          variant="ghost"
          aria-label="Toggle Menu"
        >
          {menuDisclosure.isOpen ? "Close Menu" : "Open Menu"}
        </Button>

        <HStack spacing={8} alignItems="center">
          <HStack as="nav" spacing={6} display={{ base: "none", md: "flex" }}>
            <Link to="/">
              <Button variant="link" colorScheme="teal" _hover={{ textDecoration: "underline" }}>
                Home
              </Button>
            </Link>
            <Link to="/about">
              <Button variant="link" colorScheme="teal" _hover={{ textDecoration: "underline" }}>
                About
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="link" colorScheme="teal" _hover={{ textDecoration: "underline" }}>
                Contact
              </Button>
            </Link>
            {(role === "admin" || role === "superadmin") && (
              <Link to="/admin">
                <Button variant="link" colorScheme="teal" _hover={{ textDecoration: "underline" }}>
                  Admin Dashboard
                </Button>
              </Link>
            )}
          </HStack>
        </HStack>

        <Flex alignItems="center">
          {isLoggedIn ? (
            <>
              {name && (
                <Text mr={4} fontWeight="bold">
                  {`Hello, ${name} ${
                    role === "superadmin"
                      ? "(Superadmin)"
                      : role === "admin"
                      ? "(Admin)"
                      : ""
                  }`}
                </Text>
              )}
              <Button colorScheme="teal" size="sm" mr={4} onClick={confirmLogout}>
                Logout
              </Button>
            </>
          ) : (
            <Link to="/login">
              <Button colorScheme="teal" size="sm" mr={4}>
                Sign In
              </Button>
            </Link>
          )}
          {(role === "admin" || role === "superadmin") && (
            <Link to="/create">
              <Button variant="outline" colorScheme="teal" mr={4}>
                Create Product
              </Button>
            </Link>
          )}
          <Link to="/cart">
            <Button variant="ghost" size="md" colorScheme="teal">
              Cart
            </Button>
          </Link>
          <Button
            fontSize="lg"
            ml={4}
            variant="ghost"
            onClick={toggleColorMode}
            aria-label="Toggle Color Mode"
          >
            {colorMode === "light" ? "🌙" : "☀️"}
          </Button>
        </Flex>
      </Flex>

      {menuDisclosure.isOpen ? (
        <Box pb={4} display={{ md: "none" }}>
          <Stack as="nav" spacing={4}>
            <Link to="/">
              <Button variant="link" colorScheme="teal">
                Home
              </Button>
            </Link>
            <Link to="/about">
              <Button variant="link" colorScheme="teal">
                About
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="link" colorScheme="teal">
                Contact
              </Button>
            </Link>
            {role && (
              <Link to="/admin">
                <Button variant="link" colorScheme="teal">
                  Admin Dashboard
                </Button>
              </Link>
            )}
          </Stack>
        </Box>
      ) : null}

      <AlertDialog
        isOpen={logoutDialogDisclosure.isOpen}
        leastDestructiveRef={cancelRef}
        onClose={logoutDialogDisclosure.onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Confirm Logout
            </AlertDialogHeader>
            <AlertDialogBody>Are you sure you want to log out?</AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={logoutDialogDisclosure.onClose}>
                Cancel
              </Button>
              <Button
                colorScheme="red"
                onClick={() => {
                  handleLogout();
                  logoutDialogDisclosure.onClose();
                }}
                ml={3}
              >
                Logout
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
};

export default Navbar;
