import React from 'react';
import { Box, Text, Stack, IconButton, Heading, VStack, HStack, Button, Image, useToast, useColorModeValue } from '@chakra-ui/react';
import { IoTrashOutline } from 'react-icons/io5';
import { useCart } from '../contexts/CartContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cart, removeFromCart, increaseQuantity, decreaseQuantity } = useCart();
  const navigate = useNavigate();
  const toast = useToast();

  const totalPrice = cart.reduce(
    (acc, product) => acc + product.price * product.quantity,
    0
  );

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
      navigate('/checkout');
    }
  };

  const footerBgColor = useColorModeValue('white', 'gray.800');
  const footerTextColor = useColorModeValue('gray.800', 'white');

  return (
    <Box
      p={4}
      display="flex"
      flexDirection="column"
      minHeight="100vh"
    >
      <Heading as="h2" size="lg" mb={4}>
        Your Cart
      </Heading>

      <Box
        flex="1"
        overflowY="auto"
        mb={6}
      >
        {cart.length === 0 ? (
          <Text textAlign="center" fontSize="lg" color="gray.600">
            Your cart is empty.
          </Text>
        ) : (
          <>
            {cart.map((product) => (
              <Box
                key={product.productID}
                borderWidth={1}
                borderRadius="lg"
                p={4}
                mb={4}
                bg="gray.50"
                boxShadow="sm"
              >
                <HStack align="start" spacing={6} justify="space-between">
                  <Image
                    src={product.image}
                    alt={product.name}
                    boxSize="120px"
                    objectFit="cover"
                  />

                  <VStack align="start" spacing={2} flex="1">
                    <Text fontWeight="bold" fontSize="md">{product.name}</Text>
                    <Text fontSize="sm" color="gray.600">
                      Price: €{product.price.toFixed(2)}
                    </Text>
                    <Text fontSize="sm" color="gray.600" noOfLines={2}>
                      Description: {product.description}
                    </Text>

                    <HStack spacing={4}>
                      <Button
                        colorScheme="blue"
                        onClick={() => increaseQuantity(product.productID)}
                        size="sm"
                      >
                        +
                      </Button>
                      <Text>{product.quantity}</Text>
                      <Button
                        colorScheme="blue"
                        onClick={() => decreaseQuantity(product.productID)}
                        size="sm"
                      >
                        -
                      </Button>
                    </HStack>
                  </VStack>

                  <IconButton
                    icon={<IoTrashOutline />}
                    colorScheme="red"
                    onClick={() => removeFromCart(product.productID)}
                    aria-label={`Remove ${product.name} from cart`}
                    variant="ghost"
                    size="lg"
                  />
                </HStack>
              </Box>
            ))}
          </>
        )}
      </Box>

      <Box
        position="relative"
        bottom="0"
        width="100%"
        py={4}
        bg={footerBgColor}
        color={footerTextColor}
        boxShadow="lg"
        display="flex"
        flexDirection="column"
        alignItems="center"
        borderTopWidth={1}
      >
        <Text fontWeight="bold" fontSize="lg" mb={2}>
          Total Price: €{totalPrice.toFixed(2)}
        </Text>

        <Button
          colorScheme="teal"
          onClick={handleCheckout}
          size="lg"
          width="auto"
          maxWidth="300px"
        >
          Proceed to Checkout
        </Button>
      </Box>
    </Box>
  );
};

export default Cart;
