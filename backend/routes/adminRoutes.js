const express = require('express');
const router = express.Router();
const { isAdmin } = require('../middleware/auth');
const productController = require('../controllers/productController');

// Only admins can create a new product
//router.post('/product/create', isAdmin, productController.createProduct);

// Only admins can delete a product
//router.delete('/product/delete/:productID', isAdmin, productController.deleteProduct);

// Admin can promote another user to admin
//router.post('/promote', isAdmin, adminController.promoteToAdmin);

module.exports = router;
