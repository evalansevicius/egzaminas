import express from 'express';
import { createProduct, deleteProduct, getProducts, updateProduct } from '../controllers/productController.js';
const router = express.Router();

// Route to get all products
router.get("/", getProducts);

// Route to create a product
router.post('/products', createProduct);

// Route to delete a product
router.delete('/product/:productID', deleteProduct);

// Route to edit a product
router.put("/:productID", updateProduct);

export default router;
