import React from "react";
import { Box, useColorModeValue } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import { AuthProvider } from './contexts/authContext.jsx';
import { CartProvider } from './contexts/CartContext';
import CreatePage from "./pages/CreatePage";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import AdminPage from "./pages/AdminPage.jsx";
import Cart from './pages/Cart';
import CheckoutPage from './pages/CheckoutPage'; 
import ContactPage from './pages/ContactPage';
import AboutPage from './pages/AboutPage';
import Footer from "./components/Footer.jsx";  // Ensure Footer is imported here

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        {/* Main layout container */}
        <Box 
          minH="100vh" 
          display="flex" 
          flexDirection="column" 
          bg={useColorModeValue("gray.100", "gray.900")} 
        >
          {/* Navbar stays at the top */}
          <Navbar />
          
          {/* Main content area that takes up remaining space */}
          <Box 
            flex="1" 
            display="flex" 
            flexDirection="column" 
            overflow="auto"
          >
            {/* Routing setup for the pages */}
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/create" element={<CreatePage />} />
              <Route path="/admin" element={<AdminPage />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/about" element={<AboutPage />} />
            </Routes>
          </Box>
          
          {/* Footer only rendered once at the bottom */}
          <Footer />
        </Box>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
