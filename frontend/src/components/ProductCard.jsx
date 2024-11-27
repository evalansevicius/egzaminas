import React, { useState, useContext, useCallback } from "react";
import { Box, Button, Heading, HStack, IconButton, Image, Text, useColorModeValue, useToast, useDisclosure, VStack, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter } from "@chakra-ui/react";
import { IoBagAddOutline, IoStar } from "react-icons/io5";
import { useCart } from "../contexts/CartContext"; // Assuming this context is defined elsewhere
import { useProductStore } from "../store/productStore"; // Assuming this store exists
import { AuthContext } from "../contexts/authContext"; // Assuming AuthContext is defined

const ProductCard = ({ product }) => {
  const { name, price, image, description, productID } = product;

  // Theme-based color values using Chakra's hook
  const textColor = useColorModeValue("gray.600", "gray.200");
  const bg = useColorModeValue("white", "gray.800");

  // Contexts and hooks
  const { addToCart } = useCart();
  const incrementRating = useProductStore((state) => state.incrementRating);
  const toast = useToast();
  const { isLoggedIn } = useContext(AuthContext);

  // Local state for rating and checked status
  const [rating, setRating] = useState(product.rating || 0);
  const [hasRated, setHasRated] = useState(() => {
    const ratedProducts = JSON.parse(localStorage.getItem("ratedProducts")) || [];
    return ratedProducts.includes(productID);
  });

  const { isOpen, onOpen, onClose } = useDisclosure();

  // Handle toggling rating
  const handleToggleRating = useCallback(async () => {
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

    const ratedProducts = JSON.parse(localStorage.getItem("ratedProducts")) || [];
    const alreadyRated = ratedProducts.includes(productID);

    try {
      const { success, rating: newRating } = await incrementRating(productID, !alreadyRated);

      if (success) {
        setRating(newRating);
        setHasRated(!alreadyRated);

        // Update localStorage for rated products
        if (!alreadyRated) {
          ratedProducts.push(productID);
          localStorage.setItem("ratedProducts", JSON.stringify(ratedProducts));
          toast({
            title: "Rating Updated",
            description: `Rating for ${name} has been increased.`,
            status: "success",
            duration: 3000,
            isClosable: true,
          });
        } else {
          const updatedRatedProducts = ratedProducts.filter((id) => id !== productID);
          localStorage.setItem("ratedProducts", JSON.stringify(updatedRatedProducts));
          toast({
            title: "Rating Removed",
            description: `Rating for ${name} has been removed.`,
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
  }, [productID, isLoggedIn, incrementRating, toast, name]);

  // Add product to cart
  const handleAddToCart = useCallback(() => {
    addToCart(product);
    toast({
      title: "Added to Cart",
      description: `${name} has been added to your cart.`,
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  }, [addToCart, product, toast, name]);

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
        w="full"
        h="auto"
      >
        <Image
          src={image}
          alt={name}
          h={48}
          w="full"
          objectFit="cover"
          cursor="pointer"
          onClick={onOpen}
        />

        <VStack p={4} align="start" spacing={4}>
          <Heading as="h3" size="md" mb={2} noOfLines={1}>
            {name}
          </Heading>
          <Text fontWeight="bold" fontSize="xl" color={textColor} mb={4}>
            €{price}
          </Text>

          <HStack spacing={4} width="100%" justify="space-between">
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
              aria-label="Rate Product"
            >
              {rating}
            </Button>
          </HStack>
        </VStack>
      </Box>

      {/* Modal for full product details */}
      <Modal isOpen={isOpen} onClose={onClose} size="md" isCentered>
        <ModalOverlay />
        <ModalContent maxWidth="40%" width="auto">
          <ModalHeader>
            {name}
            <ModalCloseButton position="absolute" right="10px" top="10px" />
          </ModalHeader>

          <ModalBody maxHeight="70vh" overflowY="auto">
            <Image
              src={image}
              alt={name}
              maxHeight="200px"
              width="100%"
              objectFit="contain"
              mb={4}
            />
            <Text fontWeight="bold" fontSize="xl" color={textColor} mb={4}>
              €{price}
            </Text>

            <Text fontSize="sm" color={textColor} mb={4}>
              {description}
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
                aria-label="Rate Product"
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
