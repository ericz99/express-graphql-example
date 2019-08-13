import Joi from '@hapi/joi';
import shortid from 'shortid';
import { AuthenticationError } from 'apollo-server-express';
import { Key, User } from '../../models';
import { signUp, signIn } from '../../schemas';
import { attemptSignIn, checkOwnerKey } from '../../auth';
import genToken from '../../utils/gen';
import sendMail from '../../utils/mailer';

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
      // validate schema
      await Joi.validate(args, signIn, { abortEarly: false });
      // attempt to sign in
      return await attemptSignIn(args);
    },
    // register admin user
    registerAdmin: async (root, args, context, info) => {
      const { ownerKey, ...rest } = args;
      const userID = 'adminid_' + shortid.generate();
      // validate schema
      await Joi.validate(rest, signUp, { abortEarly: false });
      // check for owner key
      await checkOwnerKey(ownerKey);
      // create user
      return await User.create({ userID, role: 'ADMIN', ...rest });
    },
    // login admin user
    loginAdmin: async (root, args, context, info) => {
      // validate schema
      await Joi.validate(args, signIn, { abortEarly: false });
      // attempt to sign in
      return await attemptSignIn(args);
    },
    // Delete user
    deleteUser: async (root, { email }, context, info) => {
      const deleted = await User.deleteOne({ email });
      if (deleted.ok == '1' || deleted.ok == 1) {
        // means successfully deleted user
        return true;
      }

      return false;
    },
    // Change PWD
    resetPassword: async (root, { email }, context, info) => {
      const message = 'Email does not exist. Please try again!';
      const time = new Date();
      const token = genToken(18);
      const user = await User.findOne({ email });
      if (!user) throw new Error(message);

      // create new token
      user.resetPwdToken = token;
      user.resetPwdExpiry = time.setMinutes(time.getMinutes() + 30);
      await user.save();

      // send them new random password, later they can change
      const html = `
            <h1>Reset Password</h1>
            <span>Your token: ${token} </span>
          `;

      // send email
      await sendMail('admin@support.com', email, 'Change Password', html);

      return {
        msg: 'Successfully sent password reset to email!'
      };
    },
    // Update PWD
    updatePassword: async (root, { password, token }, context, info) => {
      const tokenMessage = 'Invalid token!';
      const currentTime = new Date().getTime();
      const user = await User.findOne({ token });
      if (!user || currentTime > user.resetPwdExpiry) throw new AuthenticationError(tokenMessage);

      user.password = password;
      user.resetPwdToken = null;
      user.resetPwdExpiry = null;
      await user.save();

      const html = `
      <h1>Updated Password</h1>
      </br>
      <span>Successfully updated password!</span>
      `;

      // send email
      await sendMail('admin@support.com', email, 'Updated Password', html);

      return {
        msg: 'Successfully changed password!'
      };
    },
    // Change Email
    transferEmail: async (root, { email }, context, info) => {
      const myEmail = context.me.email;
      const user = await User.findOne({ email: myEmail });

      // update new email
      user.email = email;
      await user.save();

      return {
        msg: 'Successfully updated new email!'
      };
    }
  },
  User: {
    key: async user => {
      return await Key.findOne({ user: user._id })
        .populate('user')
        .exec();
    }
  }
};
