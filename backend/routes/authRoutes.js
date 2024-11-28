import express from 'express';
import { registerUser, loginUser } from '../controllers/authController.js';

const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).json({ message: 'Welcome to the Auth API' });
});

router.post('/register', registerUser);

router.post('/login', loginUser);

export default router;
