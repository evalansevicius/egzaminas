import { Container, SimpleGrid, Text, VStack, Spinner, Box } from "@chakra-ui/react";
import { useEffect } from "react";
import { useProductStore } from "../store/productStore";
import ProductCard from "../components/ProductCard";

const HomePage = () => {
  const { getProducts, products, isLoading } = useProductStore();

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  return (
    <Container maxW="container.2xl" py={12}>
      <VStack spacing={8}>
        <Text
          fontSize={{ base: "2xl", sm: "3xl", md: "4xl" }}
          fontWeight="bold"
          bgGradient="linear(to-r, cyan.400, blue.500)"
          bgClip="text"
          textAlign="center"
        >
          Current Products
        </Text>

        {isLoading ? (
          <Box textAlign="center">
            <Spinner size="lg" />
          </Box>
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
          >
            {products.length > 0 ? (
              products.map((product) => (
                <ProductCard key={product.productID} product={product} />
              ))
            ) : (
              <Text
                fontSize="xl"
                textAlign="center"
                fontWeight="bold"
                color="gray.500"
              >
                No products found 😢
              </Text>
            )}
          </SimpleGrid>
        )}
      </VStack>
    </Container>
  );
};

export default HomePage;
