import { model, Schema, Model } from 'mongoose';

import { IUserDocument } from '@user/interfaces/user.interface';




const userSchema: Schema = new Schema({
  authId: { type: Schema.Types.ObjectId, ref: 'Auth', required: true },
  username: { type: String },
  userLogin: { type: String, required: true },
  uId: { type: String },
  email: { type: String },
  phone: { type: String },
  address: { type: String },
  ticketCount: { type: Number, default: 0 },
  taskCount: { type: Number, default: 0 },
  casesCount: { type: Number, default: 0 },
  avatar: { type: String },
  work: { type: String },
  quote: { type: String },
  blocked: { type: [Schema.Types.ObjectId], ref: 'User' },
  blockedBy: { type: [Schema.Types.ObjectId], ref: 'User' },
  followersCount: { type: Number, default: 0 },
  followingCount: { type: Number, default: 0 },
  notifications: {
    messages: { type: Boolean, default: true },
    comments: { type: Boolean, default: true },
    follows: { type: Boolean, default: true },
    tickets: { type: Boolean, default: true },
    tasks: { type: Boolean, default: true },
    cases: { type: Boolean, default: true },
  },
  leave: [{ type: Schema.Types.ObjectId, ref: 'Leave' }],
  files: [{ type: Schema.Types.ObjectId, ref: 'File' }],
}, { timestamps: true, versionKey: false });


const UserModel: Model<IUserDocument> = model<IUserDocument>('User', userSchema, 'User');

export { UserModel };
