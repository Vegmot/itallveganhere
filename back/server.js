import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import orderRoute from './routes/orderRoute.js';
import postRoute from './routes/postRoute.js';
import premiumRoute from './routes/premiumRoute.js';
import productRoute from './routes/productRoute.js';
import profileRoute from './routes/profileRoute.js';
import userRoute from './routes/userRoute.js';

dotenv.config();
const app = express();

// mongoDB
connectDB();

// routes
app.use('/api/orders', orderRoute);
app.use('/api/posts', postRoute);
app.use('/api/premiums', premiumRoute);
app.use('/api/products', productRoute);
app.use('/api/profiles', profileRoute);
app.use('/api/users', userRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`.Server running on port ${PORT}.`));
