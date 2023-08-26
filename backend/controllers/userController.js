import ErrorResponse from '../utils/errorResponse.js';
import asyncHandler from '../middleware/async.js';
import generateToken from '../utils/generateToken.js';
import User from '../models/userModel.js';

// @desc Auth user & get token
// @routes POST /api/users/login
// @access Public
const authUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    return next(new ErrorResponse('Invalid email or password', 401));
  }
});

// @desc Register a new user
// @routes POST /api/users
// @access Public
const registerUser = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    return next(new ErrorResponse('User already exists', 400));
  }

  const user = await User.create({
    name,
    email,
    password,
    image: '/images/sample-user.png',
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    return next(new ErrorResponse('Invalid user data', 400));
  }
});

// @desc Get user profile
// @routes POST /api/users/profile
// @access Public
const getUserProfile = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      phoneNumber: user.phoneNumber,
      image: user.image,
      location: user.location,
      summary: user.summary,
      website: user.website,
      github: user.github,
      linkedin: user.linkedin,
    });
  } else {
    return next(new ErrorResponse('User not found', 404));
  }
});

// @desc Update user profile
// @routes PUT /api/users/profile
// @access Public
const updateUserProfile = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.image = req.body.image || user.image;
    user.phoneNumber = req.body.phoneNumber || user.phoneNumber;
    user.location = req.body.location || user.location;
    user.summary = req.body.summary || user.summary;
    user.website = req.body.website || user.website;
    user.github = req.body.github || user.github;
    user.linkedin = req.body.linkedin || user.linkedin;
    if (req.body.password) {
      user.password = req.body.password;
    }
    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      phoneNumber: updatedUser.phoneNumber,
      image: updatedUser.image,
      location: updatedUser.location,
      summary: updatedUser.summary,
      website: updatedUser.website,
      github: updatedUser.github,
      linkedin: updatedUser.linkedin,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    });
  } else {
    return next(new ErrorResponse('User not found', 404));
  }
});

// @desc Get all users
// @routes GET /api/users
// @access Private/Admin
const getUsers = asyncHandler(async (req, res, next) => {
  const users = await User.find({});
  res.json(users);
});

// @desc Delete user
// @routes DELETE /api/users/:id
// @access Private/Admin
const deleteUser = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.params.id);

  if (user) {
    res.json({ message: 'User removed' });
  } else {
    return next(new ErrorResponse('User not found', 404));
  }
});

// @desc Get user by ID
// @routes GET /api/users/:id
// @access Private/Admin
const getUserById = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id).select('-password');
  if (user) {
    res.json(user);
  } else {
    return next(new ErrorResponse('User not found', 404));
  }
});

// @desc Update user
// @routes PUT /api/users/:id
// @access Private/Admin
const updateUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.phoneNumber = req.body.phoneNumber || user.phoneNumber;
    user.image = req.body.image || user.image;
    user.location = req.body.location || user.location;
    user.summary = req.body.summary || user.summary;
    user.website = req.body.website || user.website;
    user.github = req.body.github || user.github;
    user.linkedin = req.body.linkedin || user.linkedin;
    user.isAdmin = req.body.isAdmin ?? user.isAdmin;

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      phoneNumber: updatedUser.phoneNumber,
      image: updatedUser.image,
      location: updatedUser.location,
      summary: updatedUser.summary,
      website: updatedUser.website,
      github: updatedUser.github,
      linkedin: updatedUser.linkedin,
      isAdmin: updatedUser.isAdmin,
      // token: generateToken(updatedUser._id),
    });
  } else {
    return next(new ErrorResponse('User not found', 404));
  }
});

export {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
};
