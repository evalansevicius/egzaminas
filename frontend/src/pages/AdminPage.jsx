// src/pages/AdminPage.js

import React, { useState, useRef, useEffect } from "react";
import {
  Container,
  SimpleGrid,
  Text,
  VStack,
  Button,
  HStack,
  useToast,
  Box,
  Heading,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useProductStore } from "../store/productStore";
import AdminCard from "../components/AdminCard";
import OrdersDialog from "../components/OrdersDialog";
import RoleDialog from "../components/RoleDialog";
import { fetchOrders, changeUserRole } from "../services/adminService";

const AdminPage = () => {
  const { getProducts, products } = useProductStore();
  const [userID, setUserID] = useState("");
  const [orders, setOrders] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isRoleDialogOpen, setIsRoleDialogOpen] = useState(false);
  const toast = useToast();

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  const openOrdersDialog = async () => {
    try {
      const fetchedOrders = await fetchOrders();
      setOrders(fetchedOrders);
      setIsDialogOpen(true);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch orders.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleRoleChange = async (action) => {
    if (!userID) {
      toast({
        title: "User ID required",
        description: "Please enter a valid user ID.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    try {
      await changeUserRole(userID, action);
      toast({
        title: "Success!",
        description: `User with ID: ${userID} successfully ${action === "promote" ? "promoted to" : "demoted from"} admin.`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      setUserID("");
      setIsRoleDialogOpen(false);
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to ${action === "promote" ? "promote" : "demote"} user.`,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Container maxW="container.xl" py={12}>
      <VStack spacing={8}>
        <HStack spacing={4}>
          <Button colorScheme="blue" onClick={openOrdersDialog}>Orders</Button>
          <Button colorScheme="purple" onClick={() => setIsRoleDialogOpen(true)}>Roles</Button>
        </HStack>
        
        <Text fontSize="30" fontWeight="bold" bgGradient="linear(to-r, cyan.400, blue.500)" bgClip="text" textAlign="center">
          Current Products 🚀
        </Text>

        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10} w="full">
          {products.map((product) => (
            <AdminCard key={product.productID} product={product} />
          ))}
        </SimpleGrid>

        {products.length === 0 && (
          <Text fontSize="xl" textAlign="center" fontWeight="bold" color="gray.500">
            No products found 😢 <Link to="/create"><Text as="span" color="blue.500" _hover={{ textDecoration: "underline" }}>Create a product</Text></Link>
          </Text>
        )}

        <OrdersDialog isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)} orders={orders} />
        <RoleDialog
          isOpen={isRoleDialogOpen}
          onClose={() => setIsRoleDialogOpen(false)}
          userID={userID}
          setUserID={setUserID}
          onPromote={() => handleRoleChange("promote")}
          onDemote={() => handleRoleChange("demote")}
        />
      </VStack>
    </Container>
  );
};

export default AdminPage;
