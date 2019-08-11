import Joi from '@hapi/joi';
import jwt from 'jsonwebtoken';
import shortid from 'shortid';
import { AuthenticationError, ForbiddenError, UserInputError } from 'apollo-server-express';
import { Key, User } from '../../models';
import { signUp, signIn } from '../../schemas';
import config from '../../config';

export default {
  Query: {
    // get one user
    getOneUser: (root, { userID }, context, info) => {
      return User.findOne({ userID })
        .populate('key')
        .exec();
    },
    // get all user
    getAllUser: (root, args, context, info) => {
      return User.find({})
        .sort({ createdAt: -1 })
        .exec();
    },
    // return current user
    me: (root, args, { me: { _id } }, info) => {
      return User.findById({ _id })
        .populate('key')
        .exec();
    }
  },
  Mutation: {
    // Create new user
    registerUser: async (root, args, context, info) => {
      const userID = 'userid_' + shortid.generate();
      // validate schema
      await Joi.validate(args, signUp, { abortEarly: false });
      // create user
      return await User.create({ userID, ...args });
    },
    // Login user
    loginUser: async (root, args, context, info) => {
      let tokenInitial = 'Bearer ';
      // validate schema
      await Joi.validate(args, signIn, { abortEarly: false });
      // find user
      const user = await User.findOne({ email: args.email });
      // if no user
      if (!user) {
        throw new AuthenticationError('Email does not exist. Please try a different email!');
      }

      // simple user payload or user information
      const payload = {
        _id: user._id,
        userID: user.userID,
        email: user.email
      };

      // sign jwt token
      const token = await jwt.sign(payload, config.secretKey);
      // check if no token
      if (!token) {
        throw new ForbiddenError('Token is not presented!');
      }

      // return a bearer token
      return { token: (tokenInitial += token) };
    },
    // Delete user
    deleteUser: async (root, { email }, context, info) => {},
    // Change PWD
    resetPassword: async (root, { email }, context, info) => {},
    // Change Email
    transferEmail: async (root, { email }, context, info) => {}
  },
  User: {
    key: async user => {
      return await Key.findOne({ userID: user.userID })
        .populate('user')
        .exec();
    }
  }
};
