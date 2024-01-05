import express from 'express';

const app = express();

const port = 3000;

app.get('/', (req, res) => {
  res.send('Welcome to KodeCamp 30-Day Code Challenge! with express server');
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`listening at http://localhost:${port}`);
});
