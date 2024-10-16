import express from 'express';
import { addToCart, getCart, removeFromCart } from '../controllers/cartController.js';
const router = express.Router();



router.post('/cart/add', addToCart);
router.get('/cart/:userId',getCart);
router.post('/cart/remove', removeFromCart);
export default router;