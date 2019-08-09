import mongoose, { Schema } from 'mongoose';

const membershipSchema = new Schema({
  type: String,
  price: Number,
  name: String,
  desc: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('membership', membershipSchema);
