const Cart = require('../models/Cart');
const Product = require('../models/Product');

exports.addToCart = async (req, res) => {
    const { productID } = req.body;
    const userID = req.body._id;
}

try {
    const product = await Product.findById(productID);
    if (!product) {
        return res.status(404).json({ message: 'Product not found' });
    }  
    
    let cart = await Cart.findOne({userID})

    if (cart) {
        const productIndex = cart.products.findIndex(p => p.productID === productID);

        if (productIndex > -1) {
        
        }
     
        
    }

    
}