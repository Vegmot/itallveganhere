import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import connectDB from './config/db.js';
import orderRoute from './routes/orderRoute.js';
import postRoute from './routes/postRoute.js';
import premiumRoute from './routes/premiumRoute.js';
import productRoute from './routes/productRoute.js';
import profileRoute from './routes/profileRoute.js';
import userRoute from './routes/userRoute.js';
import uploadRoute from './routes/uploadRoutes.js';

dotenv.config();
const app = express();

// mongoDB
connectDB();

// bodyParser
app.use(express.json());

// routes
app.use('/api/orders', orderRoute);
app.use('/api/posts', postRoute);
app.use('/api/premiums', premiumRoute);
app.use('/api/products', productRoute);
app.use('/api/profiles', profileRoute);
app.use('/api/users', userRoute);
app.use('/api/upload', uploadRoute);

// PayPal
app.get('/api/config/paypal', (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID);
});

// making uploads & build folder static
const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/front/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'front', 'build', 'index.html'));
  });
} else {
  app.get('/', (req, res) => {
    res.send('.API running.');
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`.Server running on port ${PORT}.`));
