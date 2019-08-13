import dotenv from 'dotenv';

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config();
if (!envFound) {
  // This error should crash whole process
  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

export const IN_PROD = process.env.NODE_ENV === 'production';

export default {
  port: parseInt(process.env.PORT, 10),
  mongoUri: process.env.MONGO_URI,
  secretKey: process.env.SECRET_KEY,
  sessionLifetime: 1000 * 60 * 60 * 2,
  sessionName: 'sid_',
  sessionSecret: process.env.SESS_SECRET,
  redisPort: process.env.REDIS_PORT,
  redisHost: process.env.REDIS_HOST,
  redisPass: process.env.REDIS_PASS,
  ownerKey: process.env.OWNER_KEY,
  api: {
    prefix: '/graphql'
  }
};
