import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Image,
  Text,
  Button,
  useBreakpointValue
} from "@chakra-ui/react";

const ProductDetailsModal = ({ product, isOpen, onClose }) => {
  const modalSize = useBreakpointValue({ base: "full", sm: "lg", md: "lg" });

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={modalSize}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{product.name}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Image
            src={product.image}
            alt={product.name}
            boxSize="100%"
            maxH="500px"
            objectFit="contain"
            mb={4}
          />
          <Text fontSize="xl" mb={2}>
            €{product.price}
          </Text>
          <Text fontSize="lg" mb={4}>
            {product.description}
          </Text>
          <Button colorScheme="teal" onClick={onClose}>
            Close
          </Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ProductDetailsModal;
