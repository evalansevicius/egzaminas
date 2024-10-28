// src/App.jsx

import { Box, useColorModeValue } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import CreatePage from "./pages/CreatePage";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import RegisterPage from "./pages/RegisterPage";
import Cart from './pages/Cart';
import CheckoutPage from './pages/CheckoutPage'; // Import the new Checkout page

function App() {
    return (
        <Box minH={"100vh"} bg={useColorModeValue("gray.100", "gray.900")}>
            <Navbar />
            <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path='/create' element={<CreatePage />} />
                <Route path='/cart' element={<Cart />} />
                <Route path='/checkout' element={<CheckoutPage />} /> {/* Add the route for checkout */}
            </Routes>
        </Box>
    );
}

export default App;
