import asyncHandler from 'express-async-handler';
import Profile from '../models/profileModel.js';
import User from '../models/userModel.js';
import Post from '../models/postModel.js';
import Premium from '../models/premiumModel.js';
import normalize from 'normalize-url';

// GET logged in user's profile
// GET /api/profiles/myprofile
// private
const getMyProfile = asyncHandler(async (req, res) => {});

export { getMyProfile };
