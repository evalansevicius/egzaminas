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
import { checkoutAPI } from "../services/checkoutService.js"; // Import the API function

const CheckoutPage = () => {
  const { cart, clearCart } = useCart();
  const toast = useToast();

  const [isFormVisible, setIsFormVisible] = useState(true);
  const [shippingAddress, setShippingAddress] = useState({
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

  const handleCheckout = async () => {
    const orderData = {
      userID: localStorage.getItem("userID"),
      name: localStorage.getItem("name"),
      items: cart.map((product) => ({
        productID: product.productID,
        name: product.name,
        price: product.price,
        quantity: product.quantity,
      })),
      totalPrice,
      shippingAddress,
    };

    console.log("Order Data:", orderData);

    if (!shippingAddress.street || !shippingAddress.city || !shippingAddress.zip || !shippingAddress.country) {
      toast({
        title: "Incomplete Shipping Address",
        description: "Please fill in all the shipping details.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    } 

    try {
      const response = await checkoutAPI(orderData); // Use checkoutAPI here
      if (response.success) {
        clearCart();
        setIsFormVisible(false);
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingAddress((prevState) => ({
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
              value={shippingAddress.street}
              onChange={handleInputChange}
              placeholder="Street"
            />
            <Input
              name="city"
              value={shippingAddress.city}
              onChange={handleInputChange}
              placeholder="City"
            />
            <Input
              name="zip"
              value={shippingAddress.zip}
              onChange={handleInputChange}
              placeholder="Zip"
            />
            <Input
              name="country"
              value={shippingAddress.country}
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
