import React from 'react';
import { useCart } from '../context/CartContext';
import { Box, Button, Heading, Text, VStack } from '@chakra-ui/react';

const CheckoutPage = () => {
    const { cart } = useCart();

    // Calculate total price
    const totalPrice = cart.reduce((acc, product) => acc + (product.price * product.quantity), 0);

    const handleCheckout = () => {
        // Here you can implement checkout logic (e.g., API call)
        alert('Checkout complete!');
    };

    return (
        <Box p={5}>
            <Heading as='h2' size='lg' mb={4}>Checkout</Heading>
            <VStack spacing={4}>
                {cart.length === 0 ? (
                    <Text>Your cart is empty.</Text>
                ) : (
                    cart.map((product) => (
                        <Box key={product.id} borderWidth={1} borderRadius='lg' p={4}>
                            <Text fontWeight='bold'>{product.name}</Text>
                            <Text>Price: ${product.price.toFixed(2)}</Text>
                            <Text>Quantity: {product.quantity}</Text>
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
