import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import {mongoose} from 'mongoose';
import cookieParser from 'cookie-parser';

import cartRoutes from './routes/cartRoutes.js'
import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';

dotenv.config();

const port = 8000;
const app = express();


mongoose.connect(process.env.MONGO_URL)
.then(() => console.log('Database Connected'))
.catch((err) => console.log('Database not connected', err))

app.use(
  cors({
      credentials:true,
      origin:'http://localhost:5173'
  })
)
app.options('*', cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false}));
app.use('/api', authRoutes);
app.use('/api', productRoutes);
app.use('/api', cartRoutes);


app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});