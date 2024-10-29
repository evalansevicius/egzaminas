import {
    Box,
    Button,
    Heading,
    HStack,
    IconButton,
    Image,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text,
    useColorModeValue,
    useDisclosure,
    useToast,
    VStack,
} from "@chakra-ui/react";
import { useCart } from "../context/CartContext";
import { IoBagAddOutline } from "react-icons/io5";
const ProductCard = ({ product }) => {


    const textColor = useColorModeValue("gray.600", "gray.200");
    const bg = useColorModeValue("white", "gray.800");
    const { addToCart } = useCart(); // Use the Cart context
    const toast = useToast();


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
        >
            <Image src={product.image} alt={product.name} h={48} w='full' objectFit='cover' />
            <Box p={4}>
                <Heading as='h3' size='md' mb={2}>{product.name}</Heading>
                <Text fontWeight='bold' fontSize='xl' color={textColor} mb={4}>€{product.price}</Text>
                <Text fontWeight='bold' fontSize='xl' color={textColor} mb={4}>{product.description}</Text>
                <HStack spacing={2}>
                    <IconButton colorScheme='teal' icon={<IoBagAddOutline/>} onClick={handleAddToCart}>Add to Cart</IconButton>
                </HStack>
            </Box>
        </Box>
    );
};

export default ProductCard;
