import { useState, useRef } from "react";
import {
  Container,
  SimpleGrid,
  Text,
  VStack,
  Button,
  Input,
  HStack,
  useToast,
  useColorMode,
  Box,
  Heading,
  Divider,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  IconButton,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useProductStore } from "../store/product";
import AdminCard from "../components/AdminCard";
import axios from "axios";

const AdminPage = () => {
  const { getProducts, products } = useProductStore();
  const [userID, setUserID] = useState("");
  const [orders, setOrders] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false); // For orders dialog
  const [isRoleDialogOpen, setIsRoleDialogOpen] = useState(false); // For roles dialog
  const toast = useToast();
  const cancelRef = useRef();
  const { colorMode} = useColorMode();

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  // Function to fetch orders and open the dialog
  const fetchOrders = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/orders");
      setOrders(response.data.orders);
      setIsDialogOpen(true); // Open orders dialog
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast({
        title: "Error",
        description: "Failed to fetch orders.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  // Function to close dialogs
  const closeDialog = () => setIsDialogOpen(false);
  const closeRoleDialog = () => setIsRoleDialogOpen(false);

  // Function to handle promoting or demoting a user
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
      const token = localStorage.getItem("token");
      const endpoint = action === "promote" ? "promote" : "demote";
      await axios.post(
        `http://localhost:8000/api/${endpoint}`, 
        { userID }, 
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast({
        title: "Success!",
        description: `User with ID: ${userID} successfully ${action === "promote" ? "promoted to" : "demoted from"} admin.`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      setUserID("");
      closeRoleDialog();
    } catch (error) {
      console.error(`Error ${action === "promote" ? "promoting" : "demoting"} user:`, error);
      toast({
        title: "Error",
        description: error.response?.data?.message || `Failed to ${action === "promote" ? "promote user to admin" : "demote admin to user"}.`,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Container maxW='container.xl' py={12}>
      <VStack spacing={8}>
        <HStack spacing={4}>
          <Button colorScheme="blue" onClick={fetchOrders}>
            Orders
          </Button>
          <Button colorScheme="purple" onClick={() => setIsRoleDialogOpen(true)}>
            Roles
          </Button>
        </HStack>
        
        <Text
          fontSize={"30"}
          fontWeight={"bold"}
          bgGradient={"linear(to-r, cyan.400, blue.500)"}
          bgClip={"text"}
          textAlign={"center"}
        >
          Current Products 🚀
        </Text>

        <SimpleGrid
          columns={{
            base: 1,
            md: 2,
            lg: 3,
          }}
          spacing={10}
          w={"full"}
        >
          {products.map((product) => (
            <AdminCard key={product.productID} product={product} />
          ))}
        </SimpleGrid>

        {products.length === 0 && (
          <Text fontSize='xl' textAlign={"center"} fontWeight='bold' color='gray.500'>
            No products found 😢{" "}
            <Link to={"/create"}>
              <Text as='span' color='blue.500' _hover={{ textDecoration: "underline" }}>
                Create a product
              </Text>
            </Link>
          </Text>
        )}

        {/* Orders AlertDialog */}
        <AlertDialog
          isOpen={isDialogOpen}
          leastDestructiveRef={cancelRef}
          onClose={closeDialog}
        >
<AlertDialogOverlay>
  <AlertDialogContent maxH="500px" overflowY="auto" position="relative">
    {/* Container for the Close Button */}
    <Box position="sticky" top="0" zIndex="1" right="8px" background={colorMode === "light" ? "gray.100" : "gray.800"} p={2} boxShadow="sm"   display="flex" justifyContent="flex-end">
      <IconButton
        icon={<CloseIcon />}
        
        colorScheme="blue"
        aria-label="Close dialog"
        onClick={closeDialog}

      />
    </Box>

    <AlertDialogBody pt={4}> {/* Add padding to create space for the close button */}
      {orders.length === 0 ? (
        <Text>No completed orders found.</Text>
      ) : (
        <VStack spacing={4}>
          {orders.map((order) => (
            <Box key={order._id} p={5} shadow="md" borderWidth="1px" w="full">
              <Heading fontSize="xl">Order ID: {order._id}</Heading>
              <Text>UserID: {order.userID}</Text>
              <Text>Total Price: €{order.totalPrice.toFixed(2)}</Text>
              <Divider my={2} />
              <Text fontWeight="bold">Items:</Text>
              {order.items.map((item) => (
                <Box key={item.productID} pl={4} mt={2}>
                  <Text>Product ID: {item.productID}</Text>
                  <Text>Name: {item.name}</Text>
                  <Text>Price: €{item.price}</Text>
                  <Text>Quantity: {item.quantity}</Text>
                </Box>
              ))}
            </Box>
          ))}
        </VStack>
      )}
    </AlertDialogBody>
  </AlertDialogContent>
</AlertDialogOverlay>

        </AlertDialog>

        {/* Role Management AlertDialog */}
        <AlertDialog
          isOpen={isRoleDialogOpen}
          leastDestructiveRef={cancelRef}
          onClose={closeRoleDialog}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                User Role Management
              </AlertDialogHeader>

              <AlertDialogBody>
                <Input
                  placeholder="Enter User ID"
                  value={userID}
                  onChange={(e) => setUserID(e.target.value)}
                  mb={4}
                />
                <Text>
                  Select an action for the user with this ID.
                </Text>
              </AlertDialogBody>

              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={closeRoleDialog}>
                  Cancel
                </Button>
                <Button colorScheme="green" onClick={() => handleRoleChange("promote")} ml={3}>
                  Promote
                </Button>
                <Button colorScheme="red" onClick={() => handleRoleChange("demote")} ml={3}>
                  Demote
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </VStack>
    </Container>
  );
};

export default AdminPage;
