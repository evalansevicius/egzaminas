import React, { useRef } from "react";
import {
  Box,
  Text,
  VStack,
  Heading,
  Divider,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogBody,
  IconButton,
  useColorMode,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";

const OrdersDialog = ({ isOpen, onClose, orders }) => {
  const { colorMode } = useColorMode();
  const cancelRef = useRef();

  const formatPrice = (price) => {
    if (price && !isNaN(price)) {
      return `€${price.toFixed(2)}`;
    }
    return "€0.00";
  };

  return (
    <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
      <AlertDialogOverlay>
        <AlertDialogContent maxH="800px" maxW="800px" overflowY="auto">
          <Box
            position="sticky"
            top="0"
            display="flex"
            justifyContent="flex-end"
            p={2}
            bg={colorMode === "light" ? "gray.100" : "gray.800"}
          >
            <IconButton icon={<CloseIcon />} colorScheme="blue" onClick={onClose} aria-label="Close dialog" />
          </Box>

          <AlertDialogBody pt={4}>
            {orders.length === 0 ? (
              <Text>No completed orders found.</Text>
            ) : (
              <VStack spacing={4}>
                {orders.map((order) => (
                  <Box key={order._id} p={5} shadow="md" borderWidth="1px" w="full">
                    <Heading fontSize="xl">Order ID: {order._id}</Heading>
                    <Text>UserID: {order.userID}</Text>
                    <Text>UserName: {order.name}</Text>
                    <Text>Total Price: {formatPrice(order.totalPrice)}</Text>
                    <Divider my={2} />
                    <Text fontWeight="bold">Items:</Text>
                    {order.items.map((item) => (
                      <Box key={item.productID} pl={4} mt={2}>
                        <Text>Product ID: {item.productID}</Text>
                        <Text>Name: {item.name}</Text>
                        <Text>Price: {formatPrice(item.price)}</Text>
                        <Text>Quantity: {item.quantity}</Text>
                      </Box>
                    ))}
                    <Divider my={2} />
                    <Box mt={4}>
                      <Text fontWeight="bold">Shipping Address:</Text>
                      <Text>Street: {order.shippingAddress?.street}</Text>
                      <Text>City: {order.shippingAddress?.city}</Text>
                      <Text>Zip: {order.shippingAddress?.zip}</Text>
                      <Text>Country: {order.shippingAddress?.country}</Text>
                    </Box>
                  </Box>
                ))}
              </VStack>
            )}
          </AlertDialogBody>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default OrdersDialog;
