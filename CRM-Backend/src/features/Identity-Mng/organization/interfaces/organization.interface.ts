import { Document } from 'mongoose';
import { ObjectId } from 'mongodb';
import { IDepartmentDocument } from '@department/interfaces/department.interface';
import { IDirectorateDocument } from '@directorate/interfaces/directorate.interface';
import { IAuthDocument } from '@auth/interfaces/auth.interface';



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
  Directorates?: IDirectorateDocument[];
  Departments?: IDepartmentDocument[];
  Users?: IAuthDocument[];
  avatar?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IGetUsersInOrganization {
  organizationId: string;
  userLogin?: string;
  page?: number;
  limit?: number;
}
