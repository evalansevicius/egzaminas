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
  PlusSquareIcon
} from "@chakra-ui/icons";
import { AuthContext } from '../contexts/authContext';
import { IoBagAddOutline } from "react-icons/io5";

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
    <Box bg={colorMode === "light" ? "gray.100" : "gray.800"} px={4}>
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
              <Button variant="ghost" fontWeight="bold">Coffee Shop</Button>
            </Link>
            <Link to="/about">
              <Button variant="ghost">About</Button>
            </Link>
            <Link to="/contact">
              <Button variant="ghost">Contact</Button>
            </Link>
            {(role === 'admin' || role === 'superadmin') && (
              <Link to="/admin">
                <Button variant="ghost">Admin Dashboard</Button>
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
              <Button colorScheme="teal" size="sm" mr={4}>
                Sign In
              </Button>
            </Link>
          )}
          {(role === 'admin' || role === 'superadmin') && (
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
