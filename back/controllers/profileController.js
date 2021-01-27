import asyncHandler from 'express-async-handler';
import Profile from '../models/profileModel.js';
import normalize from 'normalize-url';

// GET logged in user's profile
// GET /api/profiles/myprofile
// private
const getMyProfile = asyncHandler(async (req, res) => {
  const profile = await Profile.findOne({ user: req.user._id });

  if (profile) {
    res.json(profile);
  } else {
    res.status(404);
    throw new Error('Profile not found');
  }
});

// Create user's profile
// POST /api/profiles
// private
const createProfile = asyncHandler(async (req, res) => {
  const {
    website,
    city,
    state,
    status,
    favourites,
    bio,
    youtube,
    instagram,
    facebook,
    twitter,
    linkedin,
  } = req.body;

  const profile = new Profile({
    user: req.user._id,
    website:
      website && website !== '' ? normalize(website, { forceHttps: true }) : '',
    city:
      city && city !== ''
        ? city
            .toLowerCase()
            .split(' ')
            .map(c => c.charAt(0).toUpperCase() + c.substring(1))
            .join(' ')
        : '',
    state,
    status,
    favourites: Array.isArray(favourites)
      ? favourites
      : favourites.split(',').map(fav => fav.trim()),
    bio,
  });

  const socialFields = { youtube, instagram, facebook, twitter, linkedin };

  for (const [key, value] of Object.entries(socialFields)) {
    if (value && value.length > 0) {
      socialFields[key] = normalize(value, { forceHttps: true });
    }
  }

  profile.social = socialFields;

  const newProfile = await profile.save();
  res.json(newProfile);
});

// Update user's profile
// PUT /api/profiles/:userId
// private
const updateProfile = asyncHandler(async (req, res) => {
  const { website, city, state, status, favourites, bio } = req.body;

  const profile = await Profile.findOne({ user: req.params.userId });

  if (profile) {
    profile.website =
      website && website !== ''
        ? normalize(website, { forceHttps: true })
        : '' || profile.website;
    profile.city =
      city && city !== ''
        ? city
            .toLowerCase()
            .split(' ')
            .map(c => c.charAt(0).toUpperCase() + c.substring(1))
            .join(' ')
        : '' || profile.city;
    profile.state = state || profile.state;
    profile.status = status || profile.status;
    profile.favourites = Array.isArray(favourites)
      ? favourites
      : favourites.split(',').map(fav => fav.trim()) || profile.favourites;
    profile.bio = bio || profile.bio;

    const socialFields = { youtube, instagram, facebook, twitter, linkedin };

    for (const [key, value] of Object.entries(socialFields)) {
      if (value && value.length > 0) {
        socialFields[key] = normalize(value, { forceHttps: true });
      }
    }

    profile.social = socialFields;

    const updatedProfileItem = await profile.save();
    res.json(updatedProfileItem);
  } else {
    res.status(404);
    throw new Error("Either user doesn't exist, or profile not found");
  }
});

// Get all profiles
// GET /api/profiles
// public
const getAllProfiles = asyncHandler(async (req, res) => {
  const profiles = await Profile.find({});
  if (profiles) {
    res.json(profiles);
  } else {
    res.status(404);
    throw new Error('Profile(s) not found');
  }
});

// Delete a profile
// DELETE /api/profiles/:userId
// private
const deleteProfile = asyncHandler(async (req, res) => {
  const profile = await Profile.findOne({ user: req.params.userId });
  if (profile) {
    await profile.remove();
    res.json({ message: 'Successfully deleted the profile' });
  } else {
    res.status(404);
    throw new Error('Profile not found');
  }
});

// Get a user's profile by id
// GET /api/profiles/:userId
// public
const getProfileById = asyncHandler(async (req, res) => {
  const profile = await Profile.findOne({ user: req.params.userId }).populate(
    'User',
    'firstName lastName email avatar'
  );

  if (profile) {
    res.json(profile);
  } else {
    res.status(404);
    throw new Error('Profile not found');
  }
});

// Add experience to user's profile
// PUT /api/profiles/:userId/experience
// private
const addExperience = asyncHandler(async (req, res) => {
  const {
    title,
    company,
    city,
    state,
    from,
    to,
    current,
    description,
  } = req.body;

  const profile = await Profile.findOne({ user: req.params.userId });

  const newExp = {
    title: title
      .toLowerCase()
      .split(' ')
      .map(c => c.charAt(0).toUpperCase() + c.substring(1))
      .join(' '),
    company: company
      .toLowerCase()
      .split(' ')
      .map(c => c.charAt(0).toUpperCase() + c.substring(1))
      .join(' '),
    city: city
      .toLowerCase()
      .split(' ')
      .map(c => c.charAt(0).toUpperCase() + c.substring(1))
      .join(' '),
    state,
    from,
    to,
    current,
    description,
  };

  profile.experience.unshift(newExp);
  await profile.save();
  res.status(200).json(profile);
});

// Add education to user's profile
// PUT /api/profiles/:userId/education
// private
const addEducation = asyncHandler(async (req, res) => {
  const {
    school,
    degree,
    fieldofstudy,
    from,
    to,
    current,
    description,
  } = req.body;

  const profile = await Profile.findOne({ user: req.params.userId });

  const newEdu = {
    school: school
      .toLowerCase()
      .split(' ')
      .map(c => c.charAt(0).toUpperCase() + c.substring(1))
      .join(' '),
    degree,
    fieldofstudy: fieldofstudy
      .toLowerCase()
      .split(' ')
      .map(c => c.charAt(0).toUpperCase() + c.substring(1))
      .join(' '),
    from,
    to,
    current,
    description,
  };

  profile.education.unshift(newEdu);
  await profile.save();
  res.status(200).json(profile);
});

// Delete experience from user's profile
// DELETE /api/profiles/:userId/experience/:expId
// private
const deleteExperience = asyncHandler(async (req, res) => {
  const foundProfile = await Profile.findOne({ user: req.params.userId });

  foundProfile.experience = foundProfile.experience.filter(
    exp => exp._id.toString() !== req.params.expId
  );

  await foundProfile.save();
  res.status(200).json(foundProfile);
});

// Delete education from user's profile
// DELETE /api/profiles/:userId/education/:eduId
// private
const deleteEducation = asyncHandler(async (req, res) => {
  const foundProfile = await Profile.findOne({ user: req.params.userId });

  foundProfile.education = foundProfile.education.filter(
    edu => edu._id.toString() !== req.params.eduId
  );

  await foundProfile.save();
  res.status(200).json(foundProfile);
});

export {
  getMyProfile,
  createProfile,
  updateProfile,
  getAllProfiles,
  deleteProfile,
  getProfileById,
  addExperience,
  addEducation,
  deleteExperience,
  deleteEducation,
};
