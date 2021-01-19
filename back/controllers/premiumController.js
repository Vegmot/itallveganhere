import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import Premium from '../models/premiumModel.js';

// Get premium package item
// GET /api/premium
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

// Create a new premium package item
// POST /api/premium
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

// Delete a premium package item
// DELETE /api/premium/:premiumId
// private_admin
const deletePremiumPackage = asyncHandler(async (req, res) => {
  const premiumPackage = await Premium.findById(req.params.premiumId);

  if (premiumPackage) {
    await premiumPackage.remove();

    res.json({ message: 'Successfully deleted the package' });
  } else {
    res.status(404);
    throw new Error('Package(s) not found');
  }
});

// Update logged in user to Premium - admins can do this too and this is already in userController.js
// PUT /api/users/userInfo
// private
const setUserToPremium = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.isPremium = true;
    user.premiumAt = Date.now();
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

export {
  getPremiumPackages,
  createPremiumPackage,
  deletePremiumPackage,
  setUserToPremium,
};
