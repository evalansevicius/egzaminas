import { useState } from "react";
import { Container, SimpleGrid, Text, VStack, Button, Input, HStack, useToast, Box } from "@chakra-ui/react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useProductStore } from "../store/product"; // Add your user management store here if needed
import AdminCard from "../components/AdminCard";
import axios from "axios";

const AdminPage = () => {
  const { getProducts, products } = useProductStore();
  const [userID, setUserID] = useState(""); // To store userID input
  const toast = useToast();

  useEffect(() => {
    getProducts();
  }, [getProducts]);



  // Function to handle promoting a user to admin
  const promoteToAdmin = async () => {
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
      const token = localStorage.getItem("token"); // Make sure you have the token

      // Call the API to promote the user
      const response = await axios.post(
        "http://localhost:8000/api/promote", 
        { userID }, 
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // Show success message
      toast({
        title: "Success!",
        description: `User with ID: ${userID} promoted to admin successfully.`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      // Clear the input field
      setUserID("");
    } catch (error) {
      console.error("Error promoting user to admin:", error);
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to promote user to admin.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };
  const demoteFromAdmin = async () => {
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
      const token = localStorage.getItem("token"); // Make sure you have the token

      // Call the API to promote the user
      const response = await axios.post(
        "http://localhost:8000/api/demote", 
        { userID }, 
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // Show success message
      toast({
        title: "Success!",
        description: `User with ID: ${userID} demoted from admin successfully.`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      // Clear the input field
      setUserID("");
    } catch (error) {
      console.error("Error demoting admin to user:", error);
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to demote admin to user",
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
            <Input
              placeholder="Enter User ID"
              value={userID}
              onChange={(e) => setUserID(e.target.value)}
            />
            <Button colorScheme="green" onClick={promoteToAdmin}>
              Promote
            </Button>
			<Button colorScheme="red" onClick={demoteFromAdmin}>
              Demote
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


      </VStack>
    </Container>
  );
};

export default AdminPage;
