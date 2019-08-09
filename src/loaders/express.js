import cors from 'cors';
import helmet from 'helmet';

/**
 * Your express configuration should be in the file
 */
export default async app => {
  // for heroku and other cloud based service
  app.enable('trust proxy');
  app.use(cors());
  app.use(helmet());
};
