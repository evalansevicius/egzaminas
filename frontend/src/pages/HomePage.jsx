import { Container, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useProductStore } from "../store/productStore";
import ProductCard from "../components/ProductCard";

const HomePage = () => {
  const { getProducts, products } = useProductStore();

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  return (
    <Container maxW="container.2xl" py={12}>
      <VStack spacing={8}>
        <Text
          fontSize={"30"}
          fontWeight={"bold"}
          bgGradient={"linear(to-r, cyan.400, blue.500)"}
          bgClip={"text"}
          textAlign={"center"}
        >
          Current Products
        </Text>

        <SimpleGrid
          columns={{
            base: 1,
            sm: 2,
            md: 3,
            lg: 4,
            xl: 5,
          }}
          spacing={6}
          w={"full"}
        >
          {products.map((product) => (
            <ProductCard key={product.productID} product={product} />
          ))}
        </SimpleGrid>

        {products.length === 0 && (
          <Text
            fontSize="xl"
            textAlign={"center"}
            fontWeight="bold"
            color="gray.500"
          >
            No products found 😢{" "}
          </Text>
        )}
      </VStack>
    </Container>
  );
};
export default HomePage;
