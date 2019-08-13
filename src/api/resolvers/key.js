import { UserInputError } from 'apollo-server-express';
import { User, Key } from '../../models';
import pubsub, { EVENTS } from '../subscriptions';
import genKey from '../../utils/genKey';

export default {
  Mutation: {
    activateKey: async (root, args, context, info) => {
      const me = context.me._id;
      const future = new Date();
      const expiredTime = future.setDate(future.getDate() + 30);
      const activatedAt = new Date();
      const key = await Key.findOne({ key: args.key });
      if (!key) throw new UserInputError('Key does not exist!');
      if (key.isActive) throw new Error('Key already been activated!');

      // set key to user
      key.user = me;
      key.isActive = true;
      key.expiredIn = expiredTime;
      key.activated = true;
      key.activatedAt = activatedAt;

      // save settings
      const saved = await key.save();
      if (saved) return true;
      return false;
    },
    deactivateKey: async (root, args, context, info) => {
      const key = await Key.findOne({ key: args.key });
      if (!key) throw new UserInputError('Key does not exist!');
      if (!key.isActive) throw new Error('Key already been deactivated!');

      // set user of key to null
      key.user = null;
      key.isActive = false;

      // save settings
      const saved = await key.save();
      if (saved) return true;
      return false;
    },
    generateKey: async (root, { quantity }, context, info) => {
      if (quantity === 0) throw new UserInputError('Quantity must be > 0');
      // genKey will return back an array of keys
      const keys = genKey(quantity);
      // Saving multiple docs
      const docs = await Key.insertMany(keys);
      if (docs.length !== 0) {
        // SAVE ALL LICENSE(S) REALTIME
        pubsub.publish(EVENTS.KEY.GENERATED_KEYS, {
          generatedKey: docs
        });

        return docs;
      }
    }
  },
  Query: {
    getOneKey: (root, { key }, context, info) => {
      return Key.findOne({ key })
        .populate('user')
        .exec();
    },
    getAllKey: (root, args, context, info) => {
      return Key.find({})
        .sort({ createdAt: -1 })
        .exec();
    }
  },
  Subscription: {
    generatedKey: {
      subscribe: () => pubsub.asyncIterator([EVENTS.KEY.GENERATED_KEYS])
    }
  },
  Key: {
    user: async key => {
      return await User.findOne({ key: key._id })
        .populate('key')
        .exec();
    }
  }
};
