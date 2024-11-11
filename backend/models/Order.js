// models/Order.js
import mongoose from 'mongoose';
import ShippingAddressSchema from './ShippingAddress.js';
const orderSchema = new mongoose.Schema({
    userID: { type: String, required: true },
    name: { type: String, required: true },
    items: [
        {
            productID: { type: String, required: true },
            name: { type: String, required: true },
            price: { type: Number, required: true },
            quantity: { type: Number, required: true },
        },
    ],
    totalPrice: { type: Number, required: true },
    shippingAddress: { type: ShippingAddressSchema, required: true },
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);

export default Order;
