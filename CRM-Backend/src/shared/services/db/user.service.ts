
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
    const updateUser: UpdateQuery<IUserDocument> = UserModel.findByIdAndUpdate({ _id: userId },
      { $set: { displayName: user.displayName, email: user.email, phone: user.phone, address: user.address, work: user.work } }).exec();

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
    let userQuery = {};
    if (query.userLogin) {
      userQuery = { $or: [{ userLogin: query.userLogin }, { username: query.userLogin }] };
    } else {
      userQuery = query;
    }
    if (query.organizationId) {
      userQuery = { ...userQuery, organizationId: new mongoose.Types.ObjectId(query.organizationId) };
    }
    if (query.departmentId) {
      userQuery = { ...userQuery, departmentId: new mongoose.Types.ObjectId(query.departmentId) };
    }

    const users: IUserDocument[] = await AuthModel.aggregate([
      { $match: userQuery },
      { $lookup: { from: 'User', localField: '_id', foreignField: 'authId', as: 'user' } },
      { $unwind: '$user' },
      { $lookup: { from: 'Organization', localField: 'organizationId', foreignField: '_id', as: 'organization' } },
      { $unwind: '$organization' },
      { $lookup: { from: 'Department', localField: 'departmentId', foreignField: '_id', as: 'department' } },
      { $unwind: '$department' },
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
  public async getUserByAuthId(authId: string): Promise<IUserDocument> {

    const user: IUserDocument[] = await AuthModel.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(authId) } },
      { $lookup: { from: 'User', localField: '_id', foreignField: 'authId', as: 'user' } },
      { $unwind: '$user' },
      { $lookup: { from: 'Organization', localField: 'organizationId', foreignField: '_id', as: 'organization' } },
      { $unwind: '$organization' },
      { $lookup: { from: 'Department', localField: 'departmentId', foreignField: '_id', as: 'department' } },
      { $unwind: '$department' },
      { $lookup: { from: 'Rank', localField: 'rank', foreignField: '_id', as: 'rank' } },
      { $unwind: '$rank' },
      { $lookup: { from: 'Role', localField: 'role', foreignField: '_id', as: 'role' } },

      { $project: this.aggregateProjectUser() }
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
      { $lookup: { from: 'User', localField: '_id', foreignField: 'authId', as: 'user' } },
      { $unwind: '$user' },
      { $lookup: { from: 'Organization', localField: 'organizationId', foreignField: '_id', as: 'organization' } },
      { $unwind: '$organization' },
      { $lookup: { from: 'Department', localField: 'departmentId', foreignField: '_id', as: 'department' } },
      { $unwind: '$department' },
      { $lookup: { from: 'Rank', localField: 'rank', foreignField: '_id', as: 'rank' } },
      { $unwind: '$rank' },
      { $lookup: { from: 'Role', localField: 'role', foreignField: '_id', as: 'role' } },

      { $project: this.aggregateProjectUser() }
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
  public async getTotalUsers(query: IGetUserQuery): Promise<number> {
    let userQuery = {};
    if (query.userLogin) {
      userQuery = { userLogin: query.userLogin };
    } else {
      userQuery = query;
    }
    if (query.organizationId) {
      userQuery = { ...userQuery, organizationId: new mongoose.Types.ObjectId(query.organizationId) };
    }
    if (query.departmentId) {
      userQuery = { ...userQuery, departmentId: new mongoose.Types.ObjectId(query.departmentId) };
    }

    const totalUsers: number = await UserModel.find(userQuery).countDocuments();
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

  // check if current user
  public async isCurrentUser(authId: string, userId: string): Promise<boolean> {
    const user: IUserDocument = await UserModel.findOne({ authId, _id: userId }).exec() as IUserDocument;
    return !!user;
  }



  private aggregateProject() {
    return {

      'authId.password': 0,
      password: 0,
      passwordResetToken: 0,
    };
  }

  private aggregateProjectUser() {
    return {
      _id: 1,
      userLogin: 1,
      uId: 1,
      'role.roleName': 1,
      'role._id': 1,
      'rank._id': 1,
      'rank.rankName': 1,
      'department._id': 1,
      'department.name': 1,
      'organization._id': 1,
      'organization.name': 1,
      isActivated: 1,
      isDeleted: 1,
      avatarColor: 1,
      username: 1,
      createdAt: 1,
      updatedAt: 1,
      'user._id': 1,
      'user.email': 1,
      'user.phone': 1,
      'user.ticketCount': 1,
      'user.taskCount': 1,
      'user.casesCount': 1,
      'user.blocked': 1,
      'user.followersCount': 1,
      'user.followingCount': 1,
      'user.notifications': 1,
      'user.leave': 1,
      'user.address': 1,
      'user.displayName': 1,
      'user.work': 1,
    };
  }

}

export const userServices: UserServices = new UserServices();
