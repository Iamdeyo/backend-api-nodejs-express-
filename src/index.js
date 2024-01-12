import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import { xss } from 'express-xss-sanitizer';
import helmet from 'helmet';
import cors from 'cors';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import router from './routes/index.js';
import db from './db/index.js';
import { errorHandler, notFound } from './errors/index.js';

dotenv.config();
const app = express();
db.init();

const { PORT, SESSION_SECRET, MONGODB_URI } = process.env;

const port = PORT || 3000;

/**
 * Sessions
 */
const mongoSessionStore = MongoStore.create({
  mongoUrl: MONGODB_URI,
  collectionName: '_session',
});

const sessionMiddleware = session({
  name: '30_days_challenge_session',
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false, maxAge: 1000 * 60 * 60 * 24 },
  store: mongoSessionStore,
});

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
app.use(sessionMiddleware);
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
