import React from "react";
import { Box, Container, Text, Stack, IconButton, HStack, useColorModeValue } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { FaHome, FaInfoCircle, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  // Dynamically change colors based on color mode (light/dark)
  const bgColor = useColorModeValue("gray.200", "gray.800");  // Footer background
  const textColor = useColorModeValue("black", "white");  // Text color for light/dark mode
  const iconColor = useColorModeValue("gray.600", "white");  // Icon color for light/dark mode

  return (
    <Box bg={bgColor} color={textColor} py={6}>
      <Container maxW="container.xl">
        <Stack
          direction={{ base: "column", md: "row" }}
          spacing={6}
          justify="space-between"
          align="center"
        >
          <HStack spacing={6}>
            <Link to="/">
              <IconButton
                aria-label="Home"
                icon={<FaHome />}
                variant="link"
                fontSize="lg"
                color={iconColor}  // Set the icon color dynamically
                _hover={{ textDecoration: "none", color: "teal.500" }}  // Hover effect for icons
              />
            </Link>
            <Link to="/about">
              <IconButton
                aria-label="About"
                icon={<FaInfoCircle />}
                variant="link"
                fontSize="lg"
                color={iconColor}  // Set the icon color dynamically
                _hover={{ textDecoration: "none", color: "teal.500" }}  // Hover effect for icons
              />
            </Link>
            <Link to="/contact">
              <IconButton
                aria-label="Contact"
                icon={<FaEnvelope />}
                variant="link"
                fontSize="lg"
                color={iconColor}  // Set the icon color dynamically
                _hover={{ textDecoration: "none", color: "teal.500" }}  // Hover effect for icons
              />
            </Link>
          </HStack>

          <Text fontSize="sm" textAlign="center" mt={4}>
            © 2024 Coffee Shop. All Rights Reserved.
          </Text>
        </Stack>
      </Container>
    </Box>
  );
};

export default Footer;
