import User from '../model/user.js';
import response from '../utils/response.js';
import httpStatusCodes from '../utils/httpStatusCodes.js';
import asyncWrapper from '../middlewares/asyncWrapper.js';
import CustomErrorHandler from '../errors/CustomErrorHandler.js';
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from '../utils/jwtUtils.js';

const signUp = asyncWrapper(async (req, res) => {
  // const { username, email, password, firstName, lastName } = req.body;
  // console.log(req.body);
  await User.create(req.body);
  return response(
    res,
    httpStatusCodes.CREATED,
    true,
    'User created successfully',
  );
});

const signIn = asyncWrapper(async (req, res, next) => {
  const { username, email, password } = req.body;

  const user = await User.findOne({ $or: [{ username }, { email }] });

  if (!user) {
    return next(
      new CustomErrorHandler(
        'Username or Email does not exist',
        httpStatusCodes.NOT_FOUND,
      ),
    );
  }

  const isPasswordMatch = await user.comparePassword(password);

  if (!isPasswordMatch) {
    return next(
      new CustomErrorHandler('Invaild Password', httpStatusCodes.NOT_FOUND),
    );
  }

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  req.session.token = refreshToken;

  return response(res, httpStatusCodes.OK, true, 'Login successful', {
    accessToken,
  });
});

const me = asyncWrapper(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    return next(
      new CustomErrorHandler('User not found', httpStatusCodes.NOT_FOUND),
    );
  }

  return response(res, httpStatusCodes.OK, true, 'Current User Found', user);
});

const refreshToken = asyncWrapper(async (req, res, next) => {
  const theRefreshToken = req.session.token;

  if (!theRefreshToken) {
    return next(
      new CustomErrorHandler(
        'Unauthorized: No Token',
        httpStatusCodes.UNAUTHORIZED,
      ),
    );
  }

  const decodedUser = verifyRefreshToken(theRefreshToken);
  // Create a new access token with a new expiration time
  const accessToken = generateAccessToken(decodedUser);

  return response(res, httpStatusCodes.OK, true, 'Access Token generated', {
    accessToken,
  });
});

export { signUp, signIn, me, refreshToken };
