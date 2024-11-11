import Product from '../models/product.js';
import { generateProductID } from '../Helpers/idgen.js';

const createProduct = async (req, res) => {
    const { name, price } = req.body;
  
    try {

      if (!name || !price) {
        return res.status(400).json({ success: false, message: 'Please fill all fields' });
      }
      const productID = await generateProductID();

      const product = await Product.create({
        name,
        price,
        productID,
        image: req.body.image || '',
        description: req.body.description || '',
      });

      res.status(201).json({
        success: true,
        data: product,
        message: 'Product created successfully',
      });
      
    } catch (error) {

      console.error('Error creating product:', error.message);
      res.status(500).json({
        success: false,
        message: 'Server error',
      });
    }
  };

const deleteProduct = async (req, res) => {
    const { productID } = req.params;
  
    try {

      if (!productID) {
        return res.status(400).json({
          success: false,
          message: 'Product ID is required',
        });
      }
  

      const product = await Product.findOneAndDelete({ productID });
  

      if (!product) {
        return res.status(404).json({
          success: false,
          message: 'Product not found',
        });
      }

      res.status(200).json({
        success: true,
        message: 'Product deleted successfully',
      });
  
    } catch (error) {
      console.error('Error deleting product:', error.message);
      res.status(500).json({
        success: false,
        message: 'Server error',
      });
    }
  };
 const getProducts = async (req, res) => {
    try {
      const products = await Product.find({});
      res.status(200).json({ success: true, data: products });
    } catch (error) {
      console.log("error in fetching products:", error.message);
      res.status(500).json({ success: false, message: "Server Error" });
    }
  };
 const updateProduct = async (req, res) => {
    const { productID } = req.params;
    const productData = req.body;
  
    try {
      const product = await Product.findOneAndUpdate({ productID }, productData, { new: true });
      
      if (!product) {
        return res.status(404).json({ success: false, message: 'Product not found' });
      }
  
      res.status(200).json({ success: true, data: product });
    } catch (error) {
      console.error('Error updating product:', error.message);
      res.status(500).json({ success: false, message: 'Server Error' });
    }
  };

  const incrementRating = async (req, res) => {
    const { productID } = req.params;
    const { increment } = req.body; // Expect a boolean to decide increment or decrement
  
    try {
      const product = await Product.findOne({ productID });
      if (!product) {
        return res.status(404).json({ message: "No Product found" });
      }
  
      // Adjust rating based on the `increment` flag
      if (increment) {
        product.rating = product.rating ? product.rating + 1 : 1;
      } else {
        product.rating = product.rating > 0 ? product.rating - 1 : 0;
      }
  
      await product.save();
  
      res.status(200).json({ success: true, message: "Rating updated!", rating: product.rating });
    } catch (error) {
      console.log("Error incrementing Rating: ", error.message);
      res.status(500).json({ message: "Server Error" });
    }
  };
  
  

export {
    createProduct,
    deleteProduct,
    getProducts,
    updateProduct,
    incrementRating
}