import express from 'express';
import {
  changePassword,
  deleteAuser,
  editUser,
  getUser,
  getUsers,
  uploadDisplayPhoto,
} from '../controllers/user.js';
import { verifyToken } from '../middlewares/authorization.js';
import validateRequest from '../middlewares/validateRequest.js';
import { changePasswordSchema, editUserSchema } from '../validators/user.js';
import { uploadPhoto } from '../middlewares/fileUploads.js';

const userRouter = express.Router();

userRouter.get('', getUsers);
userRouter.get('/:id', getUser);
userRouter.patch(
  '/:id',
  verifyToken,
  validateRequest(editUserSchema),
  editUser,
);
userRouter.delete('/:id', verifyToken, deleteAuser);
userRouter.patch(
  '/:id/change-password',
  verifyToken,
  validateRequest(changePasswordSchema),
  changePassword,
);
userRouter.patch(
  '/:id/upload-photo',
  verifyToken,
  uploadPhoto,
  uploadDisplayPhoto,
);

export default userRouter;
