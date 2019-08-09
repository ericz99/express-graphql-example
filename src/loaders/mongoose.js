import mongoose from 'mongoose';
import config from '../config';

/**
 * Simple mongodb connection
 */
export default async () => {
  return await mongoose
    .connect(config.mongoUri, { useCreateIndex: true, useNewUrlParser: true })
    .then(console.log('Successfully created connection to database!'))
    .catch(e => console.log(e));
};
