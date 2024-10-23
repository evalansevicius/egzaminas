import { Box, useColorModeValue } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import { AuthProvider } from './contexts/authContext.jsx';
import CreatePage from "./pages/CreatePage";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import AdminPage from "./pages/AdminPage.jsx";
function App() {
	return (
		<AuthProvider>
		<Box minH={"100vh"} bg={useColorModeValue("gray.100", "gray.900")}>
			
			<Navbar />
			<Routes>
				<Route path='/' element={<HomePage />} />
				<Route path='/login' element={<LoginPage />} />
				<Route path="/register" element={<RegisterPage />} />
				<Route path='/create' element={<CreatePage />} />
				<Route path='/admin' element={<AdminPage />} />
			</Routes>
		</Box>
		</AuthProvider>
	);

}

export default App;
