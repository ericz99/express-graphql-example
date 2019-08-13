import jwt from 'jsonwebtoken';
import { AuthenticationError } from 'apollo-server-express';

export const checkReqAuthToken = async (req, secretKey) => {
  const authToken = req.headers['x-auth-token'];
  // check if token exist
  if (authToken) {
    const token = authToken.substring(7);

    try {
      // validate token
      return await jwt.verify(token, secretKey);
    } catch (e) {
      if (e) {
        // only throw if session expired
        throw new AuthenticationError('Your session expired. Please sign in again!');
      }
    }
  }
};

export const checkAuthToken = async (token, secretKey) => {
  const authToken = token.substring(7);
  try {
    // validate token
    return await jwt.verify(authToken, secretKey);
  } catch (e) {
    if (e) {
      // only throw if session expired
      throw new AuthenticationError('Your session expired. Please sign in again!');
    }
  }
};
