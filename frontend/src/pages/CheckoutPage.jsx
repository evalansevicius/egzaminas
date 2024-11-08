import React, { useEffect } from "react";
import { useCart } from "../contexts/CartContext";
import {
  Box,
  Heading,
  Text,
  VStack,
  HStack,
  Image,
  useToast,
  useColorModeValue,
  Button,
} from "@chakra-ui/react";
import axios from "axios";
import "../CheckoutPage.css";

const CheckoutPage = () => {
  const { cart, clearCart } = useCart();
  const toast = useToast();

  const bgColor = useColorModeValue("gray.50", "gray.800");
  const textColor = useColorModeValue("gray.800", "gray.100");
  const totalPriceTextColor = useColorModeValue("black", "white");

  useEffect(() => {
    const storedUserID = localStorage.getItem("userID");
    console.log("UserID from local storage on component mount:", storedUserID);
  }, []);

  const totalPrice = cart.reduce(
    (acc, product) => acc + product.price * product.quantity,
    0
  );

  const handleCheckout = async () => {
    const orderData = {
      userID: localStorage.getItem("userID"),
      items: cart.map((product) => ({
        productID: product.productID,
        name: product.name,
        price: product.price,
        quantity: product.quantity,
      })),
      totalPrice,
    };

    try {
      const response = await axios.post(
        "http://localhost:8000/api/checkout",
        orderData,
        {
          withCredentials: true,
        }
      );
      if (response.data.success) {
        clearCart();
        toast({
          title: "Checkout Successful",
          description: "Your order has been placed successfully.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("Checkout error:", error);
      toast({
        title: "Checkout Failed",
        description: "There was an error processing your order.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box
      className="checkout-page"
      p={4}
      bg={bgColor}
      minHeight="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Heading as="h2" size="lg" mb={4} color={textColor}>
        Checkout
      </Heading>

      <VStack
        className="checkout-items"
        spacing={4}
        align="stretch"
        maxW="lg"
        w="100%"
      >
        {cart.length === 0 ? (
          <Text color={textColor}>Your cart is empty.</Text>
        ) : (
          cart.map((product) => (
            <Box
              key={product.productID}
              className="page-item"
              p={4}
              borderRadius="lg"
              bg={useColorModeValue("white", "gray.700")}
              boxShadow="sm"
              mb={4}
            >
              <HStack spacing={4}>
                <Image
                  src={product.image}
                  alt={product.name}
                  boxSize="100px"
                  objectFit="cover"
                  borderRadius="md"
                />
                <Box className="product-details">
                  <Text fontWeight="bold" color={textColor}>
                    {product.name}
                  </Text>
                  <Text color={textColor}>Price: €{product.price.toFixed(2)}</Text>
                  <Text color={textColor}>Quantity: {product.quantity}</Text>
                </Box>
              </HStack>
            </Box>
          ))
        )}
      </VStack>

      {cart.length > 0 && (
        <Box
          className="checkout-summary"
          mt={6}
          p={4}
          bg={useColorModeValue("white", "gray.700")}
          borderRadius="md"
          boxShadow="sm"
          width="100%"
          maxW="lg"
        >
          <Text
            className="page-total"
            fontSize="lg"
            fontWeight="bold"
            color={totalPriceTextColor}
            mb={4}
          >
            Total Price: €{totalPrice.toFixed(2)}
          </Text>
          <Button
            colorScheme="teal"
            onClick={handleCheckout}
            size="sm"
            width="100%"
            borderRadius="md"
            boxShadow="sm"
          >
            Complete Checkout
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default CheckoutPage;
