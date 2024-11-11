import React, { useState, useEffect } from "react";
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
  Input,
} from "@chakra-ui/react";
import axios from "axios";
import "../CheckoutPage.css";

const CheckoutPage = () => {
  const { cart, clearCart } = useCart();
  const toast = useToast();

  // State to manage the shipping form visibility
  const [isFormVisible, setIsFormVisible] = useState(true);

  // State for shipping details (e.g., the user can fill this in)
  const [shippingDetails, setShippingDetails] = useState({
    street: "",
    city: "",
    zip: "",
    country: "",
  });

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

  // Handle the checkout process
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
      shippingAddress: shippingDetails, // Adding shipping details to the order data
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
        setIsFormVisible(false); // Hide the form after successful checkout
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

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
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

      {isFormVisible ? (
        <Box
          className="shipping-form"
          bg={useColorModeValue("white", "gray.700")}
          p={4}
          borderRadius="lg"
          boxShadow="sm"
          mb={4}
          w="full"
          maxW="lg"
        >
          <Heading size="md" mb={4}>
            Shipping Address
          </Heading>
          <VStack spacing={4} align="stretch">
            <Input
              name="street"
              value={shippingDetails.street}
              onChange={handleInputChange}
              placeholder="Street"
            />
            <Input
              name="city"
              value={shippingDetails.city}
              onChange={handleInputChange}
              placeholder="City"
            />
            <Input
              name="zip"
              value={shippingDetails.zip}
              onChange={handleInputChange}
              placeholder="Zip"
            />
            <Input
              name="country"
              value={shippingDetails.country}
              onChange={handleInputChange}
              placeholder="Country"
            />
          </VStack>
        </Box>
      ) : (
        <Text color={textColor} mb={4}>Shipping form has been completed.</Text>
      )}

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
