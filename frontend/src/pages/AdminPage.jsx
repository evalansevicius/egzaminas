import React, { useState, useEffect } from "react";
import {
  Container,
  SimpleGrid,
  Text,
  VStack,
  Button,
  HStack,
  Box,
  Input,
  FormLabel,
  useToast,
  Divider,
  Icon,
  Spinner,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useProductStore } from "../store/productStore";
import AdminCard from "../components/AdminCard";
import OrdersDialog from "../components/OrdersDialog";
import RoleDialog from "../components/RoleDialog";
import UsersDialog from "../components/UsersDialog";
import { fetchOrders, changeUserRole, getUsers } from "../services/adminService";
import { updateProductAPI } from "../services/productService";
import { FaShoppingCart, FaUserShield, FaUsers } from "react-icons/fa";

const AdminPage = () => {
  const { getProducts, products, isLoading, isError } = useProductStore();
  const [editableProduct, setEditableProduct] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [userID, setUserID] = useState("");
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [isOrdersDialogOpen, setIsOrdersDialogOpen] = useState(false);
  const [isUsersDialogOpen, setIsUsersDialogOpen] = useState(false);
  const [isRoleDialogOpen, setIsRoleDialogOpen] = useState(false);
  const toast = useToast();

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  const handleEditClick = (product) => {
    setEditableProduct(product);
    setName(product.name);
    setDescription(product.description);
    setPrice(product.price);
  };

  const handleSaveClick = async () => {
    const updatedProduct = { name, description, price };

    try {
      await updateProductAPI(editableProduct.productID, updatedProduct);
      toast({
        title: "Product updated successfully!",
        description: "The product details have been updated.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      setEditableProduct(null);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update product.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleCancelEdit = () => {
    setEditableProduct(null);
  };

  const openUsersDialog = async () => {
    try {
      const fetchedUsers = await getUsers();
      setUsers(fetchedUsers);
      setIsUsersDialogOpen(true);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch Users.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const openOrdersDialog = async () => {
    try {
      const fetchedOrders = await fetchOrders();
      setOrders(fetchedOrders);
      setIsOrdersDialogOpen(true);
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
        <HStack spacing={6} w="full" justify="center" wrap="wrap">
          <Button
            colorScheme="teal"
            onClick={openOrdersDialog}
            size="lg"
            variant="solid"
            borderRadius="full"
            leftIcon={<Icon as={FaShoppingCart} />}
            _hover={{
              bg: "teal.500",
              transform: "scale(1.05)",
              boxShadow: "lg",
            }}
            transition="all 0.2s ease"
          >
            Orders
          </Button>
          <Button
            colorScheme="orange"
            onClick={() => setIsRoleDialogOpen(true)}
            size="lg"
            variant="solid"
            borderRadius="full"
            leftIcon={<Icon as={FaUserShield} />}
            _hover={{
              bg: "orange.400",
              transform: "scale(1.05)",
              boxShadow: "lg",
            }}
            transition="all 0.2s ease"
          >
            Roles
          </Button>
          <Button
            colorScheme="blue"
            onClick={openUsersDialog}
            size="lg"
            variant="solid"
            borderRadius="full"
            leftIcon={<Icon as={FaUsers} />}
            _hover={{
              bg: "blue.400",
              transform: "scale(1.05)",
              boxShadow: "lg",
            }}
            transition="all 0.2s ease"
          >
            Users
          </Button>
        </HStack>

        <Divider my={6} borderColor="gray.300" />

        <Text fontSize="3xl" fontWeight="bold" bgGradient="linear(to-r, cyan.400, blue.500)" bgClip="text" textAlign="center">
          Current Products 🚀
        </Text>

        {isLoading ? (
          <Spinner size="xl" />
        ) : (
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10} w="full">
            {products.map((product) => (
              <Box
                key={product.productID}
                border="1px"
                borderRadius="md"
                boxShadow="sm"
                p={6}
                bg="white"
                transition="all 0.2s"
                _hover={{ transform: "scale(1.05)", boxShadow: "lg" }}
              >
                {editableProduct?.productID === product.productID ? (
                  <Box>
                    <FormLabel htmlFor="name">Name</FormLabel>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      mb={4}
                    />
                    <FormLabel htmlFor="description">Description</FormLabel>
                    <Input
                      id="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      mb={4}
                    />
                    <FormLabel htmlFor="price">Price</FormLabel>
                    <Input
                      id="price"
                      type="number"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      mb={4}
                    />
                    <HStack spacing={4} mt={4}>
                      <Button colorScheme="green" onClick={handleSaveClick} size="md">
                        Save
                      </Button>
                      <Button colorScheme="red" onClick={handleCancelEdit} size="md">
                        Cancel
                      </Button>
                    </HStack>
                  </Box>
                ) : (
                  <AdminCard
                    product={product}
                    onEdit={() => handleEditClick(product)}
                  />
                )}
              </Box>
            ))}
          </SimpleGrid>
        )}

        {products.length === 0 && !isLoading && (
          <Text fontSize="xl" textAlign="center" fontWeight="bold" color="gray.500">
            No products found 😢{" "}
            <Link to="/create">
              <Text as="span" color="blue.500" _hover={{ textDecoration: "underline" }}>
                Create a product
              </Text>
            </Link>
          </Text>
        )}

        <OrdersDialog isOpen={isOrdersDialogOpen} onClose={() => setIsOrdersDialogOpen(false)} orders={orders} />
        <UsersDialog isOpen={isUsersDialogOpen} onClose={() => setIsUsersDialogOpen(false)} users={users} />
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
