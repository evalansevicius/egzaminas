// routes/checkoutRoutes.js
import express from 'express';
import Order from '../models/Order.js'; // Make sure to create an Order model
const router = express.Router();

router.post('/checkout', async (req, res) => {
    const {userID, items, totalPrice } = req.body;
    console.log("Received data:", { userID, items, totalPrice });
    if (!userID) {
        return res.status(400).json({ success: false, message: 'UserID is required' });
    }
    try {
        // Create a new order
        const order = new Order({ userID, items, totalPrice });
        await order.save();

        res.json({ success: true, orderId: order._id });
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ success: false, message: 'Error processing order' });
    }
});

router.get('/orders', async (req, res) => {
    try {
        const orders = await Order.find();
        res.json({ success: true, orders });
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ success: false, message: 'Error fetching orders' });
    }
});

export default router;
