import mongoose, { Document } from 'mongoose';
import { ObjectId } from 'mongodb';

import { BaseResponse } from '@globals/types/common';
import { IUserDocument } from '@user/interfaces/user.interface';

declare global {
  namespace Express {
    interface Request {
      currentUser?: AuthPayload;
    }
  }
}

export interface AuthPayload {
  userId: string;
  uId: string;
  userLogin: string;
  isActivated: boolean;
  role: string[];
  avatarColor: string;
  username: string;
  iat?: number;
}


export interface IAuthDocument extends Document {
  _id: ObjectId | string;
  uId: string;
  userLogin: string;
  role: [mongoose.Types.ObjectId];
  rank: mongoose.Types.ObjectId;
  isActivated: boolean;
  isDeleted: boolean;
  avatarColor: string;
  username: string;
  password: string;
  passwordResetToken?: string;
  passwordResetExpires?: number | string;
  User: IUserDocument;
  directorateId?: mongoose.Types.ObjectId | string;
  organizationId: mongoose.Types.ObjectId | string;
  departmentId: mongoose.Types.ObjectId | string;
  comparePassword(candidatePassword: string): Promise<boolean>;
  hashPassword(password: string): Promise<string>;
}

export interface IAuthRequest {
  userLogin: string;
  password: string;
}

export interface IAuthResponse extends BaseResponse {
  data: { accessToken: string };
}

export interface IUpdatePasswordTokenRequest {
  _id: string;
  passwordResetToken: string;
  passwordResetExpires: number;
}

