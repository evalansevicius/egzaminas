import React from "react";
import {
  Box,
  Container,
  Text,
  Stack,
  IconButton,
  useBreakpointValue,
  useColorMode,
  HStack,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { FaHome, FaInfoCircle, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  const { colorMode } = useColorMode();
  const footerBgColor = colorMode === "light" ? "gray.100" : "gray.800";
  const iconColor = colorMode === "light" ? "black" : "white";
  const textColor = colorMode === "light" ? "black" : "white";

  return (
    <Box bg={footerBgColor} color="white" py={10} mt="auto">
      <Container maxW="container.xl">
        <Stack
          direction={useBreakpointValue({ base: "column", md: "row" })}
          spacing={6}
          justify="space-between"
          align="center"
        >
          <HStack spacing={6}>
            <Link to="/">
              <IconButton
                aria-label="Home"
                icon={<FaHome />}
                color={iconColor}
                variant="link"
                fontSize="lg"
                _hover={{ textDecoration: "none" }}
              />
            </Link>
            <Link to="/about">
              <IconButton
                aria-label="About"
                icon={<FaInfoCircle />}
                color={iconColor}
                variant="link"
                fontSize="lg"
                _hover={{ textDecoration: "none" }}
              />
            </Link>
            <Link to="/contact">
              <IconButton
                aria-label="Contact"
                icon={<FaEnvelope />}
                color={iconColor}
                variant="link"
                fontSize="lg"
                _hover={{ textDecoration: "none" }}
              />
            </Link>
          </HStack>

          <Text fontSize="sm" textAlign="center" color={textColor} mt={4}>
            © 2024 Coffee Shop. All Rights Reserved.
          </Text>
        </Stack>
      </Container>
    </Box>
  );
};

export default Footer;
