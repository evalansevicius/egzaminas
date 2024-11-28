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

router.get('/products', getProducts);

router.post('/products', isAdmin, requireAdminOrSuperadmin, createProduct);

router.delete('/products/:productID', isAdmin, requireAdminOrSuperadmin, deleteProduct);

router.put('/products/:productID', isAdmin, requireAdminOrSuperadmin, updateProduct);

router.patch('/products/:productID/incrementRating', incrementRating);

export default router;
