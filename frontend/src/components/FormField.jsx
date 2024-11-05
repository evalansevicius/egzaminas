import React from 'react';
import { FormControl, FormLabel, Input, Text } from '@chakra-ui/react';

const FormField = ({ id, label, type, placeholder, register, validation, error }) => (
  <FormControl id={id} isInvalid={!!error}>
    <FormLabel>{label}</FormLabel>
    <Input 
      type={type} 
      placeholder={placeholder} 
      {...register(id, validation)} 
    />
    {error && <Text color="red.500">{error.message}</Text>}
  </FormControl>
);

export default FormField;
