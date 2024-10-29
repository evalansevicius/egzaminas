import React from 'react';
import { Box, Button, Heading, Text, Image, VStack } from '@chakra-ui/react';
import { useCart } from '../contexts/CartContext';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Cart = () => {
    const { cart, removeFromCart, increaseQuantity, decreaseQuantity } = useCart();
    const navigate = useNavigate(); // Initialize the navigate function

    // Calculate total price
    const totalPrice = cart.reduce((acc, product) => acc + (product.price * product.quantity), 0);

    const handleCheckout = () => {
        navigate('/checkout'); // Redirect to the Checkout page
    };

    return (
        <Box p={4}>
            <Heading as="h2" size="lg" mb={4}>Your Cart</Heading>
            {cart.length === 0 ? (
                <Text>Your cart is empty.</Text>
            ) : (
                <>
                    {cart.map((product) => (
                        <Box key={product.id} borderWidth={1} borderRadius="lg" p={4} mb={4}>
                            <VStack align="start">
                                <Image src={product.image} alt={product.name} boxSize="150px" objectFit="cover" />
                                <Text fontWeight="bold">{product.name}</Text>
                                <Text>Price: ${product.price.toFixed(2)}</Text>
                                <Text>Description: {product.description}</Text>
                                <Text>Quantity: {product.quantity}</Text>
                                <Button colorScheme="blue" onClick={() => increaseQuantity(product.id)}>+</Button>
                                <Button colorScheme="blue" onClick={() => decreaseQuantity(product.id)}>-</Button>
                                <Button colorScheme="red" onClick={() => removeFromCart(product.id)}>Remove</Button>
                            </VStack>
                        </Box>
                    ))}
                    <Text fontWeight="bold" fontSize="lg" mt={4}>Total Price: ${totalPrice.toFixed(2)}</Text>
                    <Button colorScheme='teal' mt={4} onClick={handleCheckout}>
                        Proceed to Checkout
                    </Button>
                </>
            )}
        </Box>
    );
};

export default Cart;
