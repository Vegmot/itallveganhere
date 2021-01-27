import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import Premium from '../models/premiumModel.js';

// Get all premium packages
// GET /api/premiums
// public
const getPremiumPackages = asyncHandler(async (req, res) => {
  const premiumPackages = await Premium.find({});
  if (premiumPackages) {
    res.json(premiumPackages);
  } else {
    res.status(404);
    throw new Error('Package(s) not found');
  }
});

// Get a premium package item
// GET /api/premiums/:premiumId
// public
const getPremiumPackageById = asyncHandler(async (req, res) => {
  const premiumPackage = await Premium.findById(req.params.premiumId);

  if (premiumPackage) {
    res.json(premiumPackage);
  } else {
    res.status(404);
    throw new Error('Package not found');
  }
});

// Create a new premium package item
// POST /api/premiums
// private_admin
const createPremiumPackage = asyncHandler(async (req, res) => {
  const { name, image, description, price } = req.body;
  const premiumPackage = new Premium({
    name,
    image,
    description,
    price,
  });

  const createdPackage = await premiumPackage.save();
  res.json(createdPackage);
});

// Update a premium package
// PUT /api/premiums/:premiumId
// private_admin
const updatePremiumPackage = asyncHandler(async (req, res) => {
  const { name, image, description, price } = req.body;
  const premiumPackage = await Premium.findById(req.params.premiumId);

  if (premiumPackage) {
    premiumPackage.name = premiumPackage.name || name;
    premiumPackage.image = premiumPackage.image || image;
    premiumPackage.description = premiumPackage.description || description;
    premiumPackage.price = premiumPackage.price || price;

    const updatedPremiumPackage = await premiumPackage.save();
    res.json(updatedPremiumPackage);
  } else {
    res.status(404);
    throw new Error('Package not found');
  }
});

// Delete a premium package item
// DELETE /api/premiums/:premiumId
// private_admin
const deletePremiumPackage = asyncHandler(async (req, res) => {
  const premiumPackage = await Premium.findById(req.params.premiumId);

  if (premiumPackage) {
    await premiumPackage.remove();

    res.json({ message: 'Successfully deleted the package' });
  } else {
    res.status(404);
    throw new Error('Package not found');
  }
});

export {
  getPremiumPackages,
  getPremiumPackageById,
  createPremiumPackage,
  updatePremiumPackage,
  deletePremiumPackage,
};
