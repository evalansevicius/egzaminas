import React from 'react';
import { Box, Heading } from '@chakra-ui/react';
import LoginForm from '../components/LoginForm';

const LoginPage = () => {
  return (
    <Box maxW="3/4" mx="auto" maxY="auto">   
      <Box maxW="3/4" mx="lg" maxY="lg" mt={10} p={5} borderWidth={1} borderRadius="lg" boxShadow="lg">
      <Heading as="h2" mb={6} textAlign="center">Login</Heading>
      <LoginForm />
    </Box>
    </Box> 
  );
};

export default LoginPage;
