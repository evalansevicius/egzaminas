import { useEffect } from 'react';
import { Box, SimpleGrid, Text, VStack, Spinner, Alert, AlertIcon } from '@chakra-ui/react';
import { useProductStore } from '../store/productStore'; // Ensure the store is correctly imported
import ProductCard from '../components/ProductCard';

const HomePage = () => {
  const { getProducts, products = [], isLoading, isError } = useProductStore(); // Default to an empty array if products is not yet available

  useEffect(() => {
    getProducts(); // Fetch products on component mount
  }, [getProducts]);

  return (
    <Box minHeight="100vh" display="flex" flexDirection="column">
      <VStack spacing={8} align="center">
        <Text
          fontSize={{ base: '2xl', sm: '3xl', md: '4xl' }}
          fontWeight="bold"
          bgGradient="linear(to-r, #D4AF37, #B77A29)"
          bgClip="text"
          textAlign="center"
        >
          Enjoy the Perfect Coffee
        </Text>

        {/* Error or Loading Spinner */}
        {isLoading ? (
          <Box textAlign="center">
            <Spinner size="lg" />
          </Box>
        ) : isError ? (
          <Alert status="error" textAlign="center">
            <AlertIcon />
            Failed to load products. Please try again later.
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
          >
            {products.length > 0 ? (
              products.map((product) => (
                <ProductCard key={product.productID} product={product} />
              ))
            ) : (
              <Text fontSize="xl" textAlign="center" fontWeight="bold" color="gray.500">
                No products found 😢
              </Text>
            )}
          </SimpleGrid>
        )}
      </VStack>
    </Box>
  );
};

export default HomePage;
