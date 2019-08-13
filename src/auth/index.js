import jwt from 'jsonwebtoken';
import { AuthenticationError } from 'apollo-server-express';

import { User } from '../models';
import config from '../config';

export const attemptSignIn = async ({ email, password }) => {
  const message = 'Incorrect email or password. Please try again.';
  const user = await User.findOne({ email });

  if (!user || !(await user.comparePassword(password))) {
    throw new AuthenticationError(message);
  }

  // create payload for user
  const payload = {
    _id: user._id,
    userid: user.userid,
    userName: user.userName,
    email,
    role: user.role
  };

  // sign the token
  const token = await jwt.sign(payload, config.secretKey, { expiresIn: '30m' });
  return {
    token: 'Bearer ' + token
  };
};

export const checkOwnerKey = async ownerKey => {
  if (config.ownerKey !== ownerKey) {
    throw new AuthenticationError('Owner token does not exist!');
  }
};

const isSignedIn = req => req.headers['x-auth-token'];

// Ensure user has token in header in order to proceed with stuff
export const ensureSignedIn = req => {
  if (!isSignedIn(req)) {
    throw new AuthenticationError('No token, authorization denied!');
  }
};

export const ensureSignedOut = async req => {
  if (isSignedIn(req)) {
    throw new AuthenticationError('Already signed in!');
  }
};
