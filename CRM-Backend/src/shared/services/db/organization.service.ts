import { AuthModel } from '@auth/models/auth.schema';
import { IDepartmentDocument, IOrganizationDocument } from '@organization/interfaces/organization.interface';
import { DepartmentModel } from '@organization/models/department.schema';
import { OrganizationModel } from '@organization/models/organization.schema';


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

  // get all organizations
  public async getOrganizations(): Promise<IOrganizationDocument[]> {
    const organizations: IOrganizationDocument[] = await OrganizationModel.find().exec() as IOrganizationDocument[];

    return organizations;
  }

  // get organization by id
  public async getOrganizationById(id: string): Promise<IOrganizationDocument> {
    const organization: IOrganizationDocument = await OrganizationModel.findById(id).exec() as IOrganizationDocument;

    return organization;
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

  // add user to organization
  public async addUserToOrganization(id: string): Promise<void> {
    await OrganizationModel.findByIdAndUpdate(id, { $inc: { employeesCount: 1 } }).exec();
  }

  // remove user from organization
  public async removeUserFromOrganization(id: string): Promise<void> {
    await OrganizationModel.findByIdAndUpdate(id, { $inc: { employeesCount: -1 } }).exec();
  }


  // Department Services //

  // create department
  public async createDepartment(data: IDepartmentDocument): Promise<void> {
    await DepartmentModel.create(data);
  }

  // check if department exists in organization
  public async checkDepartment(data: IDepartmentDocument): Promise<boolean> {
    const query = { $and: [{ name: data.name }, { organization: data.organization }] };

    const department = await DepartmentModel.findOne(query).exec();

    return !!department;
  }

  // get all departments in organization
  public async getDepartments(organizationId: string): Promise<IDepartmentDocument[]> {
    const departments: IDepartmentDocument[] = await DepartmentModel.find({ organization: organizationId }).exec() as IDepartmentDocument[];

    return departments;
  }

  // get department count in organization
  public async getDepartmentCount(organizationId: string): Promise<number> {
    const count: number = await DepartmentModel.countDocuments({ organization: organizationId }).exec();

    return count;
  }

  // get department by id
  public async getDepartmentById(id: string): Promise<IDepartmentDocument> {

    const department: IDepartmentDocument = await DepartmentModel.findById(id).exec() as IDepartmentDocument;

    return department;
  }

  // update department
  public async updateDepartment(id: string, data: IDepartmentDocument): Promise<void> {
    await DepartmentModel.findByIdAndUpdate(id, data).exec();
  }

  // delete department
  public async deleteDepartment(id: string): Promise<void> {
    // await DepartmentModel.findByIdAndDelete(id).exec();
    console.log(id);
  }

  // add user to department
  public async addUserToDepartment(id: string): Promise<void> {
    await DepartmentModel.findByIdAndUpdate(id, { $inc: { employeesCount: 1 } }).exec();
  }

  // remove user from department
  public async removeUserFromDepartment(id: string): Promise<void> {
    await DepartmentModel.findByIdAndUpdate(id, { $inc: { employeesCount: -1 } }).exec();
  }

  // get userCount in organization
  public async getUserCountInOrganization(organizationId: string): Promise<number> {
    const count: number = await AuthModel.countDocuments({ organizationId: organizationId }).exec();

    return count;
  }

  // get userCount in department
  public async getUserCountInDepartment(departmentId: string): Promise<number> {
    const count: number = await AuthModel.countDocuments({ departmentId: departmentId }).exec();

    return count;
  }


}


export const organizationService: OrganizationService = new OrganizationService();
