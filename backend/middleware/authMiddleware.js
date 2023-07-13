import jwt from 'jsonwebtoken';
import asyncHandler from './async.js';
import User from '../models/userModel.js';
import ErrorResponse from '../utils/errorResponse.js';

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // remove user's password
      req.user = await User.findById(decoded.id).select('-password');

      next();
    } catch (error) {
      return next(new ErrorResponse('Not authorized, token failed', 401));
    }
  }
});

const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    return next(new ErrorResponse('Not authorized as an admin', 401));
  }
};

export { protect, admin };
