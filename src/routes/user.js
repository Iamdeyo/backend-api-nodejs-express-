import express from 'express';
import { deleteAuser, getUser, getUsers } from '../controllers/user.js';
import { verifyToken } from '../middlewares/authorization.js';

const userRouter = express.Router();

userRouter.get('', getUsers);
userRouter.get('/:id', getUser);
userRouter.delete('/:id', verifyToken, deleteAuser);

export default userRouter;
