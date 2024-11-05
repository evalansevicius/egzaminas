import React from "react";
import { useCart } from "../contexts/CartContext";
import { Box, Heading, Text, VStack, HStack, Image, useToast } from "@chakra-ui/react";
import axios from "axios";
import "../CheckoutPage.css";

const CheckoutPage = () => {
  const { cart, clearCart } = useCart();
  const toast = useToast();

  const totalPrice = cart.reduce(
    (acc, product) => acc + product.price * product.quantity,
    0
  );

  const handleCheckout = async () => {
    const orderData = {
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
    <Box className="checkout-page">
      <Heading as="h2" size="lg" mb={4}>
        Checkout
      </Heading>
      <VStack className="checkout-items" spacing={4}>
        {cart.length === 0 ? (
          <Text>Your cart is empty.</Text>
        ) : (
          cart.map((product) => (
            <Box key={product.productID} className="page-item">
              <HStack spacing={4}>
                <Image
                  src={product.image}
                  alt={product.name}
                  boxSize="100px"
                  objectFit="cover"
                  borderRadius="md"
                />
                <Box className="product-details">
                  <Text fontWeight="bold">{product.name}</Text>
                  <Text>Price: €{product.price.toFixed(2)}</Text>
                  <Text>Quantity: {product.quantity}</Text>
                </Box>
              </HStack>
            </Box>
          ))
        )}
      </VStack>
      {cart.length > 0 && (
        <div className="checkout-summary">
          <Text className="page-total">Total Price: €{totalPrice.toFixed(2)}</Text>
          <button
            className="checkout-button"
            onClick={handleCheckout}
          >
            Complete Checkout
          </button>
        </div>
      )}
    </Box>
  );
};

export default CheckoutPage;
