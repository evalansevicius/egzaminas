import {
    Box,
    Button,
    Heading,
    HStack,
    IconButton,
    Image,
    Text,
    useColorModeValue,
    useToast,
} from "@chakra-ui/react";
import { useCart } from "../contexts/CartContext";
import { IoBagAddOutline, IoStar } from "react-icons/io5";
import { useState } from "react";
import { useProductStore } from "../store/product.js";
const ProductCard = ({ product }) => {

    const textColor = useColorModeValue("gray.600", "gray.200");
    const bg = useColorModeValue("white", "gray.800");
    const { addToCart } = useCart(); // Use the Cart context
	const incrementRating = useProductStore((state) => state.incrementRating);
    const toast = useToast();
	const [rating, setRating] = useState(product.rating || 0);
	const handleIncrementRating = async () => {
		const ratedProducts = JSON.parse(localStorage.getItem('ratedProducts')) || [];
	
	
		if (ratedProducts.includes(product.productID)) {
			toast({
				title: "Already Rated",
				description: "You can only rate this product once.",
				status: "info",
				duration: 3000,
				isClosable: true,
			});
			return;
		}
	
		try {
			const { success, rating: newRating } = await incrementRating(product.productID);
			if (success) {
				setRating(newRating);
	
				// Store the rated product ID in local storage
				ratedProducts.push(product.productID);
				localStorage.setItem('ratedProducts', JSON.stringify(ratedProducts));
	
				toast({
					title: "Rating Updated",
					description: `Rating for ${product.name} has been increased.`,
					status: "success",
					duration: 3000,
					isClosable: true,
				});
			}
		} catch (error) {
			toast({
				title: "Error",
				description: "Could not update the rating.",
				status: "error",
				duration: 3000,
				isClosable: true,
			});
		}
	};
	
    const handleAddToCart = () => {
        addToCart(product); // Call the context function to add the product to the cart
        toast({
            title: "Added to Cart",
            description: `${product.name} has been added to your cart.`,
            status: "success",
            duration: 3000,
            isClosable: true,
        });
    };

    return (
        <Box
            shadow='lg'
            rounded='lg'
            overflow='hidden'
            transition='all 0.3s'
            _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
            bg={bg}
			p={4}
        >
            <Image src={product.image} alt={product.name} h={48} w='full' objectFit='cover' />
            <Box p={4}>
                <Heading as='h3' size='md' mb={2}>{product.name}</Heading>
                <Text fontWeight='bold' fontSize='xl' color={textColor} mb={4}>€{product.price}</Text>
                <Text fontSize='sm' color={textColor} mb={4}>{product.description}</Text>
                <HStack spacing={2}>
                    <IconButton colorScheme='teal' icon={<IoBagAddOutline />} onClick={handleAddToCart}></IconButton>
					<Button
                        onClick={handleIncrementRating}
                        colorScheme="yellow"
                        leftIcon={<IoStar />}
                    >
                        {rating}
                    </Button>
                </HStack>
            </Box>

        </Box>
    );
};

export default ProductCard;
