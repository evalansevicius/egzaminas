import User from '../models/user.js';
import { hashPassword, comparePassword} from '../Helpers/auth.js';
import jwt from 'jsonwebtoken';
import { generateUserID } from '../Helpers/idgen.js';


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
        const user = await User.create({
            name,
            email,
            userID,
            password: hashedPassword,
            role: 'user'  // Assign the default role
        });

        // Return success response
        return res.status(200).json({
            message: 'User registered successfully',
            user
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Server error' });
    }
};


const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;  // Get email and password from the request body

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
            { id: user.userID, role: user.role },  // Use user.userID (custom userID) and role from the user document
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        // Return the token and user data in the response
        return res.status(200).json({
            message: 'Login successful',
            token,  // Return the generated JWT token
            user: {
                id: user.userID,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Server error' });
    }
};


export const promoteToAdmin = async (req, res) => {
  const { userID } = req.body;

  try {
    const user = await User.findOne({ userID });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.role = 'admin';
    await user.save();

    res.status(200).json({ success: true, message: 'User promoted to admin', user });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};


export {
    registerUser,
    loginUser,
}