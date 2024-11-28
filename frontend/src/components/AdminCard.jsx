import React, { useContext, useState } from "react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
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
import { useProductStore } from "../store/productStore";
import { AuthContext } from "../contexts/authContext";

const AdminCard = ({ product }) => {
  const { role } = useContext(AuthContext);  
  const [updatedProduct, setUpdatedProduct] = useState(product);

  const textColor = useColorModeValue("gray.600", "gray.200");
  const bg = useColorModeValue("white", "gray.800");

  const { deleteProduct, updateProduct } = useProductStore();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleDeleteProduct = async (productID) => {
    const { success, message } = await deleteProduct(productID);
    if (!success) {
      toast({
        title: "Error",
        description: message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Success",
        description: message,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleUpdateProduct = async (productID, updatedProduct) => {
    // Basic validation before update
    if (!updatedProduct.name || !updatedProduct.price || isNaN(updatedProduct.price)) {
      toast({
        title: "Invalid Input",
        description: "Please make sure all fields are correctly filled.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const { success, message } = await updateProduct(productID, updatedProduct);
    onClose();
    if (!success) {
      toast({
        title: "Error",
        description: message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Success",
        description: "Product updated successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box
      shadow="lg"
      rounded="lg"
      overflow="hidden"
      transition="all 0.3s"
      _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
      bg={bg}
    >
      <Image src={product.image} alt={product.name} h={48} w="full" objectFit="cover" />

      <Box p={4}>
        <Heading as="h3" size="md" mb={2}>
          {product.name}
        </Heading>

        <Text fontWeight="bold" fontSize="xl" color={textColor} mb={4}>
          €{product.price}
        </Text>
        <Text fontSize="sm" color={textColor} mb={4}>
          {product.description}
        </Text>

        {/* Role-based access */}
        {(role === "admin" || role === "superadmin") && (
          <HStack spacing={2}>
            <IconButton
              icon={<EditIcon />}
              onClick={onOpen}
              colorScheme="blue"
              aria-label="Edit Product"
            />
            <IconButton
              icon={<DeleteIcon />}
              onClick={() => handleDeleteProduct(product.productID)}
              colorScheme="red"
              aria-label="Delete Product"
            />
          </HStack>
        )}
      </Box>

      {/* Modal for Editing */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <Input
                placeholder="Product Name"
                name="name"
                value={updatedProduct.name}
                onChange={(e) => setUpdatedProduct({ ...updatedProduct, name: e.target.value })}
              />
              <Input
                placeholder="Price"
                name="price"
                type="number"
                value={updatedProduct.price}
                onChange={(e) => setUpdatedProduct({ ...updatedProduct, price: e.target.value })}
              />
              <Input
                placeholder="Image URL"
                name="image"
                value={updatedProduct.image}
                onChange={(e) => setUpdatedProduct({ ...updatedProduct, image: e.target.value })}
              />
              <Input
                placeholder="Description"
                name="description"
                value={updatedProduct.description}
                onChange={(e) => setUpdatedProduct({ ...updatedProduct, description: e.target.value })}
              />
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => handleUpdateProduct(product.productID, updatedProduct)}
              isDisabled={updatedProduct.name === product.name && updatedProduct.price === product.price && updatedProduct.description === product.description}
            >
              Update
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default AdminCard;