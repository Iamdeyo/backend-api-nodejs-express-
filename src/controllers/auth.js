import jwt from 'jsonwebtoken';
import User from '../model/user.js';
import response from '../utils/response.js';
import httpStatusCodes from '../utils/httpStatusCodes.js';
import asyncWrapper from '../middlewares/asyncWrapper.js';
import CustomErrorHandler from '../errors/CustomErrorHandler.js';

const signUp = asyncWrapper(async (req, res) => {
  // const { username, email, password, firstName, lastName } = req.body;
  // console.log(req.body);
  const user = await User.create(req.body);
  return response(
    res,
    httpStatusCodes.CREATED,
    true,
    'User created successfully',
    user,
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

  const token = jwt.sign(
    { id: user.id, username: user.username },
    'token_secret',
  );

  return response(res, httpStatusCodes.OK, true, 'Login successful', {
    user,
    token,
  });
});

export { signUp, signIn };
