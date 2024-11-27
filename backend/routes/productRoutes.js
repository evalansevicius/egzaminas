import express from 'express';
import { 
    createProduct, 
    deleteProduct, 
    getProducts, 
    updateProduct, 
    incrementRating 
} from '../controllers/productController.js';
import { isAdmin, requireAdminOrSuperadmin } from '../helpers/auth.js';

const router = express.Router();

// Get all products
router.get('/products', getProducts);  // Change here to /products

// Create a product (requires admin or superadmin privileges)
router.post('/products', isAdmin, requireAdminOrSuperadmin, createProduct);

// Delete a product (requires admin or superadmin privileges)
router.delete('/products/:productID', isAdmin, requireAdminOrSuperadmin, deleteProduct);

// Update a product (requires admin or superadmin privileges)
router.put('/products/:productID', isAdmin, requireAdminOrSuperadmin, updateProduct);

// Increment product rating
router.patch('/products/:productID/incrementRating', incrementRating);

export default router;
