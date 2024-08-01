
import mongoose, { UpdateQuery } from 'mongoose';

import { IGetUserQuery, INotificationSettings, IUserDocument, IUserInfo } from '@user/interfaces/user.interface';
import { UserModel } from '@user/models/user.schema';
import { AuthModel } from '@auth/models/auth.schema';
import { IAuthDocument } from '@auth/interfaces/auth.interface';

class UserServices {

  // create user
  public async createUser(user: IUserDocument): Promise<void> {
    await UserModel.create(user);
  }


  // update basic user info
  public async updateBasicUserInfo(authId: string, userToUpdate: IUserDocument): Promise<void> {
    await UserModel.updateOne({ authId }, { $set: { userLogin: userToUpdate.userLogin, username: userToUpdate.username } }).exec();
  }
  // update user info
  public async updateUserInfo(userId: string, user: IUserInfo): Promise<void> {
    const updateUser: UpdateQuery<IUserDocument> = UserModel.updateOne({ _id: userId },
      { $set: { email: user.email, phone: user.phone, address: user.address, work: user.work } }).exec();

    await Promise.all([updateUser]);
  }

  // update user avatar
  public async updateUserAvatar(userId: string, avatar: string): Promise<void> {
    await UserModel.findByIdAndUpdate({ _id: userId }, { $set: { avatar } }).exec();
  }

  // update user notifications settings
  public async updateUserNotifications(userId: string, notifications: INotificationSettings): Promise<void> {
    await UserModel.findByIdAndUpdate({ _id: userId }, { $set: { notifications } }).exec();
  }

  // update user password
  public async updatePassword(userId: string, hashedPassword: string): Promise<void> {
    await AuthModel.findByIdAndUpdate({ _id: userId }, { $set: { password: hashedPassword } }).exec();
  }

  // update notification settings
  public async updateNotificationSettings(userId: string, settings: INotificationSettings): Promise<void> {
    await UserModel.findByIdAndUpdate({ _id: userId }, { $set: { notifications: settings } }).exec();
  }

  // Get all users
  public async getUsers(query: IGetUserQuery, skip: number = 0, limit: number = 0): Promise<IUserDocument[]> {

    const users: IUserDocument[] = await UserModel.aggregate([
      // { $match: userQuery },
      { $lookup: { from: 'Auth', localField: 'authId', foreignField: '_id', as: 'authId' } },
      { $unwind: '$authId' },
      { $sort: { createdAt: -1 } },
      { $skip: skip },
      { $project: this.aggregateProject() },
      { $limit: limit }])
      .exec();

    return users;
  }

  // Get all users by organization
  public async getUsersByOrganization(organizationId: string, skip: number = 0, limit: number = 0): Promise<IAuthDocument[]> {
    const users: IAuthDocument[] = await AuthModel.aggregate([
      { $match: { organizationId: new mongoose.Types.ObjectId(organizationId) } },
      { $lookup: { from: 'User', localField: '_id', foreignField: 'authId', as: 'user' } },
      { $unwind: '$user' },
      { $lookup: { from: 'Department', localField: 'departmentId', foreignField: '_id', as: 'department' } },
      { $unwind: '$department' },
      { $project: this.aggregateProject() },
      { $sort: { createdAt: -1 } },
      { $skip: skip },
      { $limit: limit }
    ]).exec();

    return users;
  }

  // Get all users by department
  public async getUsersByDepartment(departmentId: string, skip: number = 0, limit: number = 0): Promise<IAuthDocument[]> {
    const users: IAuthDocument[] = await AuthModel.aggregate([
      { $match: { departmentId: new mongoose.Types.ObjectId(departmentId) } },
      { $lookup: { from: 'User', localField: '_id', foreignField: 'authId', as: 'user' } },
      { $unwind: '$user' },
      { $project: this.aggregateProject() },
      { $sort: { createdAt: -1 } },
      { $skip: skip },
      { $limit: limit }
    ]).exec();

    return users;
  }

  // Get user by authId
  public async getUserByAuthId(userId: string): Promise<IUserDocument> {
    const user: IUserDocument[] = await UserModel.aggregate([
      { $match: { authId: new mongoose.Types.ObjectId(userId) } },
      { $lookup: { from: 'Auth', localField: 'authId', foreignField: '_id', as: 'authId' } },
      { $unwind: '$authId' },
      { $project: this.aggregateProject() }
    ]).exec();

    return user[0];
  }

  // Get user by id
  public async getUserById(userId: string): Promise<IUserDocument> {
    const user: IUserDocument[] = await UserModel.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(userId) } },
      { $lookup: { from: 'Auth', localField: 'authId', foreignField: '_id', as: 'auth' } },
      { $unwind: '$auth' },
      { $project: this.aggregateProject() }
    ]).exec();

    return user[0];
  }

  // get user profile
  public async getUserProfile(authId: string): Promise<IUserDocument> {
    const user: IUserDocument[] = await AuthModel.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(authId) } },

      { $project: this.aggregateProject() }
    ]).exec();

    return user[0];
  }

  // search user
  public async searchUsers(regex: RegExp): Promise<IUserDocument[]> {
    const users = await AuthModel.aggregate([
      {
        $match: {
          $or: [
            { userLogin: regex },
            { username: regex },
          ]
        }
      },
      { $lookup: { from: 'User', localField: '_id', foreignField: 'authId', as: 'user' } },
      { $unwind: '$user' },
      { $project: this.aggregateProject() }

    ]).exec();

    return users;
  }

  // get total users
  public async getTotalUsers(): Promise<number> {
    const totalUsers: number = await UserModel.find({}).countDocuments();
    return totalUsers;
  }

  // get total users by organization
  public async getTotalUsersByOrganization(organizationId: string): Promise<number> {
    const totalUsers: number = await UserModel.find({ organization: organizationId }).countDocuments();
    return totalUsers;
  }

  // get total users by department
  public async getTotalUsersByDepartment(departmentId: string): Promise<number> {
    const totalUsers: number = await UserModel.find({ department: departmentId }).countDocuments();
    return totalUsers;
  }



  private aggregateProject() {
    return {

      'authId.password': 0,
      password: 0,
    };
  }

}

export const userServices: UserServices = new UserServices();
