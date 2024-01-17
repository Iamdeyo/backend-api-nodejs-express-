import asyncWrapper from '../middlewares/asyncWrapper.js';
import response from '../utils/response.js';
import httpStatusCodes from '../utils/httpStatusCodes.js';
import User from '../model/user.js';
import CustomErrorHandler from '../errors/CustomErrorHandler.js';
import checkPermission from '../middlewares/checkPermission.js';

const getUser = asyncWrapper(async (req, res, next) => {
  const user = await User.findById(req.params.id).select('-password');
  //   await user.updateOne({ role: 'USER' });
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
const editUser = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;

  checkPermission(req.user, id, next);

  const user = await User.findByIdAndUpdate(id, req.body).select('-password');

  if (!user) {
    return next(
      new CustomErrorHandler('User not found', httpStatusCodes.NOT_FOUND),
    );
  }

  return response(res, httpStatusCodes.OK, true, 'user found', user);
});

const changePassword = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;
  const { oldPassword, password } = req.body;

  checkPermission(req.user, id, next);

  const user = await User.findById(id);
  if (!user) {
    return next(
      new CustomErrorHandler(
        "User doesn't exist or already deleted",
        httpStatusCodes.NOT_FOUND,
      ),
    );
  }

  const isPasswordMatch = await user.comparePassword(oldPassword);

  if (!isPasswordMatch) {
    return next(
      new CustomErrorHandler('Invaild Password', httpStatusCodes.NOT_FOUND),
    );
  }

  user.password = password;

  const updatedUser = await user.save();

  return response(
    res,
    httpStatusCodes.OK,
    true,
    'Password Changed',
    updatedUser,
  );
});

const uploadDisplayPhoto = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;

  checkPermission(req.user, id, next);

  if (!req.files) {
    return next(
      new CustomErrorHandler('No File Uploaded', httpStatusCodes.BAD_REQUEST),
    );
  }

  const user = await User.findByIdAndUpdate(id, {
    displayPhoto: req.files.displayPhoto,
  }).select('-password');

  if (!user) {
    return next(
      new CustomErrorHandler('User not found', httpStatusCodes.NOT_FOUND),
    );
  }

  return response(
    res,
    httpStatusCodes.OK,
    true,
    'Display Photo Uploaded',
    user,
  );
});

export {
  deleteAuser,
  getUser,
  getUsers,
  changePassword,
  editUser,
  uploadDisplayPhoto,
};
