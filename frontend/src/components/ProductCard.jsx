import React, { useState, useContext } from "react";
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
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
import { IoBagAddOutline, IoStar } from "react-icons/io5";
import { useCart } from "../contexts/CartContext";
import { useProductStore } from "../store/productStore.js";
import { AuthContext } from "../contexts/authContext";

const ProductCard = ({ product }) => {
  const textColor = useColorModeValue("gray.600", "gray.200");
  const bg = useColorModeValue("white", "gray.800");
  const { addToCart } = useCart();
  const incrementRating = useProductStore((state) => state.incrementRating);
  const toast = useToast();
  const { isLoggedIn } = useContext(AuthContext);
  const [rating, setRating] = useState(product.rating || 0);
  const [hasRated, setHasRated] = useState(() => {
    const ratedProducts =
      JSON.parse(localStorage.getItem("ratedProducts")) || [];
    return ratedProducts.includes(product.productID);
  });

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleToggleRating = async () => {
    if (!isLoggedIn) {
        toast({
          title: "Login Required",
          description: "You must be logged in to rate products.",
          status: "warning",
          duration: 3000,
          isClosable: true,
        });
        return;
      }
    const ratedProducts =
      JSON.parse(localStorage.getItem("ratedProducts")) || [];
    const alreadyRated = ratedProducts.includes(product.productID);

    try {
      const { success, rating: newRating } = await incrementRating(
        product.productID,
        !alreadyRated
      );

      if (success) {
        setRating(newRating);
        setHasRated(!alreadyRated);

        if (!alreadyRated) {
          ratedProducts.push(product.productID);
          localStorage.setItem("ratedProducts", JSON.stringify(ratedProducts));
          toast({
            title: "Rating Updated",
            description: `Rating for ${product.name} has been increased.`,
            status: "success",
            duration: 3000,
            isClosable: true,
          });
        } else {
          const updatedRatedProducts = ratedProducts.filter(
            (id) => id !== product.productID
          );
          localStorage.setItem(
            "ratedProducts",
            JSON.stringify(updatedRatedProducts)
          );
          toast({
            title: "Rating Removed",
            description: `Rating for ${product.name} has been removed.`,
            status: "info",
            duration: 3000,
            isClosable: true,
          });
        }
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
    addToCart(product);
    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart.`,
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <>
      <Box
        shadow="lg"
        rounded="lg"
        overflow="hidden"
        transition="all 0.3s"
        _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
        bg={bg}
        p={4}
        w="auto"
        h="auto"
      >
        <Image
          src={product.image}
          alt={product.name}
          h={48}
          w="full"
          objectFit="cover"
          cursor="pointer"
          onClick={onOpen}
        />

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

          <HStack spacing={2}>
            <IconButton
              colorScheme="teal"
              icon={<IoBagAddOutline />}
              onClick={handleAddToCart}
              aria-label="Add to Cart"
            />
            <Button
              onClick={handleToggleRating}
              colorScheme="yellow"
              leftIcon={<IoStar />}
            >
              {rating}
            </Button>
          </HStack>
        </Box>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose} size="md" isCentered>
        <ModalOverlay />
        <ModalContent maxWidth="40%" width="auto">
          <ModalHeader>
            {product.name}
            <ModalCloseButton position="absolute" right="10px" top="10px" />
          </ModalHeader>

          <ModalBody maxHeight="70vh" overflowY="auto">
            <Image
              src={product.image}
              alt={product.name}
              maxHeight="200px"
              width="100%"
              objectFit="contain"
              mb={4}
            />
            <Text fontWeight="bold" fontSize="xl" color={textColor} mb={4}>
              €{product.price}
            </Text>

            <Text fontSize="sm" color={textColor} mb={4}>
              {product.description}
            </Text>

            <HStack spacing={2}>
              <IconButton
                colorScheme="teal"
                icon={<IoBagAddOutline />}
                onClick={handleAddToCart}
                aria-label="Add to Cart"
              />
              <Button
                onClick={handleToggleRating}
                colorScheme="yellow"
                leftIcon={<IoStar />}
              >
                {rating}
              </Button>
            </HStack>
          </ModalBody>

          <ModalFooter>
            <HStack spacing={3} width="100%" justify="space-between">
              <Button colorScheme="blue" onClick={onClose}>
                Close
              </Button>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProductCard;
