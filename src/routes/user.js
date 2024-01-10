import express from 'express';
import {
  changePassword,
  deleteAuser,
  editUser,
  getUser,
  getUsers,
} from '../controllers/user.js';
import { verifyToken } from '../middlewares/authorization.js';
import validateRequest from '../middlewares/validateRequest.js';
import { changePasswordSchema, editUserSchema } from '../validators/user.js';

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

export default userRouter;
