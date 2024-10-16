import mongoose from 'mongoose';
const {Schema} = mongoose

const cartSchema = new Schema({
  userID: {
    type: Number,
    required: true,
  },
  products: [
    {
      productID: {
        type: Number,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        default: 1,
      },
    },
  ],
  totalPrice: { type: Number, required: true, default: 0 },
}, { timestamps: true });

const Cart = mongoose.model('Cart', cartSchema);

export default Cart;
