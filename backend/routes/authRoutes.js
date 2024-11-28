import express from 'express';
import { registerUser, loginUser } from '../controllers/authController.js';

const router = express.Router();

// Placeholder for the root route (if needed, define its behavior)
router.get('/', (req, res) => {
    res.status(200).json({ message: 'Welcome to the Auth API' });
});

// Route to register a new user
// It's important to validate inputs before attempting registration
router.post('/register', registerUser);

// Route to log in a user
// Validating login credentials and generating JWT
router.post('/login', loginUser);

export default router;
