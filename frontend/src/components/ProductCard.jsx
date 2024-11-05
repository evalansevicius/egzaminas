import React, { useState } from 'react';
import {
  Box,
  Button,
  Heading,
  HStack,
  IconButton,
  Image,
  Text,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';
import { IoBagAddOutline, IoStar } from 'react-icons/io5';
import { useCart } from '../contexts/CartContext'; // Ensure this path is correct
import { useProductStore } from '../store/product.js';

const ProductCard = ({ product }) => {
  const textColor = useColorModeValue('gray.600', 'gray.200');
  const bg = useColorModeValue('white', 'gray.800');
  const { addToCart } = useCart(); // Use the Cart context for adding items
  const incrementRating = useProductStore((state) => state.incrementRating); // For rating functionality
  const toast = useToast();
  const [rating, setRating] = useState(product.rating || 0);

  // Increment rating function with localStorage validation
  const handleIncrementRating = async () => {
    const ratedProducts = JSON.parse(localStorage.getItem('ratedProducts')) || [];

    // Check if the product is already rated
    if (ratedProducts.includes(product.productID)) {
      toast({
        title: 'Already Rated',
        description: 'You can only rate this product once.',
        status: 'info',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      const { success, rating: newRating } = await incrementRating(product.productID);

      if (success) {
        setRating(newRating); // Update rating in the component

        // Add the product to the list of rated products in localStorage
        ratedProducts.push(product.productID);
        localStorage.setItem('ratedProducts', JSON.stringify(ratedProducts));

        toast({
          title: 'Rating Updated',
          description: `Rating for ${product.name} has been increased.`,
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Could not update the rating.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  // Handle adding product to the cart
  const handleAddToCart = () => {
    addToCart(product); // Add product to the cart context
    toast({
      title: 'Added to Cart',
      description: `${product.name} has been added to your cart.`,
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Box
      shadow="lg"
      rounded="lg"
      overflow="hidden"
      transition="all 0.3s"
      _hover={{ transform: 'translateY(-5px)', shadow: 'xl' }}
      bg={bg}
      p={4}
    >
      {/* Product Image */}
      <Image src={product.image} alt={product.name} h={48} w="full" objectFit="cover" />

      <Box p={4}>
        {/* Product Name and Price */}
        <Heading as="h3" size="md" mb={2}>
          {product.name}
        </Heading>
        <Text fontWeight="bold" fontSize="xl" color={textColor} mb={4}>
          €{product.price}
        </Text>

        {/* Product Description */}
        <Text fontSize="sm" color={textColor} mb={4}>
          {product.description}
        </Text>

        {/* Action Buttons */}
        <HStack spacing={2}>
          <IconButton
            colorScheme="teal"
            icon={<IoBagAddOutline />}
            onClick={handleAddToCart}
            aria-label="Add to Cart"
          />
          <Button onClick={handleIncrementRating} colorScheme="yellow" leftIcon={<IoStar />}>
            {rating} {/* Display the current rating */}
          </Button>
        </HStack>
      </Box>
    </Box>
  );
};

export default ProductCard;
