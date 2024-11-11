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

    const { email, password } = req.body; 
    
    try {
        
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
            { expiresIn: '1h' }
        );


        return res.status(200).json({
            message: 'Login successful',
            token,  
            user: {
                userID: user.userID,
                name: user.name,
                email: user.email,
                role: user.role
            },
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Server error' });
    }
};


export const promoteToAdmin = async (req, res) => {
    try {
      const { userID } = req.body;
  
      // Find the target user
      const targetUser = await User.findOne({ userID });
      if (!targetUser) {
        return res.status(404).json({ message: "User not found" });
      }
  
      // If the target user is a superadmin, only allow another superadmin to promote
      if (targetUser.role === 'superadmin' && req.user.role !== 'superadmin') {
        return res.status(403).json({ message: "Only superadmins can promote or demote other superadmins." });
      }
  
      // Promote the user to admin
      targetUser.role = 'admin';
      await targetUser.save();
  
      res.status(200).json({ message: "User promoted to admin successfully" });
    } catch (error) {
      console.error("Error promoting user:", error);
      res.status(500).json({ message: "Failed to promote user" });
    }
  };
  
  export const demoteFromAdmin = async (req, res) => {
    try {
      const { userID } = req.body;
  
      // Find the target user
      const targetUser = await User.findOne({ userID });
      if (!targetUser) {
        return res.status(404).json({ message: "User not found" });
      }
  
      // If the target user is a superadmin, only allow another superadmin to demote
      if (targetUser.role === 'superadmin' && req.user.role !== 'superadmin') {
        return res.status(403).json({ message: "Only superadmins can promote or demote other superadmins." });
      }
  
      // Demote the user from admin to user
      targetUser.role = 'user';
      await targetUser.save();
  
      res.status(200).json({ message: "User demoted successfully" });
    } catch (error) {
      console.error("Error demoting user:", error);
      res.status(500).json({ message: "Failed to demote user" });
    }
  };

  export const getUsers = async (req, res) => {
    try {
      const users = await User.find({}, 'userID name role email'); 
      res.status(200).json({ users });
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch users' });
    }
  };
  

export {
    registerUser,
    loginUser,
}