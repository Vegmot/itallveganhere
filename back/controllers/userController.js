import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
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
  const user = await User.findById(req.params._id);

  if (user) {
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

export {
  authUser,
  registerUser,
  getUserInfo,
  updateUserInfo,
  getAllUsers,
  deleteUser,
  getUserById,
  adminUpdateUserInfo,
};
