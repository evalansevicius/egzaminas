import User from '../models/user.js'
import Product from '../models/product.js';
// Custom user ID 6 digit
async function matchingUserID(id) {
  const existingUser = await User.findOne({ userID: id });
  return existingUser ? true : false;
}

async function generateUserID() {
  const id = Math.floor(100000 + Math.random() * 900000);

  if (await matchingUserID(id)) {
    return generateUserID();
  }

  return id;
}

// custom product id 10 digit

async function generateProductID(attempts = 0) {
  const id = Math.floor(1000000000 + Math.random() * 9000000000);
  if (attempts > 10) {
    throw new Error('Unable to generate a unique Product ID after multiple attempts');
  }

  const existingProduct = await Product.findOne({ productID: id });
  if (existingProduct) {
    return generateProductID(attempts + 1);
  }

  return id;
}


export {
  generateUserID,
  generateProductID,
};
