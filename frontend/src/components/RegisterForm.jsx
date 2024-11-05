import React from 'react';
import { useForm } from 'react-hook-form';
import { VStack, Button, useToast, Text } from '@chakra-ui/react';
import FormField from './FormField';
import { registerUser } from '../services/authService';

const RegisterForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const toast = useToast();

  const onSubmit = async (data) => {
    try {
      const res = await registerUser(data);
      toast({
        title: "Registration successful!",
        description: "You have successfully registered.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (message) {
      toast({
        title: "Registration failed.",
        description: message,
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
          id="name"
          label="Name"
          type="text"
          placeholder="Your Name"
          register={register}
          validation={{ required: 'Name is required' }}
          error={errors.name}
        />
        <FormField
          id="email"
          label="Email"
          type="email"
          placeholder="Your Email"
          register={register}
          validation={{ required: 'Email is required' }}
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
            minLength: { value: 6, message: 'Password must be at least 6 characters long' },
          }}
          error={errors.password}
        />
        <Button type="submit" colorScheme="blue" width="full">Register</Button>
        <Text as='span' color='blue.500' _hover={{ textDecoration: "underline" }}>
          <a href="/login">Already have an account? Login</a>
        </Text>
      </VStack>
    </form>
  );
};

export default RegisterForm;
