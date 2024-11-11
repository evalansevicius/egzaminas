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

const UsersDialog = ({ isOpen, onClose, users }) => {
  const { colorMode } = useColorMode();
  const cancelRef = useRef();

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
            {users.length === 0 ? (
              <Text>No users found.</Text>
            ) : (
              <VStack spacing={4}>
                {users.map((user) => (
                  <Box key={user.userID} p={5} shadow="md" borderWidth="1px" w="full">
                    <Text>UserID: {user.userID}</Text>
                    <Text>Name: {user.name}</Text>
                    <Text>Email: {user.email}</Text>
                    <Text>Role: {user.role}</Text>
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

export default UsersDialog;
