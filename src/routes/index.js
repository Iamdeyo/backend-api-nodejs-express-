import express from 'express';
import User from '../model/user.js';
import CustomErrorHandler from '../errors/CustomErrorHandler.js';
import validateRequest from '../middlewares/validateRequest.js';
import testSchema from '../validators/authvalidators.js';

const router = express.Router();

router.get('/create-user', async (req, res) => {
  try {
    const user = await User.create({
      username: 'John',
      email: `John${Math.random()}@example.com`,
      password: 'password',
    });

    res.status(201).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
});
router.get('/get-users', async (req, res) => {
  try {
    const users = await User.find();

    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
});

router.get('/test-error', () => {
  throw new CustomErrorHandler('Error Testing', 400);
});

router.all('/test-validator', validateRequest(testSchema), (req, res) => {
  return res.status(200).json({
    success: true,
  });
});

export default router;
