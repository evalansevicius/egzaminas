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
import { Link, useNavigate } from "react-router-dom";
import {
  HamburgerIcon,
  CloseIcon,
  SunIcon,
  MoonIcon,
  PlusSquareIcon,
  InfoIcon,
  PhoneIcon,
  AddIcon,
} from "@chakra-ui/icons";
import { AuthContext } from '../contexts/authContext';
import { IoBagAddOutline } from "react-icons/io5";
import { HiHome } from "react-icons/hi";
import { AiOutlineLogin } from "react-icons/ai";

const Navbar = () => {
  const { isLoggedIn, setIsLoggedIn, role, setRole, name, setName, handleLogout, storedRole, storedName, token } = useContext(AuthContext);  
  const navigate = useNavigate();
  const cancelRef = useRef();
  const menuDisclosure = useDisclosure();
  const logoutDialogDisclosure = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();

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
  }, [token, setIsLoggedIn, setRole, setName, storedRole, storedName]);

  const confirmLogout = () => {
    logoutDialogDisclosure.onOpen();
  };

  return (
    <Box 
      bg={colorMode === "light" ? "gray.200" : "gray.700"} // Neutral background color for light and dark mode
      px={4} 
      position="sticky" 
      top="0" 
      zIndex="1000"
      shadow="md" // Optional: Adds a shadow effect
    >
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <IconButton
          size="md"
          icon={menuDisclosure.isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label="Open Menu"
          display={{ md: "none" }}
          onClick={menuDisclosure.onToggle}
        />
        <HStack spacing={8} alignItems="center">
          <HStack as="nav" spacing={4} display={{ base: "none", md: "flex" }}>
            <Link to="/">
              <IconButton aria-label="Home" icon={<HiHome />} />
            </Link>
            <Link to="/about">
              <IconButton aria-label="About" icon={<InfoIcon />} />
            </Link>
            <Link to="/contact">
              <IconButton aria-label="Contact" icon={<PhoneIcon />} />
            </Link>
            {(role === 'admin' || role === 'superadmin') && (
              <Link to="/admin">
                <IconButton aria-label="Admin Dashboard" icon={<AddIcon />} />
              </Link>
            )}
          </HStack>
        </HStack>
        <Flex alignItems="center">
          {isLoggedIn ? (
            <>
              {name && (
                <span>{`Welcome, ${name} ${role === 'superadmin' ? '(Superadmin)' : role === 'admin' ? '(Admin)' : ''}`}</span>
              )}
              <Button colorScheme="teal" size="sm" mr={4} ml={4} onClick={confirmLogout}>
                Logout
              </Button>
            </>
          ) : (
            <Link to="/login">
              <IconButton 
                colorScheme="teal" 
                size="md" 
                mr={4} 
                icon={<AiOutlineLogin />} 
                aria-label="Sign In"
              />
            </Link>
          )}
          {(role === 'admin' || role === 'superadmin') && (
            <Link to="/create">
              <IconButton mr={4} size="md" icon={<PlusSquareIcon />} />
            </Link>
          )}
          <Link to="/cart">
            <IconButton size="md" aria-label="Cart" icon={<IoBagAddOutline fontSize={20} />} />
          </Link>
          <IconButton
            fontSize={20}
            ml={4}
            icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
            aria-label="Toggle Color Mode"
            onClick={toggleColorMode}
          />
        </Flex>
      </Flex>
      {menuDisclosure.isOpen ? (
        <Box pb={4} display={{ md: "none" }}>
          <Stack as="nav" spacing={4}>
            <Link to="/">Home</Link>
            <Link to="/products">Products</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
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
            <AlertDialogBody>
              Are you sure you want to log out?
            </AlertDialogBody>
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
