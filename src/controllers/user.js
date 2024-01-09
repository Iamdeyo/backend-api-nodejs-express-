import asyncWrapper from '../middlewares/asyncWrapper.js';
import response from '../utils/response.js';
import httpStatusCodes from '../utils/httpStatusCodes.js';
import User from '../model/user.js';
import CustomErrorHandler from '../errors/CustomErrorHandler.js';
import checkPermission from '../middlewares/checkPermission.js';

const getUser = asyncWrapper(async (req, res, next) => {
  const user = await User.findById(req.params.id).select('-password');
  await user.updateOne({ role: 'USER' });
  if (!user) {
    return next(
      new CustomErrorHandler('User not found', httpStatusCodes.NOT_FOUND),
    );
  }
  return response(res, httpStatusCodes.OK, true, 'user found', user);
});

const getUsers = asyncWrapper(async (req, res) => {
  const users = await User.find().select('-password');

  return response(res, httpStatusCodes.OK, true, 'user found', users);
});

const deleteAuser = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;

  checkPermission(req.user, id, next);

  const user = await User.findByIdAndDelete(id);
  if (!user) {
    return next(
      new CustomErrorHandler(
        "User doesn't exist or already deleted",
        httpStatusCodes.NOT_FOUND,
      ),
    );
  }

  return response(res, httpStatusCodes.OK, true, 'user deleted', user);
});

// edit a user
// update password

export { deleteAuser, getUser, getUsers };
