import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';

// Hash password function
const hashPassword = (password) => {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(12, (err, salt) => {
            if (err) {
                return reject(err);
            }

            bcrypt.hash(password, salt, (err, hash) => {
                if (err) {
                    return reject(err);
                }
                resolve(hash);
            });
        });
    });
};

// Compare password function
const comparePassword = (password, hashed) => {
    return bcrypt.compare(password, hashed);
};

// Admin verification middleware
const isAdmin = async (req, res, next) => {
    try {
        // Extract token from Authorization header
        const token = req.header('Authorization')?.replace('Bearer ', '');
        
        if (!token) {
            return res.status(401).json({ message: 'Authorization token missing.' });
        }

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Find user by ID from the decoded token
        const user = await User.findOne({ userID: decoded.id });
        
        if (!user) {
            return res.status(401).json({ message: 'User not found.' });
        }
        
        // Check if user has an admin or superadmin role
        if (user.role !== 'admin' && user.role !== 'superadmin') {
            return res.status(403).json({ message: 'Access denied. Admins only.' });
        }

        // Attach user object to request for future use in routes
        req.user = user;
        next();
    } catch (error) {
        console.error('Error in isAdmin middleware:', error.message);
        return res.status(401).json({ message: 'Invalid token or token expired.' });
    }
};

// Middleware to ensure user is admin or superadmin
const requireAdminOrSuperadmin = (req, res, next) => {
    const userRole = req.user?.role;

    if (userRole === 'admin' || userRole === 'superadmin') {
        return next();
    }

    return res.status(403).json({ message: "Forbidden: Insufficient permissions" });
};

export {
    hashPassword,
    comparePassword,
    isAdmin,
    requireAdminOrSuperadmin
};
