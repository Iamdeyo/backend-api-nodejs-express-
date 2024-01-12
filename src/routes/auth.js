import express from 'express';
import { me, refreshToken, signIn, signUp } from '../controllers/auth.js';
import validateRequest from '../middlewares/validateRequest.js';
import { signInSchema, signUpSchema } from '../validators/auth.js';
import { verifyToken } from '../middlewares/authorization.js';

const authRouter = express.Router();

authRouter.post('/register', validateRequest(signUpSchema), signUp);
authRouter.post('/login', validateRequest(signInSchema), signIn);
authRouter.get('/me', verifyToken, me);
authRouter.get('/refresh-token', refreshToken);

export default authRouter;
