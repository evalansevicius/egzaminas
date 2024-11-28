import express from 'express';
import { promoteToAdmin, demoteFromAdmin, getUsers } from '../controllers/authController.js';
import { isAdmin, requireAdminOrSuperadmin } from '../helpers/auth.js';
import { createProduct, deleteProduct } from '../controllers/productController.js';

const router = express.Router();

router.post('/product/create', isAdmin, createProduct);
router.delete('/product/delete/:productID', isAdmin, deleteProduct);
router.post('/promote', isAdmin, promoteToAdmin);
router.post('/demote', isAdmin, demoteFromAdmin);
router.get('/users', isAdmin, getUsers);

export default router;
