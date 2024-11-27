import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';

import adminRoutes from './routes/adminRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';
import checkoutRoutes from './routes/checkoutRoutes.js';

dotenv.config();

const port = 8000;
const app = express();

// Connect to MongoDB using the updated MONGO_URL from .env
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true, // Ensures modern connection parsing
    useUnifiedTopology: true, // Enables new server discovery and monitoring engine
})
    .then(() => console.log('Database Connected'))
    .catch((err) => console.log('Database not connected', err));

// Middleware
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173',
}));

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/api', authRoutes);
app.use('/api', adminRoutes);
app.use('/api', productRoutes);
app.use('/api', cartRoutes);
app.use('/api', checkoutRoutes);

// Start the server
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
