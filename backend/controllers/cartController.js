import Cart from '../models/cart.js';
import Product from '../models/product.js';

const addToCart = async (req, res) => {
  const { userID, productID, quantity } = req.body;

  try {
    
    const product = await Product.findOne({ productID });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    
    let cart = await Cart.findOne({ userID });

    if (cart) {
      
      const productIndex = cart.products.findIndex(p => p.productID === productID);
      if (productIndex > -1) {
        
        cart.products[productIndex].quantity += quantity;
      } else {
        
        cart.products.push({ productID, quantity });
      }
      
      cart.totalPrice += product.price * quantity;
    } else {
      
      cart = new Cart({
        userID,
        products: [{ productID, quantity }],
        totalPrice: product.price * quantity,
      });
    }

    
    await cart.save();
    res.status(201).json(cart);

  } catch (error) {
    console.error('Error adding to cart:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

const getCart = async (req, res) => {
    const { userID } = req.params;
  
    try {
      const cart = await Cart.findOne({ user: userID }).populate('products.product');
      if (!cart) {
        return res.status(404).json({ message: 'Cart not found' });
      }
  
      res.status(200).json(cart);
    } catch (error) {
      console.error('Error fetching cart:', error.message);
      res.status(500).json({ message: 'Server error' });
    }
  };

 const removeFromCart = async (req, res) => {
    const { userID, productID } = req.body;
  
    try {
      const cart = await Cart.findOne({ user: userID });
      if (!cart) {
        return res.status(404).json({ message: 'Cart not found' });
      }
  
      const productIndex = cart.products.findIndex(p => p.product.toString() === productID);
      if (productIndex === -1) {
        return res.status(404).json({ message: 'Product not found in cart' });
      }
  
      cart.totalPrice -= cart.products[productIndex].quantity * cart.products[productIndex].product.price;
      cart.products.splice(productIndex, 1);
      await cart.save();
  
      res.status(200).json(cart);
    } catch (error) {
      console.error('Error removing from cart:', error.message);
      res.status(500).json({ message: 'Server error' });
    }
  };
  export { addToCart, getCart, removeFromCart };