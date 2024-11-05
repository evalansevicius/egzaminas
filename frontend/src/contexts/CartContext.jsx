// CartContext.jsx
import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Function to add items to the cart
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProductIndex = prevCart.findIndex(item => item.productID === product.productID);
      if (existingProductIndex !== -1) {
        const updatedCart = [...prevCart];
        updatedCart[existingProductIndex].quantity += 1;
        return updatedCart;
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  // Function to remove an item from the cart
  const removeFromCart = (productID) => {
    setCart((prevCart) => prevCart.filter(item => item.productID !== productID));
  };

  // Function to increase the quantity of a product
  const increaseQuantity = (productID) => {
    setCart((prevCart) => 
      prevCart.map(item => 
        item.productID === productID 
          ? { ...item, quantity: item.quantity + 1 } 
          : item
      )
    );
  };

  // Function to decrease the quantity of a product
  const decreaseQuantity = (productID) => {
    setCart((prevCart) => 
      prevCart.map(item => 
        item.productID === productID && item.quantity > 1 
          ? { ...item, quantity: item.quantity - 1 } 
          : item
      )
    );
  };

  // Function to clear the cart after checkout
  const clearCart = () => {
    setCart([]); // Clears the cart
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};
