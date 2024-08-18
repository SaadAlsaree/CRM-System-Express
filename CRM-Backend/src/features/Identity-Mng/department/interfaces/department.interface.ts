import mongoose, { Document } from 'mongoose';
import { ObjectId } from 'mongodb';
import { IAuthDocument } from '@auth/interfaces/auth.interface';


export interface IDepartmentDocument extends Document {
  _id: string | ObjectId;
  name?: string;
  code?: string;
  email?: string;
  phone?: string;
  description?: string;
  Users?: IAuthDocument[];
  organizationId?: string | mongoose.Types.ObjectId | string;
  directorateId?: string | mongoose.Types.ObjectId | string;
  createdAt?: Date;
  updatedAt?: Date;
}
