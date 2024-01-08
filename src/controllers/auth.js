import User from '../model/user.js';
import response from '../utils/response.js';
import httpStatusCodes from '../utils/httpStatusCodes.js';
import asyncWrapper from '../middlewares/asyncWrapper.js';

const signUp = asyncWrapper(async (req, res) => {
  const { username, email, password } = req.body;
  const user = await User.create({ username, email, password });
  return response(
    res,
    httpStatusCodes.CREATED,
    true,
    'User created successfully',
    user,
  );
});

const signIn = () => {};

export { signUp, signIn };
