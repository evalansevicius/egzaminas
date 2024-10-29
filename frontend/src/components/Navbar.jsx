import React, { useEffect, useContext, useRef } from 'react';
import {
  Box,
  Flex,
  HStack,
  IconButton,
  useDisclosure,
  Stack,
  Button,
  useColorMode,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import {
  HamburgerIcon,
  CloseIcon,
  SunIcon,
  MoonIcon,
  PlusSquareIcon
  
} from "@chakra-ui/icons";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/authContext';
import { IoBagAddOutline } from "react-icons/io5";
const Navbar = () => {
  const { isLoggedIn, setIsLoggedIn, role, setRole, name, setName, handleLogout, storedRole, storedName, token } = useContext(AuthContext);  
  const navigate = useNavigate();
  const cancelRef = useRef();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode(); 
  const confirmLogout = () => {
    onOpen()
  };

  useEffect(() => {
    if (token) {
      setIsLoggedIn(true);
  
      if (storedRole === 'user') {
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
  }, []);


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
            <Link to="/">
              <Button variant="ghost">Home</Button>
            </Link>
            <Link to="/products">
              <Button variant="ghost">Products</Button>
            </Link>
            <Link to="/about">
              <Button variant="ghost">About</Button>
            </Link>
            <Link to="/contact">
              <Button variant="ghost">Contact</Button>
            </Link>
            { role === 'admin' && (
            <Link to="/admin">
              <Button variant="ghost">Admin Dashboard</Button>
            </Link>
)}
          </HStack>
        </HStack>

          

          {/* Sign In or Logout Button */}
          <Flex alignItems="center">
          {isLoggedIn ? (
            <>
            {name && (
            <span>{name ? `Welcome, ${name}${role === 'admin' ? ' (Admin)' : ''}` : ''}</span>
          )}
            <Button colorScheme="teal" size="sm" mr={4} ml={4} onClick={confirmLogout}>
              Logout
            </Button>
            </>
          ) : (
            <>
          <Link to="/login">
            <Button colorScheme="teal" size="sm" mr={4}>
              Sign In
            </Button>
          </Link>
          </>
          )}

          {/* Plus Button */}
          { role === 'admin' && (
             <Link to="/create">
            <Button mr={4} size="md">
              <PlusSquareIcon fontSize={20} />
            </Button>
          </Link>
          )}
          <Link to="/cart">
          <Button size="md">
            <IoBagAddOutline fontSize={20} />
          </Button>
          </Link>

          {/* Color Mode Toggle */}
          <IconButton
          fontSize={20}
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
            <Link to="/">Home</Link>
            <Link to="/products">Products</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
          </Stack>
        </Box>
      ) : null}

      {/* Logout Confirmation Dialog */}
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef} // Focus on cancel button by default
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Confirm Logout
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to log out?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button
                colorScheme="red"
                onClick={() => {
                  handleLogout(); // Call the logout function if confirmed
                  onClose(); // Close the dialog after logout
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
