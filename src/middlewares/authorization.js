import jwt from 'jsonwebtoken';
import User from '../model/user.js';
import asyncWrapper from './asyncWrapper.js';
import CustomErrorHandler from '../errors/CustomErrorHandler.js';
import httpStatusCodes from '../utils/httpStatusCodes.js';

const verifyToken = asyncWrapper(async (req, res, next) => {
  const headers = req.headers.authorization;

  if (!headers || !headers.startsWith('Bearer')) {
    return next(
      new CustomErrorHandler(
        'Unauthorized: No Token',
        httpStatusCodes.UNAUTHORIZED,
      ),
    );
  }
  const token = headers.split(' ')[1];
  const user = jwt.verify(token, 'token_secret');

  req.user = await User.findById(user.id).select('-password');

  if (!req.user) {
    return next(
      new CustomErrorHandler(
        "Unauthorized: User doesn't exist",
        httpStatusCodes.UNAUTHORIZED,
      ),
    );
  }

  return next();
});

// eslint-disable-next-line import/prefer-default-export
export { verifyToken };
