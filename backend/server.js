const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv').config();
const { test } = require('./controllers/authControllers');
const {mongoose} = require('mongoose');
const cookieParser = require('cookie-parser');

const port = 8000;
const app = express();


mongoose.connect(process.env.MONGO_URL)
.then(() => console.log('Database Connected'))
.catch((err) => console.log('Database not connected', err))

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false}));
app.use('/api', require('./routes/authRoutes'))
app.use(cors());


app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});