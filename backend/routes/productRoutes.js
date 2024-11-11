import express from 'express';
import { createProduct, deleteProduct, getProducts, updateProduct, incrementRating } from '../controllers/productController.js';
import { isAdmin, requireAdminOrSuperadmin } from '../helpers/auth.js';

const router = express.Router();

// Route to get all products
router.get("/", getProducts);

// Route to create a product
router.post('/products',isAdmin, requireAdminOrSuperadmin, createProduct);

// Route to delete a product
router.delete('/products/:productID',isAdmin, requireAdminOrSuperadmin, deleteProduct);

// Route to edit a product
router.put("/products/:productID",isAdmin, requireAdminOrSuperadmin, updateProduct);

// Route to increment rating
router.patch("/products/:productID/incrementRating", incrementRating);
export default router;
