import mongoose, { Document } from 'mongoose';
import { ObjectId } from 'mongodb';
import { IDepartmentDocument } from '@department/interfaces/department.interface';
import { IAuthDocument } from '@auth/interfaces/auth.interface';


export interface IDirectorateDocument extends Document {
  _id: string | ObjectId;
  name: string;
  code: string;
  description?: string;
  phone?: string;
  address?: string;
  email?: string;
  website?: string;
  avatar?: string;
  Departments?: IDepartmentDocument[];
  Users?: IAuthDocument[];
  organizationId?: mongoose.Types.ObjectId | string;
  createdAt?: Date;
  updatedAt?: Date;
}

