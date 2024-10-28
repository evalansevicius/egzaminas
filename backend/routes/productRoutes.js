import express from 'express';
import { createProduct, deleteProduct, getProducts, updateProduct } from '../controllers/productController.js';
import { isAdmin } from '../helpers/auth.js';
const router = express.Router();

// Route to get all products
router.get("/", getProducts);

// Route to create a product
router.post('/products',isAdmin, createProduct);

// Route to delete a product
router.delete('/products/:productID',isAdmin, deleteProduct);

// Route to edit a product
router.put("/products/:productID",isAdmin, updateProduct);

export default router;
