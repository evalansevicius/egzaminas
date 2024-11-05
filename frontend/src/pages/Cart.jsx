import React from 'react';
import { Box, Text, Stack, IconButton, Heading, VStack, HStack, Button, Image, useToast } from '@chakra-ui/react';
import { IoTrashOutline } from 'react-icons/io5'; // Trash icon for remove button
import { useCart } from '../contexts/CartContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cart, removeFromCart, increaseQuantity, decreaseQuantity } = useCart();
  const navigate = useNavigate();
  const toast = useToast(); // For toast notifications

  // Calculate total price
  const totalPrice = cart.reduce(
    (acc, product) => acc + product.price * product.quantity,
    0
  );

  // Handle Checkout button click
  const handleCheckout = () => {
    if (cart.length === 0) {
      toast({
        title: "Cart is empty.",
        description: "You need to add items to your cart before checkout.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
    } else {
      navigate('/checkout'); // Redirect to the Checkout page
    }
  };

  return (
    <Box
      p={4}
      display="flex"
      flexDirection="column"
      minHeight="100vh" // Ensures the full height of the viewport is used
    >
      {/* Cart Title */}
      <Heading as="h2" size="lg" mb={4}>
        Your Cart
      </Heading>

      {/* Cart Items Section */}
      <Box
        flex="1"
        overflowY="auto" // Enable scroll if items overflow
        mb={6} // Add space between items and checkout button
      >
        {cart.length === 0 ? (
          <Text>Your cart is empty.</Text>
        ) : (
          <>
            {/* Displaying all cart items */}
            {cart.map((product) => (
              <Box
                key={product.productID} // Ensure the correct product identifier is used
                borderWidth={1}
                borderRadius="lg"
                p={4}
                mb={4}
                bg="gray.50"
              >
                <HStack align="start" spacing={6}>
                  {/* Product Image */}
                  <Image
                    src={product.image}
                    alt={product.name}
                    boxSize="120px"
                    objectFit="cover"
                  />

                  {/* Product Details */}
                  <VStack align="start" spacing={1}>
                    <Text fontWeight="bold">{product.name}</Text>
                    <Text fontSize="sm" color="gray.600">
                      Price: €{product.price.toFixed(2)}
                    </Text>
                    <Text fontSize="sm" color="gray.600">
                      Description: {product.description}
                    </Text>
                    <HStack spacing={3}>
                      {/* Increase/Decrease Buttons */}
                      <Button
                        colorScheme="blue"
                        onClick={() => increaseQuantity(product.productID)}
                      >
                        +
                      </Button>
                      <Text>{product.quantity}</Text>
                      <Button
                        colorScheme="blue"
                        onClick={() => decreaseQuantity(product.productID)}
                      >
                        -
                      </Button>
                    </HStack>
                  </VStack>

                  {/* Remove Button */}
                  <IconButton
                    icon={<IoTrashOutline />}
                    colorScheme="red"
                    onClick={() => removeFromCart(product.productID)}
                    aria-label="Remove from cart"
                    variant="ghost"
                  />
                </HStack>
              </Box>
            ))}
          </>
        )}
      </Box>

      {/* Checkout Section */}
      <Box
        position="relative"
        bottom="0"
        width="100%"
        py={4}
        bg="white"
        boxShadow="lg"
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        {/* Total Price */}
        <Text fontWeight="bold" fontSize="lg" mb={2}>
          Total Price: €{totalPrice.toFixed(2)}
        </Text>

        {/* Checkout Button */}
        <Button
          colorScheme="teal"
          onClick={handleCheckout}
          size="sm" // Smaller button size
          width="auto" // Automatically adjusts width to content
        >
          Proceed to Checkout
        </Button>
      </Box>
    </Box>
  );
};

export default Cart;
