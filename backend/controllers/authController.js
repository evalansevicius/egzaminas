import User from '../models/user.js';
import { hashPassword, comparePassword} from '../Helpers/auth.js';
import jwt from 'jsonwebtoken';
import { generateUserID } from '../Helpers/idgen.js';


const registerUser = async (req, res) => {
    const {name, email, password} = req.body;
    try {
        console.log(name, email, password);

        if(!name ||!email) {
            return res.status(400).json({ message: 'Please fill all fields' });
        };

        if(!password) {
            return res.status(400).json({
                error:'Password is too short and required'
            })
        };
        const exist = await User.findOne({ email});
        if (exist) {
            return res.status(400).json({ message: 'Email already exists' });
        }
        const hashedPassword = await hashPassword(password)

        const userID = await generateUserID();

        const user = await User.create({
            name, email, userID,
            password:hashedPassword
        })
        return res.status(200).json({
            message: 'User registered successfully',
            user
        })
    } catch (error) {
        console.log(error)
    }
}


const loginUser = async (req, res) => {
    try {
        const{email, password} = req.body;

        const user = await User.findOne({email});
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const valid = await comparePassword(password, user.password);
        
        if (!valid) {
            return res.status(400).json({ message: 'Invalid password' });
        }
        
        jwt.sign({ email: user.email, id:user.id, userID:user.userID, password: user.password}, process.env.JWT_SECRET, {}, (err, token) => {
            if(err) throw err;
            res.cookie('token', token).json(user)
        })
    } catch (error) {
        console.log(error)
    }
}

export {
    registerUser,
    loginUser
}