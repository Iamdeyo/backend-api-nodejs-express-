import express from 'express';

const router = express.Router();

router.all('/test-route', (req, res) => {
  res.send('test-route is available');
});

export default router;
