import User from '../models/user.js';
import { hashPassword, comparePassword } from '../Helpers/auth.js';
import jwt from 'jsonwebtoken';
import { generateUserID } from '../Helpers/idgen.js';

const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Please fill all fields' });
        }

        const exist = await User.findOne({ email });
        if (exist) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        const hashedPassword = await hashPassword(password);

        const userID = await generateUserID();

        const user = new User({
            name,
            email,
            userID,
            password: hashedPassword,
            role: 'user'
        });

        await user.save();

        return res.status(201).json({
            message: 'User registered successfully',
            user: {
                userID: user.userID,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });
    } catch (error) {
        console.error('Error registering user:', error);
        return res.status(500).json({ message: 'Server error' });
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const valid = await comparePassword(password, user.password);
        if (!valid) {
            return res.status(400).json({ message: 'Invalid password' });
        }

        const token = jwt.sign(
            { id: user.userID, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        return res.status(200).json({
            message: 'Login successful',
            token,
            user: {
                userID: user.userID,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });
    } catch (error) {
        console.error('Error logging in user:', error);
        return res.status(500).json({ message: 'Server error' });
    }
};

export const promoteToAdmin = async (req, res) => {
    try {
        const { userID } = req.body;

        const targetUser = await User.findOne({ userID });
        if (!targetUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (targetUser.role === 'superadmin' && req.user.role !== 'superadmin') {
            return res.status(403).json({ message: 'Only superadmins can promote or demote other superadmins' });
        }

        targetUser.role = 'admin';
        await targetUser.save();

        return res.status(200).json({ message: 'User promoted to admin successfully' });
    } catch (error) {
        console.error('Error promoting user:', error);
        return res.status(500).json({ message: 'Failed to promote user' });
    }
};

export const demoteFromAdmin = async (req, res) => {
    try {
        const { userID } = req.body;

        const targetUser = await User.findOne({ userID });
        if (!targetUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (targetUser.role === 'superadmin' && req.user.role !== 'superadmin') {
            return res.status(403).json({ message: 'Only superadmins can promote or demote other superadmins' });
        }

        targetUser.role = 'user';
        await targetUser.save();

        return res.status(200).json({ message: 'User demoted successfully' });
    } catch (error) {
        console.error('Error demoting user:', error);
        return res.status(500).json({ message: 'Failed to demote user' });
    }
};

export const getUsers = async (req, res) => {
    try {
        const users = await User.find({}, 'userID name role email');
        return res.status(200).json({ users });
    } catch (error) {
        console.error('Error fetching users:', error);
        return res.status(500).json({ message: 'Failed to fetch users' });
    }
};

export {
    registerUser,
    loginUser,
};
