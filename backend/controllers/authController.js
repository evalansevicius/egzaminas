import User from '../models/user.js';
import { hashPassword, comparePassword } from '../Helpers/auth.js';
import jwt from 'jsonwebtoken';
import { generateUserID } from '../Helpers/idgen.js';

// Controller to register a new user
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        console.log(name, email, password);

        // Validate fields
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Please fill all fields' });
        }

        // Check if the user already exists
        const exist = await User.findOne({ email });
        if (exist) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        // Hash the password
        const hashedPassword = await hashPassword(password);

        // Generate custom userID
        const userID = await generateUserID();

        // Create a new user with the default role 'user'
        const user = new User({
            name,
            email,
            userID,
            password: hashedPassword,
            role: 'user'  // Assign the default role
        });

        // Save the user to the database
        await user.save();

        // Return success response
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

// Controller to log in a user
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Verify the password
        const valid = await comparePassword(password, user.password);
        if (!valid) {
            return res.status(400).json({ message: 'Invalid password' });
        }

        // Generate a JWT token
        const token = jwt.sign(
            { id: user.userID, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' } // Token expiration time
        );

        // Return the success response with the token and user details
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

// Controller to promote a user to admin
export const promoteToAdmin = async (req, res) => {
    try {
        const { userID } = req.body;

        // Find the target user by userID
        const targetUser = await User.findOne({ userID });
        if (!targetUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if the current user is allowed to promote (only superadmins can promote superadmins)
        if (targetUser.role === 'superadmin' && req.user.role !== 'superadmin') {
            return res.status(403).json({ message: 'Only superadmins can promote or demote other superadmins' });
        }

        // Promote the user to admin
        targetUser.role = 'admin';
        await targetUser.save();

        return res.status(200).json({ message: 'User promoted to admin successfully' });
    } catch (error) {
        console.error('Error promoting user:', error);
        return res.status(500).json({ message: 'Failed to promote user' });
    }
};

// Controller to demote a user from admin
export const demoteFromAdmin = async (req, res) => {
    try {
        const { userID } = req.body;

        // Find the target user by userID
        const targetUser = await User.findOne({ userID });
        if (!targetUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if the current user is allowed to demote (only superadmins can demote superadmins)
        if (targetUser.role === 'superadmin' && req.user.role !== 'superadmin') {
            return res.status(403).json({ message: 'Only superadmins can promote or demote other superadmins' });
        }

        // Demote the user from admin to user
        targetUser.role = 'user';
        await targetUser.save();

        return res.status(200).json({ message: 'User demoted successfully' });
    } catch (error) {
        console.error('Error demoting user:', error);
        return res.status(500).json({ message: 'Failed to demote user' });
    }
};

// Controller to get all users
export const getUsers = async (req, res) => {
    try {
        // Retrieve users with specific fields
        const users = await User.find({}, 'userID name role email');
        return res.status(200).json({ users });
    } catch (error) {
        console.error('Error fetching users:', error);
        return res.status(500).json({ message: 'Failed to fetch users' });
    }
};

// Export the register and login controllers
export {
    registerUser,
    loginUser,
};
