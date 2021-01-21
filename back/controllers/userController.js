import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import Profile from '../models/profileModel.js';
import Order from '../models/orderModel.js';
import generateToken from '../utils/generateToken.js';

// Authenticate user and get logged in
// POST /api/users/login
// public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      isAdmin: user.isAdmin,
      isPremium: user.isPremium,
      premiumAt: user.premiumAt && user.premiumAt,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

// Register a new user
// POST /api/users/register
// public
const registerUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  const user = await User.create({
    firstName:
      firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase(),
    lastName:
      lastName.charAt(0).toUpperCase() + lastName.slice(1).toLowerCase(),
    email,
    password,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      isAdmin: user.isAdmin,
      isPremium: user.isPremium,
      premiumAt: user.premiumAt && user.premiumAt,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// Get a user's info
// GET /api/users/userInfo
// private
const getUserInfo = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      isAdmin: user.isAdmin,
      isPremium: user.isPremium,
      premiumAt: user.premiumAt && user.premiumAt,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// Update user info (self)
// PUT /api/users/userInfo
// private
const updateUserInfo = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.firstName =
      req.body.firstName.charAt(0).toUpperCase() +
        req.body.firstName.slice(1).toLowerCase() || user.firstName;
    user.lastName =
      req.body.lastName.charAt(0).toUpperCase() +
        req.body.lastName.slice(1).toLowerCase() || user.lastName;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }

    await user.save();

    res.json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      isAdmin: user.isAdmin,
      isPremium: user.isPremium,
      premiumAt: user.premiumAt && user.premiumAt,
      token: generateToken(user._id),
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// Get all users' info
// GET /api/users
// private_admin
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

// Delete a user
// DELETE /api/users/:userId
// private / private_admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.userId);
  const order = await Order.findOne({ user: req.params.userId });
  const profile = await Profile.findOne({ user: req.params.userId });
  // reset avatar first
  await User.findOneAndUpdate(
    { _id: req.params.userId },
    {
      avatar:
        'https://gravatar.com/avatar/a9a5b0968dbea215c3fc8dd56c0234a5?d=mm&r=pg&s=200',
    },
    { new: true }
  );

  if (user) {
    // I would rather leave posts and comments, even if the user gets deleted
    // and display the user's name as like (Deleted User)
    if (order) await order.remove();
    if (profile) await profile.remove();
    await user.remove();
    res.json({ message: 'Successfully deleted the user' });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// Get a user by id
// GET /api/users/:userId
// private_admin
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params._id).select('-password');

  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// Update user's info (admin)
// PUT /api/users/:userId/userInfo
// private_admin
const adminUpdateUserInfo = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params._id);

  if (user) {
    user.firstName =
      req.body.firstName.charAt(0).toUpperCase() +
        req.body.firstName.slice(1).toLowerCase() || user.firstName;
    user.lastName =
      req.body.lastName.charAt(0).toUpperCase() +
        req.body.lastName.slice(1).toLowerCase() || user.lastName;
    user.email = req.body.email || user.email;
    user.isAdmin = req.body.isAdmin || user.isAdmin;
    user.isPremium = req.body.isPremium || user.isPremium;

    await user.save();

    res.json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      isAdmin: user.isAdmin,
      isPremium: user.isPremium,
      premiumAt: user.premiumAt && user.premiumAt,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// Update logged in user to Premium
// PUT /api/users/userInfo/premium
// private
const setUserToPremium = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.isPremium = true;
    user.premiumAt = Date.now();

    const updatedPremiumUser = await user.save();
    res.json(updatedPremiumUser);
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// Cancel logged in user's premium service
// PUT /api/users/userInfo/unpremium
// private
const cancelUserPremium = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.isPremium = false;
    user.cancelPremiumAt = Date.now();

    const updatedPremiumUser = await user.save();
    res.json(updatedPremiumUser);
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// Update a user to Premium
// PUT /api/users/:userId/premium
// private_admin
const adminSetUserToPremium = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params._id);

  if (user) {
    user.isPremium = true;
    user.premiumAt = Date.now();

    const updatedPremiumUser = await user.save();
    res.json(updatedPremiumUser);
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// Cancel a user's premium service
// PUT /api/users/:userId/unpremium
// private_admin
const adminCancelUserPremium = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params._id);

  if (user) {
    user.isPremium = false;
    user.cancelPremiumAt = Date.now();

    const updatedPremiumUser = await user.save();
    res.json(updatedPremiumUser);
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

export {
  authUser,
  registerUser,
  getUserInfo,
  updateUserInfo,
  getAllUsers,
  deleteUser,
  getUserById,
  adminUpdateUserInfo,
  setUserToPremium,
  cancelUserPremium,
  adminSetUserToPremium,
  adminCancelUserPremium,
};
