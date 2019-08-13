import mongoose, { Schema } from 'mongoose';

const keySchema = new Schema({
  key: String,
  user: { type: Schema.Types.ObjectId, ref: 'user' },
  isActive: Boolean,
  expiredIn: Date,
  expired: {
    type: Boolean,
    default: false
  },
  activated: {
    type: Boolean,
    default: false
  },
  activatedAt: Date,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('key', keySchema);
