import User from '../model/user.js';
import CustomErrorHandler from '../errors/CustomErrorHandler.js';

const signUp = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = await User.create({ username, email, password });
    return res.status(201).json({ user });
  } catch (error) {
    throw new CustomErrorHandler(error.message, 401);
  }
};

const signIn = () => {};

export { signUp, signIn };
