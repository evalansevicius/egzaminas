import React, { useRef } from 'react';
import {
  Button,
  Input,
  Text,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
} from "@chakra-ui/react";

const RoleDialog = ({ isOpen, onClose, userID, setUserID, onPromote, onDemote, userRole }) => {
    const cancelRef = useRef();
    
    const handlePromote = () => {
      if (userRole === "superadmin") {
        alert("Superadmin cannot be promoted.");
        return;
      }
      onPromote();
    };
  
    const handleDemote = () => {
      if (userRole === "superadmin") {
        alert("Superadmin cannot be demoted.");
        return;
      }
      onDemote();
    };
  return (
    <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
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
            <Text>Select an action for the user with this ID.</Text>
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>Cancel</Button>
            <Button colorScheme="green" onClick={handlePromote} ml={3}>Promote</Button>
            <Button colorScheme="red" onClick={handleDemote} ml={3}>Demote</Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default RoleDialog;
