import mongoose, { Document } from 'mongoose';
import { ObjectId } from 'mongodb';



export interface IOrganizationDocument extends Document {
  _id: string | ObjectId;
  name: string;
  code: string;
  description?: string;
  phone?: string;
  address?: string;
  email?: string;
  website?: string;
  type?: string;
  department?: IDepartmentDocument[];
  avatar?: string;
  createdAt?: Date;
  updatedAt?: Date;
}


export interface IDepartmentDocument extends Document {
  _id: string | ObjectId;
  name?: string;
  code?: string;
  email?: string;
  phone?: string;
  description?: string;
  organization?: mongoose.Types.ObjectId | string;
  createdAt?: Date;
  updatedAt?: Date;
}
