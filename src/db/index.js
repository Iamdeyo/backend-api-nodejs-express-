/* eslint-disable no-console */
import { MongoClient } from 'mongodb';

const init = async () => {
  const uri = process.env.MONGODB_URI;

  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    await client.connect();
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};

const db = { init };

export default db;
