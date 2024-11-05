import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Box, Button, FormControl, FormLabel, Input, Heading, Text, VStack, useToast } from '@chakra-ui/react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../contexts/authContext.jsx';

const LoginPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const toast = useToast();
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn, role, setRole, name, setName, handleLogout } = useContext(AuthContext);

  const onSubmit = async (data) => {
    try {
      const res = await axios.post('http://localhost:8000/api/login', data);

      if (res.status === 200) {
        const { token, user } = res.data;
        localStorage.setItem('token', token);
        localStorage.setItem('role', user.role);
        localStorage.setItem('name', user.name);
        localStorage.setItem('userID', user.userID);

        console.log("Stored userID in local storage:", localStorage.getItem("userID"));

        setIsLoggedIn(true);
        setRole(user.role);
        setName(user.name);

        toast({
          title: "Login Successful!",
          description: `You have successfully logged in as ${user.role}.`,
          status: "success",
          duration: 5000,
          isClosable: true,
        });

        navigate('/');
      } else {
        toast({
          title: "Login failed.",
          description: res.data.message || "Login unsuccessful. Please try again.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "Login failed.",
        description: error.response?.data?.message || "Network error or server error. Please try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box maxW="md" mx="auto" mt={10} p={5} borderWidth={1} borderRadius="lg" boxShadow="lg">
      <Heading as="h2" mb={6} textAlign="center">Login</Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing={4}>
          {/* Email Field */}
          <FormControl id="email" isInvalid={errors.email}>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              placeholder="Your Email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: 'Enter a valid email address',
                }
              })}
            />
            {errors.email && <Text color="red.500">{errors.email.message}</Text>}
          </FormControl>

          {/* Password Field */}
          <FormControl id="password" isInvalid={errors.password}>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              placeholder="Password"
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters long',
                }
              })}
            />
            {errors.password && <Text color="red.500">{errors.password.message}</Text>}
          </FormControl>

          {/* Submit Button */}
          <Button type="submit" colorScheme="blue" width="full">Login</Button>

          {/* Link to Register */}
          <Text as='span' color='blue.500' _hover={{ textDecoration: "underline" }}>
            <Link to="/register">Don't have an account? Register</Link>
          </Text>
        </VStack>
      </form>
    </Box>
  );
};

export default LoginPage;
