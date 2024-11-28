import express from 'express';
import Order from '../models/Order.js';
const router = express.Router();

router.post('/checkout', async (req, res) => {
    const {userID, name, items, totalPrice, shippingAddress } = req.body;
    if (!userID) {
        return res.status(400).json({ success: false, message: 'UserID is required' });
    }
    try {
        const order = new Order({ userID, name, items, totalPrice, shippingAddress: { street:shippingAddress.street, city:shippingAddress.city, zip:shippingAddress.zip, country:shippingAddress.country} });
        await order.save();

        res.json({ success: true, orderId: order._id });
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ success: false, message: 'Error processing order' });
    }
});

router.get('/orders', async (req, res) => {
    try {
        const orders = await Order.find().populate('userID', 'name');
        res.json({ success: true, orders });
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ success: false, message: 'Error fetching orders' });
    }
});

export default router;
