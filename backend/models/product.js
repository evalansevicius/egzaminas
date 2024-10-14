import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    productID: { type: Number, required: true, unique: true },
    price: { type: Number, required: true },
    image: { type: String },
}, { timestamps: true });

// Check if the model already exists to avoid OverwriteModelError
const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

export default Product;