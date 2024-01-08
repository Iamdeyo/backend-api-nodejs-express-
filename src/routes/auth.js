import express from 'express';
import { signIn, signUp } from '../controllers/auth.js';
import validateRequest from '../middlewares/validateRequest.js';
import { signUpSchema } from '../validators/auth.js';

const AuthRouter = express.Router();

AuthRouter.post('/register', validateRequest(signUpSchema), signUp);
AuthRouter.post('/login', signIn);

export default AuthRouter;
