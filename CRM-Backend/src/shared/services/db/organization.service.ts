import mongoose from 'mongoose';

import { AuthModel } from '@auth/models/auth.schema';
import { IOrganizationDocument } from '@organization/interfaces/organization.interface';
import { OrganizationModel } from '@organization/models/organization.schema';
import { IAuthDocument } from '@auth/interfaces/auth.interface';


class OrganizationService {

  //Create organization
  public async createOrganization(data: IOrganizationDocument): Promise<void> {
    await OrganizationModel.create(data);
  }

  // check if name or code organization exists
  public async checkOrganization(data: IOrganizationDocument): Promise<boolean> {
    const query = { $or: [{ name: data.name }, { code: data.code }] };

    const organization = await OrganizationModel.findOne(query).exec();

    return !!organization;
  }

  // check if organization exists by id
  public async checkOrganizationById(id: string): Promise<boolean> {
    const organization = await OrganizationModel.findById(id).exec();

    return !!organization;
  }


  // get all organizations
  public async getOrganizations(): Promise<IOrganizationDocument[]> {
    const organizations: IOrganizationDocument[] = await OrganizationModel.find().exec() as IOrganizationDocument[];

    return organizations;
  }

  // get organization by id
  public async getOrganizationById(id: string): Promise<IOrganizationDocument> {
    const organization: IOrganizationDocument[] = await OrganizationModel.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(id) } },
      { $lookup: { from: 'Directorate', localField: '_id', foreignField: 'organizationId', as: 'directorate' } },
      { $lookup: { from: 'Department', localField: '_id', foreignField: 'organizationId', as: 'department' } },
    ]).exec();

    return organization[0];
  }


  // update organization
  public async updateOrganization(id: string, data: IOrganizationDocument): Promise<void> {
    await OrganizationModel.findByIdAndUpdate(id, data).exec();
  }

  // delete organization
  public async deleteOrganization(id: string): Promise<void> {
    await OrganizationModel.findByIdAndDelete(id).exec();
  }

  // get organization Count
  public async getOrganizationCount(): Promise<number> {
    const count: number = await OrganizationModel.countDocuments().exec();

    return count;
  }


  // get all users in organization by organizationId and Pagination and search
  public async getUsersInOrganization(organizationId: string, search: RegExp, skip: number = 0, limit: number = 0): Promise<IAuthDocument[]> {
    let userQuery = {};

    if (search) {
      userQuery = { userLogin: search };
    }
    const users: IAuthDocument[] = await AuthModel.aggregate([
      { $match: { organizationId: new mongoose.Types.ObjectId(organizationId) } },
      { $match: userQuery },
      { $lookup: { from: 'User', localField: '_id', foreignField: 'authId', as: 'user' } },
      { $unwind: '$user' },
      { $lookup: { from: 'Organization', localField: 'organizationId', foreignField: '_id', as: 'organization' } },
      { $unwind: '$organization' },
      { $lookup: { from: 'Department', localField: 'departmentId', foreignField: '_id', as: 'department' } },
      { $unwind: '$department' },
      { $lookup: { from: 'Directorate', localField: 'directorateId', foreignField: '_id', as: 'directorate' } },
      { $unwind: '$directorate' },
      { $lookup: { from: 'Rank', localField: 'rank', foreignField: '_id', as: 'rank' } },
      { $sort: { createdAt: -1 } },
      { $skip: skip },
      { $limit: limit },
      { $project: this.aggregateProjectUser() }
    ]).exec();

    return users;
  }


  // get userCount in organization count
  public async getUserCountInOrganization(organizationId: string): Promise<number> {
    const count: number = await AuthModel.countDocuments({ organizationId: organizationId }).exec();

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
      'directorate._id': 1,
      'directorate.name': 1,
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


export const organizationService: OrganizationService = new OrganizationService();
