import { model, Model, Schema } from 'mongoose';
import { hash, compare } from 'bcryptjs';

import { IAuthDocument } from '@auth/interfaces/auth.interface';


const SALT_ROUND = 10;

const authSchema = new Schema<IAuthDocument>({
  userLogin: { type: String, required: true, unique: true },
  uId: { type: String, required: true, unique: true },
  role: [{ type: Schema.Types.ObjectId, ref: 'Role', required: true }],
  rank: { type: Schema.Types.ObjectId, ref: 'Rank', required: true },
  password: { type: String, required: true },
  isActivated: { type: Boolean, default: false },
  isDeleted: { type: Boolean, default: false },
  avatarColor: { type: String, required: true },
  username: { type: String, required: true },
  organizationId: { type: Schema.Types.ObjectId, ref: 'Organization', required: true },
  departmentId: { type: Schema.Types.ObjectId, ref: 'Department', required: true },
  passwordResetToken: { type: String, default: '' },
  passwordResetExpires: { type: Number },
}, {
  timestamps: true, versionKey: false, toJSON: {
    transform(_doc, ret) {
      delete ret.password;
      return ret;
    }
  }
});


authSchema.pre('save', async function (this: IAuthDocument, next: () => void) {
  const hashedPassword: string = await hash(this.password as string, SALT_ROUND);
  this.password = hashedPassword;
  next();
});

authSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
  const hashedPassword: string = (this as unknown as IAuthDocument).password!;
  return compare(password, hashedPassword);
};

authSchema.methods.hashPassword = async function (password: string): Promise<string> {
  return hash(password, SALT_ROUND);
};


const AuthModel: Model<IAuthDocument> = model<IAuthDocument>('Auth', authSchema, 'Auth');
export { AuthModel };
