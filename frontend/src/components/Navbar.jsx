import React, { useEffect, useContext } from 'react';
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
  PlusSquareIcon,
} from "@chakra-ui/icons";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/authContext';

const Navbar = () => {
  const { isLoggedIn, setIsLoggedIn, role, setRole } = useContext(AuthContext);  
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode(); 


  useEffect(() => {
    
    const token = localStorage.getItem('token');
    const storedRole = localStorage.getItem('role');

    if (token) {
      setIsLoggedIn(true);
      setRole(storedRole || 'user');
    } else {
      setIsLoggedIn(false);
    }
  }, [setIsLoggedIn, setRole]); 

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem('token');  
    setIsLoggedIn(false); 
    setRole('user'); 
    navigate('/login'); 
  };

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
          </HStack>
        </HStack>

          {/* Display User Role */}
          <Flex alignItems="center">
          {isLoggedIn && (
            <Box color={colorMode === "light" ? "black" : "white"} mr={4}>
              Role: {role}
            </Box>
          )}

          {/* Sign In or Logout Button */}
          {isLoggedIn ? (
            <Button colorScheme="teal" size="sm" mr={4} onClick={handleLogout}>
              Logout
            </Button>
          ) : (
            <Link to="/login">
              <Button colorScheme="teal" size="sm" mr={4} onClick={() => setIsLoggedIn(true)}>
                Sign In
              </Button>
            </Link>
          )}

          {/* Plus Button */}
          <Link to="/create">
            <Button>
              <PlusSquareIcon fontSize={20} />
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
            <Link to="/">Home</Link>
            <Link to="/products">Products</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
          </Stack>
        </Box>
      ) : null}
    </Box>
  );
};

export default Navbar;
