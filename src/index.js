import express from 'express';
import router from './routes/index.js';

const app = express();

const port = 3000;

app.use(router);
app.get('/', (req, res) => {
  res.send('Welcome to KodeCamp 30-Day Code Challenge! with express server');
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`listening at http://localhost:${port}`);
});
