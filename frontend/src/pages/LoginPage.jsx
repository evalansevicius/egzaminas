import React from 'react';
import { Box, Heading } from '@chakra-ui/react';
import LoginForm from '../components/LoginForm';

const LoginPage = () => {
  return (
    <Box maxW="md" mx="auto" mt={10} p={5} borderWidth={1} borderRadius="lg" boxShadow="lg">
      <Heading as="h2" mb={6} textAlign="center">Login</Heading>
      <LoginForm />
    </Box>
  );
};

export default LoginPage;
