import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';



export interface IUserDocument extends Document {
  _id: ObjectId | string;
  authId: mongoose.Types.ObjectId | string;
  username?: string;
  userLogin: string;
  uId?: string;
  email?: string;
  phone?: string;
  address?: string;
  ticketCount: number;
  taskCount: number;
  caseCount: number;
  avatar?: string;
  work?: string;
  quote?: string;
  blocked?: mongoose.Types.ObjectId[];
  blockedBy?: mongoose.Types.ObjectId[];
  followersCount: number;
  followingCount: number;
  notifications?: INotificationSettings;
  organization?: string;
  department?: string;
  leave?: mongoose.Types.ObjectId[] | string[];
  files?: mongoose.Types.ObjectId[] | string[];
}


export interface INotificationSettings {
  messages: boolean;
  comments: boolean;
  follows: boolean;
  tickets: boolean;
  tasks: boolean;
  cases: boolean;
}

export interface IResetPasswordParams {
  userLogin: string;
  email: string;
  ipAddress: string;
  date: string;
}


export interface IUserInfo {
  displayName: string;
  email: string;
  phone: string;
  address: string;
  work?: string;
}


export interface IGetUserQuery {
  userLogin?: string;
  authId?: string;
  organizationId?: string;
  departmentId?: string;
}

export interface ISearchUser {
  _id: string;
  avatar: string;
  username: string;
  email: string;
  avatarColor: string;
}

export interface ISocketData {
  blockedUser: string;
  blockedBy: string;
}

export interface ILogin {
  userId: string;
}
