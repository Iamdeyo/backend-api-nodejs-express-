import User from '../model/user.js';
import CustomErrorHandler from '../errors/CustomErrorHandler.js';
import response from '../utils/response.js';
import httpStatusCodes from '../utils/httpStatusCodes.js';

const signUp = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = await User.create({ username, email, password });
    return response(
      res,
      httpStatusCodes.CREATED,
      true,
      'User created successfully',
      user,
    );
  } catch (error) {
    console.log(error);
    throw new CustomErrorHandler(error.message, httpStatusCodes.BAD_REQUEST);
  }
};

const signIn = () => {};

export { signUp, signIn };
