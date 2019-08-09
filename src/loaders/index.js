import mongooseLoader from './mongoose';
import expressLoader from './express';

/**
 * This is where you should load all your loader together
 */
export default async app => {
  await mongooseLoader();
  await expressLoader(app);
};
