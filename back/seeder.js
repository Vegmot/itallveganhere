import dotenv from 'dotenv';
import users from './data/users.js';
import products from './data/products.js';
import premiumPackages from './data/premiumPackages.js';
import User from './models/userModel.js';
import Premium from './models/premiumModel.js';
import Product from './models/productModel.js';
import Order from './models/orderModel.js';
import connectDB from './config/db.js';

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await Order.deleteMany();
    await Premium.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    const createdUsers = await User.insertMany(users);

    const adminUser = createdUsers[0]._id;

    const sampleProducts = products.map(product => {
      return { ...product, user: adminUser };
    });
    const samplePremiumPackages = premiumPackages.map(premiumPackage => {
      return { ...premiumPackage };
    });

    await Premium.insertMany(samplePremiumPackages);
    await Product.insertMany(sampleProducts);

    console.log('Successfully imported data');
    process.exit();
  } catch (error) {
    console.log('Failed to import data');
    process.exit(1);
  }
};

const removeData = async () => {
  try {
    await Order.deleteMany();
    await Premium.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log('Successfully removed data');
    process.exit();
  } catch (error) {
    console.log('Failed to remove data');
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  removeData();
} else {
  importData();
}
