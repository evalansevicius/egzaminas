import Cart from '../models/cart.js';
import Product from '../models/product.js';

const addToCart = async (req, res) => {
  const { userID, productID, quantity } = req.body;

  try {
    // Find the product in the database
    const product = await Product.findOne({ productID });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Find the user's cart
    let cart = await Cart.findOne({ userID });

    if (cart) {
      // If cart exists, check if the product is already in the cart
      const productIndex = cart.products.findIndex(p => p.productID === productID);

      if (productIndex > -1) {
        // If product exists, update the quantity
        cart.products[productIndex].quantity += quantity;
      } else {
        // If product doesn't exist, add it to the cart
        cart.products.push({ productID, quantity });
      }

    } else {
      // If no cart exists for the user, create a new cart
      cart = new Cart({
        userID,
        products: [{ productID, quantity }],
      });
    }

    // Calculate the total price
    let totalPrice = 0;
    for (let item of cart.products) {
      const prod = await Product.findOne({ productID: item.productID });
      totalPrice += prod.price * item.quantity;
    }
    cart.totalPrice = totalPrice;

    // Save the cart
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
      // Find the cart of the user
      const cart = await Cart.findOne({ userID });
      if (!cart) {
        return res.status(404).json({ message: 'Cart not found' });
      }
  
      // Find the product in the cart
      const productIndex = cart.products.findIndex(p => p.productID === productID);
      if (productIndex === -1) {
        return res.status(404).json({ message: 'Product not found in cart' });
      }
  
      // Remove the product from the cart
      cart.products.splice(productIndex, 1);
  
      // Recalculate the total price after removing the product
      let totalPrice = 0;
      for (let item of cart.products) {
        const prod = await Product.findOne({ productID: item.productID });
        totalPrice += prod.price * item.quantity;
      }
      cart.totalPrice = totalPrice;
  
      // Save the updated cart
      await cart.save();
      res.status(200).json(cart);
  
    } catch (error) {
      console.error('Error removing from cart:', error.message);
      res.status(500).json({ message: 'Server error' });
    }
  };
  
  
  export { addToCart, getCart, removeFromCart };