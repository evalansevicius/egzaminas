import React, { useState } from 'react';
import {
  Box,
  Text,
  Input,
  Button,
  VStack,
  useToast,
} from '@chakra-ui/react';

const ShippingForm = ({ onShippingSubmit }) => {
  const [shippingAddress, setShippingAddress] = useState({
    street: '',
    city: '',
    zip: '',
    country: '',
  });

  const toast = useToast();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingAddress({
      ...shippingAddress,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    if (!shippingAddress.street || !shippingAddress.city || !shippingAddress.zip || !shippingAddress.country) {
      toast({
        title: "Incomplete Shipping Address",
        description: "Please fill out all fields before submitting.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    onShippingSubmit(shippingAddress);
  };

  return (
    <Box>
      <Text fontSize="lg" mb={4}>Enter your Shipping Address:</Text>
      <VStack spacing={4} align="stretch">
        <Input
          name="street"
          placeholder="Street Address"
          value={shippingAddress.street}
          onChange={handleInputChange}
        />
        <Input
          name="city"
          placeholder="City"
          value={shippingAddress.city}
          onChange={handleInputChange}
        />
        <Input
          name="zip"
          placeholder="ZIP Code"
          value={shippingAddress.zip}
          onChange={handleInputChange}
        />
        <Input
          name="country"
          placeholder="Country"
          value={shippingAddress.country}
          onChange={handleInputChange}
        />
        <Button onClick={handleSubmit} colorScheme="teal" width="100%">
          Save Shipping Address
        </Button>
      </VStack>
    </Box>
  );
};

export default ShippingForm;
