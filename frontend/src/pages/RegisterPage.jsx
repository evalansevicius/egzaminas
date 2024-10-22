import React from 'react';
import { useForm } from 'react-hook-form';
import { Box, Button, FormControl, FormLabel, Input, Heading, Text, VStack, useToast } from '@chakra-ui/react';
import axios from 'axios';


const RegisterPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const toast = useToast();
  
  const onSubmit = async (data) => {
    try {
      const res = await axios.post('http://localhost:8000/api/register', data);
      
      if (res.status === 200) { 
        toast({
          title: "Registration successful!",
          description: "You have successfully registered.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Registration failed.",
          description: res.data.message || "Registration unsuccessful. Please try again.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
        toast({
        title: "Registration failed.",
        description: error.response?.data?.message || "Network error or server error. Please try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box maxW="md" mx="auto" mt={10} p={5} borderWidth={1} borderRadius="lg" boxShadow="lg">
      <Heading as="h2" mb={6} textAlign="center">Register</Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing={4}>
          <FormControl id="name" isInvalid={errors.name}>
            <FormLabel>Name</FormLabel>
            <Input 
              type="text" 
              placeholder="Your Name" 
              {...register('name', { required: 'Name is required' })} 
            />
            {errors.name && <Text color="red.500">{errors.name.message}</Text>}
          </FormControl>

          <FormControl id="email" isInvalid={errors.email}>
            <FormLabel>Email</FormLabel>
            <Input 
              type="email" 
              placeholder="Your Email" 
              {...register('email', { required: 'Email is required' })} 
            />
            {errors.email && <Text color="red.500">{errors.email.message}</Text>}
          </FormControl>

          <FormControl id="password" isInvalid={errors.password}>
            <FormLabel>Password</FormLabel>
            <Input 
              type="password" 
              placeholder="Password" 
              {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Password must be at least 6 characters long' } })}
            />
            {errors.password && <Text color="red.500">{errors.password.message}</Text>}
          </FormControl>

          <Button type="submit" colorScheme="blue" width="full">Register</Button>
          
        </VStack>
      </form>
    </Box>
  );
};

export default RegisterPage;
