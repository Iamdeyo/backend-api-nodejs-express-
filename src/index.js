import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import { xss } from 'express-xss-sanitizer';
import helmet from 'helmet';
import cors from 'cors';
import router from './routes/index.js';
import db from './db/index.js';
import { errorHandler, notFound } from './errors/index.js';

const app = express();
dotenv.config();
db.init();

const port = process.env.PORT || 3000;

/**
 *  Application Level Middleware
 */
app.use(morgan('dev'));
app.use(
  cors({
    origin: '*',
  }),
);
app.use(xss());
app.use(helmet());
app.use(express.json());

app.use(router);
app.get('/', (req, res) => {
  res.send('Welcome to KodeCamp 30-Day Code Challenge! with express server');
});

/**
 * Error handler
 */
app.use(errorHandler);
app.use(notFound);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`listening at http://localhost:${port}`);
});
