import express from 'express';

import {promoteToAdmin, demoteFromAdmin} from '../controllers/authController.js';
import { isAdmin } from '../helpers/auth.js';
import {createProduct, deleteProduct} from '../controllers/productController.js';

const router = express.Router();
// Only admins can create a new product
router.post('/product/create', isAdmin, createProduct);

// Only admins can delete a product
router.delete('/product/delete/:productID', isAdmin, deleteProduct);

// Admin can promote another user to admin
router.post('/promote', isAdmin, promoteToAdmin);

// Admin can demote another user from admin
router.post('/demote', isAdmin, demoteFromAdmin);

export default router;
