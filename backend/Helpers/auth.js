import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
import User from '../models/user.js';
const hashPassword = (password) => {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(12, (err, salt) => {
            if (err) {
                reject(err)
            }
            bcrypt.hash(password, salt, (err, hash) => {
                if (err) {
                    reject(err)
                }
                bcrypt.hash(password, salt, (err, hash) => {
                    if (err) {
                        reject(err)
                    }
                    resolve(hash)
                })
            })
        })
    })   
}

const comparePassword = (password, hashed) => {
    return bcrypt.compare(password, hashed)
}
const isAdmin = async (req, res, next) => {
    try {
      console.log('isAdmin middleware called');
  
      // Get token from the authorization header
      const token = req.header('Authorization').replace('Bearer ', '');
      console.log('Token:', token);
  
      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log('Decoded token:', decoded);
  
      // Find the user by userID (not _id, but custom userID)
      const user = await User.findOne({ userID: decoded.id });  // Change here to query by userID
      console.log('User found:', user);
  
      if (!user) {
        console.log('User not found');
        return res.status(401).json({ message: 'Invalid user.' });
      }
  
      // Check if the user is an admin
      if (user.role !== 'admin') {
        console.log('User is not an admin');
        return res.status(403).json({ message: 'Access denied. Admins only.' });
      }
  
      console.log('User is an admin');
      req.user = user;
      next();
    } catch (error) {
      console.error('Error in isAdmin middleware:', error.message);
      return res.status(401).json({ message: 'Invalid token.' });
    }
  };

  
  
export {
    hashPassword,
    comparePassword,
    isAdmin
}