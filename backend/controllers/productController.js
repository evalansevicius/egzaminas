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
        image: req.body.image || ''
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
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ success: false, message: "Invalid Product Id" });
    }
  
    try {
      const updatedProduct = await Product.findOneAndUpdate({ productID }, productData, { new: true });
      res.status(200).json({ success: true, data: updatedProduct });
    } catch (error) {
      res.status(500).json({ success: false, message: "Server Error" });
    }
  };

  const incrementRating = async (req, res) => {
    const { productID } = req.params;
    
    try {
      const product = await Product.FindOne ({ productID });
      if (!product) {
        return res.status(404).json ({ message: "No Product found"});
      }
      product.rating +=1;

      await product.save();

      res.status(200).json ({ success: true, message: "rating updated! ", rating: product.rating});
     
    } catch (error){
      console.log("Error incrementingRating ", error.message);
      res.status(500).json ({ message: "Server Error" });
    }
  };
  

export {
    createProduct,
    deleteProduct,
    getProducts,
    updateProduct,
    incrementRating
}