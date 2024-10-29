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
import { useProductStore } from "../store/product"; // Assuming this is still in use
import { useState } from "react";
import { useCart } from "../context/CartContext";

} from "@chakra-ui/react";
import { IoBagAddOutline } from "react-icons/io5";
const ProductCard = ({ product }) => {

    const [updatedProduct, setUpdatedProduct] = useState(product);
    const textColor = useColorModeValue("gray.600", "gray.200");
    const bg = useColorModeValue("white", "gray.800");
    const { deleteProduct, updateProduct } = useProductStore();
    const { addToCart } = useCart(); // Use the Cart context
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();

    const handleDeleteProduct = async (productID) => {
        const { success, message } = await deleteProduct(productID);
        toast({
            title: success ? "Success" : "Error",
            description: message,
            status: success ? "success" : "error",
            duration: 3000,
            isClosable: true,
        });
    };

    const handleUpdateProduct = async (productID, updatedProduct) => {
        const { success, message } = await updateProduct(productID, updatedProduct);
        onClose();
        toast({
            title: success ? "Success" : "Error",
            description: success ? "Product updated successfully" : message,
            status: success ? "success" : "error",
            duration: 3000,
            isClosable: true,
        });
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
        >
            <Image src={product.image} alt={product.name} h={48} w='full' objectFit='cover' />
            <Box p={4}>
                <Heading as='h3' size='md' mb={2}>{product.name}</Heading>
                <Text fontWeight='bold' fontSize='xl' color={textColor} mb={4}>${product.price}</Text>
                <Text fontWeight='bold' fontSize='xl' color={textColor} mb={4}>{product.description}</Text>
                <HStack spacing={2}>
                    <Button colorScheme='teal' onClick={handleAddToCart}>Add to Cart</Button>
                    <IconButton icon={<EditIcon />} onClick={onOpen} colorScheme='blue' />
                    <IconButton
                        icon={<DeleteIcon />}
                        onClick={() => handleDeleteProduct(product.productID)}
                        colorScheme='red'
                    />
                </HStack>
            </Box>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Update Product</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <VStack spacing={4}>
                            <Input
                                placeholder='Product Name'
                                value={updatedProduct.name}
                                onChange={(e) => setUpdatedProduct({ ...updatedProduct, name: e.target.value })}
                            />
                            <Input
                                placeholder='Price'
                                type='number'
                                value={updatedProduct.price}
                                onChange={(e) => setUpdatedProduct({ ...updatedProduct, price: e.target.value })}
                            />
                            <Input
                                placeholder='Image URL'
                                value={updatedProduct.image}
                                onChange={(e) => setUpdatedProduct({ ...updatedProduct, image: e.target.value })}
                            />
                            <Input
                                placeholder='Description'
                                value={updatedProduct.description}
                                onChange={(e) => setUpdatedProduct({ ...updatedProduct, description: e.target.value })}
                            />
                        </VStack>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={() => handleUpdateProduct(product.productID, updatedProduct)}>
                            Update
                        </Button>
                        <Button variant='ghost' onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    );
};

export default ProductCard;
