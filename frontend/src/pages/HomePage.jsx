import { useEffect } from "react";
import {
  Box,
  SimpleGrid,
  Text,
  VStack,
  Spinner,
  Alert,
  AlertIcon,
  Image,
  Heading,
  Button,
} from "@chakra-ui/react";
import { useProductStore } from "../store/productStore";
import ProductCard from "../components/ProductCard";

const HomePage = () => {
  const { getProducts, products = [], isLoading, isError } = useProductStore();

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  return (
    <Box minHeight="100vh" display="flex" flexDirection="column">
      {/* Hero Section */}
      <Box
        bgGradient="linear(to-r, #D4AF37, #B77A29)"
        color="white"
        py={16}
        px={8}
        textAlign="center"
        mb={8}
      >
        <VStack spacing={6}>
          <Heading
            fontSize={{ base: "2xl", sm: "3xl", md: "4xl" }}
            bgGradient="linear(to-r, teal.300, yellow.400)"
            bgClip="text"
          >
            Welcome to the Coffee Hub
          </Heading>
          <Text fontSize={{ base: "lg", sm: "xl" }} maxWidth="600px">
            Discover our wide selection of coffee blends and find your perfect
            cup. Whether you're a casual drinker or a coffee connoisseur, we
            have something for everyone.
          </Text>
          <Button
            colorScheme="yellow"
            size="lg"
            variant="solid"
            onClick={() => window.scrollTo({ top: 500, behavior: "smooth" })}
          >
            Shop Now
          </Button>
        </VStack>
      </Box>

      {/* Main Content */}
      <VStack spacing={8} align="center">
        <Text
          fontSize={{ base: "2xl", sm: "3xl", md: "4xl" }}
          fontWeight="bold"
          bgGradient="linear(to-r, teal.300, yellow.400)"
          bgClip="text"
          textAlign="center"
        >
          Our Featured Products
        </Text>

        {/* Error or Loading Spinner */}
        {isLoading ? (
          <Box textAlign="center">
            <Spinner size="lg" />
            <Text mt={2} fontSize="md" color="gray.600">
              Brewing your perfect selection...
            </Text>
          </Box>
        ) : isError ? (
          <Alert status="error" textAlign="center" borderRadius="md">
            <AlertIcon />
            Oops! Something went wrong while loading products. Please refresh
            and try again.
          </Alert>
        ) : (
          <SimpleGrid
            columns={{
              base: 1,
              sm: 2,
              md: 3,
              lg: 4,
              xl: 5,
            }}
            spacing={6}
            w="full"
            px={{ base: 4, md: 8 }}
          >
            {products.length > 0 ? (
              products.map((product) => (
                <ProductCard key={product.productID} product={product} />
              ))
            ) : (
              <Box textAlign="center" mt={8}>
                <Image
                  src="https://via.placeholder.com/400x300?text=No+Products+Found"
                  alt="No Products Found"
                  borderRadius="md"
                />
                <Text
                  fontSize="xl"
                  textAlign="center"
                  fontWeight="bold"
                  color="gray.500"
                  mt={4}
                >
                  No products available right now 😢
                </Text>
              </Box>
            )}
          </SimpleGrid>
        )}
      </VStack>
    </Box>
  );
};

export default HomePage;
