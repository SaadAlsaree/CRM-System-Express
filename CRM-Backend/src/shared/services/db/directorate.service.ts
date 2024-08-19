import mongoose from 'mongoose';

import { IAuthDocument } from '@auth/interfaces/auth.interface';
import { AuthModel } from '@auth/models/auth.schema';
import { IDirectorateDocument } from '@directorate/interfaces/directorate.interface';
import { DirectorateModel } from '@directorate/models/directorate.schema';


class DirectorateService {
  // create directorate
  public async createDirectorate(data: IDirectorateDocument): Promise<void> {
    await DirectorateModel.create(data);
  }

  // check if directorate exists in organization
  public async checkDirectorate(data: IDirectorateDocument): Promise<boolean> {
    const query = { $and: [{ name: data.name }, { organizationId: data.organizationId }] };

    const directorate = await DirectorateModel.findOne(query).exec();

    return !!directorate;
  }

  // check if directorate exists by id
  public async checkDirectorateById(id: string): Promise<boolean> {
    const directorate = await DirectorateModel.findById(id).exec();

    return !!directorate;
  }

  // get all directorates in organization
  public async getDirectoratesInOrganization(organizationId: string): Promise<IDirectorateDocument[]> {
    const directorates: IDirectorateDocument[] = await DirectorateModel.find({ organizationId: organizationId }).exec();

    return directorates;
  }

  // get directorate count in organization
  public async getDirectorateCountInOrganization(organizationId: string): Promise<number> {
    const count: number = await DirectorateModel.countDocuments({ organizationId: organizationId }).exec();

    return count;
  }

  // get directorate by id
  public async getDirectorateById(id: string): Promise<IDirectorateDocument> {


    const directorate: IDirectorateDocument[] = await DirectorateModel.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(id) } },
      { $lookup: { from: 'Department', localField: '_id', foreignField: 'directorateId', as: 'department' } },
    ]).exec();

    return directorate[0];
  }

  // get all directorates if organizationId is null
  public async getAllDirectorates(): Promise<IDirectorateDocument[]> {
    const directorates: IDirectorateDocument[] = await DirectorateModel.find({ organizationId: null }).exec() as IDirectorateDocument[];

    return directorates;
  }
  // git directorate count if organizationId is null
  public async getAllDirectorateCount(): Promise<number> {
    const count: number = await DirectorateModel.countDocuments().exec();

    return count;
  }

  // update directorate
  public async updateDirectorate(id: string, data: IDirectorateDocument): Promise<void> {
    await DirectorateModel.findByIdAndUpdate(id, data).exec();
  }

  // delete directorate
  public async deleteDirectorate(id: string): Promise<void> {
    await DirectorateModel.findByIdAndDelete(id).exec();
  }

  // delete all directorates by organizationId
  public async deleteDirectorateByOrganizationId(organizationId: string): Promise<void> {
    await DirectorateModel.deleteMany({ organizationId: organizationId }).exec();
  }


  // get users in directorate with pagination
  public async getUsersInDirectorate(directorateId: string, search: RegExp, skip: number = 0, limit: number = 0): Promise<IAuthDocument[]> {

    let userQuery = {};

    if (search) {
      userQuery = { userLogin: search };
    }
    const users: IAuthDocument[] = await AuthModel.aggregate([
      { $match: { directorateId: directorateId } },
      { $match: { userLogin: userQuery } },
      { $lookup: { from: 'User', localField: '_id', foreignField: 'authId', as: 'user' } },
      { $unwind: '$user' },
      { $project: this.aggregateProjectUser() },
      { $sort: { createdAt: -1 } },
      { $skip: skip },
      { $limit: limit },
    ]).exec();


    return users;
  }

  // get users count in directorate
  public async getUserCountInDirectorate(directorateId: string): Promise<number> {
    const count: number = await AuthModel.countDocuments({ directorateId: directorateId }).exec();

    return count;
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


export const directorateService: DirectorateService = new DirectorateService();
