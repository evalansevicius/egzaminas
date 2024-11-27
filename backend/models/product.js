import mongoose from 'mongoose';

// Product Schema Definition
const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    productID: { type: Number, required: true, unique: true, index: true },
    price: { type: Number, required: true, min: 0 },  // Ensuring price is non-negative
    image: { type: String },  // Optional field for image URL or path
    rating: { type: Number, default: 0 },
    description: { type: String },
    // Optionally you can add more fields like category, stock, discount, etc.
}, { timestamps: true });

// Check if the model already exists to avoid OverwriteModelError
const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

export default Product;
