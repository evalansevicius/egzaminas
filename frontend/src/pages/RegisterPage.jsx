// src/pages/RegisterPage.js

import React from 'react';
import { Box, Heading } from '@chakra-ui/react';
import RegisterForm from '../components/RegisterForm';

const RegisterPage = () => {
  return (
    <Box maxW="md" mx="auto" mt={10} p={5} borderWidth={1} borderRadius="lg" boxShadow="lg">
      <Heading as="h2" mb={6} textAlign="center">Register</Heading>
      <RegisterForm />
    </Box>
  );
};

export default RegisterPage;
