import express from 'express';
import { signIn, signUp } from '../controllers/auth.js';
import validateRequest from '../middlewares/validateRequest.js';
import { signInSchema, signUpSchema } from '../validators/auth.js';

const authRouter = express.Router();

authRouter.post('/register', validateRequest(signUpSchema), signUp);
authRouter.post('/login', validateRequest(signInSchema), signIn);

export default authRouter;
