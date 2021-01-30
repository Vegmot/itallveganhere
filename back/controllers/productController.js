import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';

// Get all products
// GET /api/products
// public
const getAllProducts = asyncHandler(async (req, res) => {
  const itemsOnPage = 8;
  const page = Number(req.query.pageNumber) || 1;

  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i', // case insensitive
        },
      }
    : {};

  /* // Thank you Viktoras from Q&A!
  // use the next line in SearchBox.js
  const query = search
    ? {
        name: {
          $regex: search.replace(/[-[\]{}()*+?.,\\/^$|#\s]/g, '\\$&'),
          $options: 'i',
        },
      }
    : {}; */

  const count = await Product.countDocuments({ ...keyword });

  const products = await Product.find({ ...keyword })
    .limit(itemsOnPage)
    .skip(itemsOnPage * (page - 1));

  res.json({ products, page, pages: Math.ceil(count / itemsOnPage) });
});

// Get a product by id
// GET /api/products/:productId
// public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.productId);

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// Delete a product
// DELETE /api/products/:productId
// private_admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.productId);

  if (product) {
    await product.remove();
    res.json({ message: 'Successfully deleted the product' });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// Create a product
// POST /api/products
// private_admin
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: 'Sample name',
    price: 0.0,
    user: req.user._id,
    image: '/images/products/sample-fortune.jpg',
    brand: 'Sample brand',
    category: 'Sample category',
    countInStock: 10,
    numReviews: 0,
    description: 'Describe this',
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

// Update a product
// PUT /api/products/:productId
// private_admin
const updateProduct = asyncHandler(async (req, res) => {
  const {
    name,
    price,
    image,
    brand,
    category,
    countInStock,
    description,
  } = req.body;

  const product = await Product.findById(req.params.productId);

  if (product) {
    product.name = name;
    product.price = price;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;
    product.description = description;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// Write a product review
// POST /api/products/:productId/reviews
// private
const writeProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const product = await Product.findById(req.params.productId);

  if (product) {
    const alreadyReviewed = product.reviews.find(
      review => req.user._id.toString() === review.user.toString()
    );

    if (alreadyReviewed) {
      res.status(400);
      throw new Error('You have already reviewed this product');
    }

    const review = {
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    product.reviews.push(review);
    product.numReviews = product.reviews.length;
    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    await product.save();

    res.status(201).json({ message: 'Review added' });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// Get top products
// GET /api/products/top
// public
const getTopProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(5);

  res.json(products);
});

export {
  getAllProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  writeProductReview,
  getTopProducts,
};
