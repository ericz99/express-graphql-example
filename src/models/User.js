import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema({
  userID: String,
  userName: String,
  email: String,
  password: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('user', userSchema);
