// src/index.jsx or src/main.jsx

import React from 'react';
import ReactDOM from 'react-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { CartProvider } from './contexts/CartContext'; // Adjust the path as necessary

ReactDOM.render(
    <ChakraProvider>
        <BrowserRouter>
            <CartProvider>
                <App />
            </CartProvider>
        </BrowserRouter>
    </ChakraProvider>,
    document.getElementById('root')
);
