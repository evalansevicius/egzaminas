import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { VStack, Button, Text, useToast, IconButton } from '@chakra-ui/react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../contexts/authContext';
import FormField from './FormField';
import { loginUser } from '../services/authService';
import { AiOutlineLogin } from "react-icons/ai";

const LoginForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const toast = useToast();
  const navigate = useNavigate();
  const { setIsLoggedIn, setRole, setName } = useContext(AuthContext);

  const onSubmit = async (data) => {
    try {
      const res = await loginUser(data);

      if (res.status === 200) {
        const { token, user } = res.data;
        localStorage.setItem('token', token);
        localStorage.setItem('role', user.role);
        localStorage.setItem('name', user.name);
        localStorage.setItem('userID', user.userID);

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
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack spacing={4}>
        <FormField
          id="email"
          label="Email"
          type="email"
          placeholder="Your Email"
          register={register}
          validation={{
            required: 'Email is required',
            pattern: {
              value: /^\S+@\S+$/i,
              message: 'Enter a valid email address',
            },
          }}
          error={errors.email}
        />

        <FormField
          id="password"
          label="Password"
          type="password"
          placeholder="Password"
          register={register}
          validation={{
            required: 'Password is required',
            minLength: {
              value: 6,
              message: 'Password must be at least 6 characters long',
            },
          }}
          error={errors.password}
        />

        <IconButton 
          type="submit" 
          colorScheme="teal" 
          size="lg" 
          icon={<AiOutlineLogin />} 
          aria-label="Login" 
          width="full"
        />

        <Text as='span' color='blue.500' _hover={{ textDecoration: "underline" }}>
          <Link to="/register">Don't have an account? Register</Link>
        </Text>
      </VStack>
    </form>
  );
};

export default LoginForm;
