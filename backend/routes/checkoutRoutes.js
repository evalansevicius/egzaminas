// routes/checkoutRoutes.js
import express from 'express';
import Order from '../models/Order.js'; // Make sure to create an Order model
const router = express.Router();

router.post('/checkout', async (req, res) => {
    const { items, totalPrice } = req.body;

    try {
        // Create a new order
        const order = new Order({ items, totalPrice });
        await order.save();

        res.json({ success: true, orderId: order._id });
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ success: false, message: 'Error processing order' });
    }
});

export default router;
