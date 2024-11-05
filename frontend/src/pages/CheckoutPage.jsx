import React from 'react';
import { useCart } from '../contexts/CartContext';
import { Box, Button, Heading, Image, Text, VStack, HStack, useToast } from '@chakra-ui/react';
import axios from 'axios'; // Import axios for making API requests

const CheckoutPage = () => {
    const { cart } = useCart();
    const toast = useToast(); // Initialize toast for notifications

    // Calculate total price
    const totalPrice = cart.reduce((acc, product) => acc + (product.price * product.quantity), 0);

    const handleCheckout = async () => {
        // Prepare the checkout data
        const orderData = {
            items: cart.map(product => ({
                productID: product.productID,
                name: product.name,
                price: product.price,
                quantity: product.quantity,
            })),
            totalPrice,
        };

        try {
            // Make API call to your checkout endpoint
            const response = await axios.post('http://localhost:8000/api/checkout', orderData, {
                withCredentials: true // Include credentials if needed
            });
            if (response.data.success) {
                // Handle successful checkout
                toast({
                    title: "Checkout Successful",
                    description: "Your order has been placed successfully.",
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                });
            }
        } catch (error) {
            // Handle errors
            console.error('Checkout error:', error);
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
        <Box p={5}>
            <Heading as='h2' size='lg' mb={4}>Checkout</Heading>
            <VStack spacing={4}>
                {cart.length === 0 ? (
                    <Text>Your cart is empty.</Text>
                ) : (
                    cart.map((product) => (
                        <Box key={product.productID} borderWidth={1} borderRadius='lg' p={4}>
                            <HStack spacing={4}>
                                <Image 
                                    src={product.image} 
                                    alt={product.name}
                                    boxSize='100px' 
                                    objectFit='cover'
                                    borderRadius='md'
                                />
                                <Box>
                                    <Text fontWeight='bold'>{product.name}</Text>
                                    <Text>Price: ${product.price.toFixed(2)}</Text>
                                    <Text>Quantity: {product.quantity}</Text>
                                </Box>
                            </HStack>
                        </Box>
                    ))
                )}
            </VStack>
            {cart.length > 0 && (
                <>
                    <Text fontWeight='bold' fontSize='lg' mt={4}>Total Price: ${totalPrice.toFixed(2)}</Text>
                    <Button colorScheme='teal' mt={4} onClick={handleCheckout}>
                        Complete Checkout
                    </Button>
                </>
            )}
        </Box>
    );
};

export default CheckoutPage;