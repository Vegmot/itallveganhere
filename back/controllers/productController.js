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

export { getAllProducts, getProductById };
