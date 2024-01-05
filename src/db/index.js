/* eslint-disable no-console */
import mongoose from 'mongoose';

const init = async () => {
  const uri = process.env.MONGODB_URI;

  mongoose.connect(uri);

  const db = mongoose.connection;

  db.on('error', (err) => {
    console.error(`MongoDB connection error: ${err}`);
    process.exit(1);
  });

  db.once('open', () => {
    console.log('Connected to MongoDB');
  });
};

const db = { init };

export default db;
