import mongoose, { Schema, Promise } from 'mongoose';
import bcryptjs from 'bcryptjs';

const userSchema = new Schema({
  userID: {
    type: String,
    unique: true
  },
  userName: {
    type: String,
    unique: true,
    required: true,
    validate: {
      validator: async function(value) {
        const self = this;
        const result = await self.constructor.findOne({ userName: value }).exec();
        // if result exist
        if (result) {
          return false;
        }
      },
      message: 'Username already been taken!'
    }
  },
  email: {
    type: String,
    unique: true,
    required: true,
    validate: {
      validator: async function(value) {
        const self = this;
        const result = await self.constructor.findOne({ email: value }).exec();
        // if result exist
        if (result) {
          return false;
        }
      },
      message: 'Email already been taken!'
    }
  },
  password: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

userSchema.pre('save', async function(next) {
  const SALT_ROUND = 10;
  const user = this;
  if (!user.isModified('password')) return next();

  // gen salt
  const salt = await bcryptjs.genSalt(SALT_ROUND);
  // hash password
  const hashPassword = await bcryptjs.hash(user.password, salt);
  // switch plaintext -> hash password
  user.password = hashPassword;

  return next();
});

userSchema.methods.comparePassword = async function(password) {
  return bcryptjs.compare(password, this.password);
};

export default mongoose.model('user', userSchema);
