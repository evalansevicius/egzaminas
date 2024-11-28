import React from "react";
import { Box, Container, Text, Stack, IconButton, HStack, useColorModeValue } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { FaHome, FaInfoCircle, FaEnvelope } from "react-icons/fa";
import { useColorMode } from "@chakra-ui/react";

const Footer = () => {
  const bgColor = useColorModeValue("gray.200", "gray.800");
  const textColor = useColorModeValue("black", "white");
  const iconColor = useColorModeValue("gray.600", "white");
  const { colorMode } = useColorMode();

  return (
    <Box bg={bgColor} color={textColor} py={6} position="sticky" bottom="0" zIndex="1000">
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
                color={iconColor}
                _hover={{ textDecoration: "none", color: "teal.500" }}
              />
            </Link>
            <Link to="/about">
              <IconButton
                aria-label="About"
                icon={<FaInfoCircle />}
                variant="link"
                fontSize="lg"
                color={iconColor}
                _hover={{ textDecoration: "none", color: "teal.500" }}
              />
            </Link>
            <Link to="/contact">
              <IconButton
                aria-label="Contact"
                icon={<FaEnvelope />}
                variant="link"
                fontSize="lg"
                color={iconColor}
                _hover={{ textDecoration: "none", color: "teal.500" }}
              />
            </Link>
          </HStack>

          <Text fontSize="sm" textAlign="center" mt={4}>
            © 2024 Edgaro egzamino darbas.
          </Text>
        </Stack>
      </Container>
    </Box>
  );
};

export default Footer;
