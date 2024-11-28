import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';

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

const comparePassword = (password, hashed) => {
    return bcrypt.compare(password, hashed);
};

const isAdmin = async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        
        if (!token) {
            return res.status(401).json({ message: 'Authorization token missing.' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        const user = await User.findOne({ userID: decoded.id });
        
        if (!user) {
            return res.status(401).json({ message: 'User not found.' });
        }
        
        if (user.role !== 'admin' && user.role !== 'superadmin') {
            return res.status(403).json({ message: 'Access denied. Admins only.' });
        }

        req.user = user;
        next();
    } catch (error) {
        console.error('Error in isAdmin middleware:', error.message);
        return res.status(401).json({ message: 'Invalid token or token expired.' });
    }
};

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
