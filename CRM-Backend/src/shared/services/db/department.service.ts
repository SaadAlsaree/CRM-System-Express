import { AuthModel } from '@auth/models/auth.schema';
import { IDepartmentDocument } from '@department/interfaces/department.interface';
import { DepartmentModel } from '@department/models/department.schema';

class DepartmentService {

  // create department
  public async createDepartment(data: IDepartmentDocument): Promise<void> {
    await DepartmentModel.create(data);
  }

  // check if department exists in organization
  public async checkDepartmentInOrganization(data: IDepartmentDocument): Promise<boolean> {
    const query = { $and: [{ name: data.name }, { organization: data.organizationId }] };

    const department = await DepartmentModel.findOne(query).exec();

    return !!department;
  }

  // check if department exists in directorate
  public async checkDepartmentInDirectorate(data: IDepartmentDocument): Promise<boolean> {
    const query = { $and: [{ name: data.name }, { directorateId: data.directorateId }] };

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

  // delete department by organizationId
  public async deleteDepartmentByOrganizationId(organizationId: string): Promise<void> {
    await DepartmentModel.deleteMany({ organization: organizationId }).exec();
  }


  // add user to department
  public async addUserToDepartment(id: string): Promise<void> {
    await DepartmentModel.findByIdAndUpdate(id, { $inc: { employeesCount: 1 } }).exec();
  }

  // remove user from department
  public async removeUserFromDepartment(id: string): Promise<void> {
    await DepartmentModel.findByIdAndUpdate(id, { $inc: { employeesCount: -1 } }).exec();
  }

  // get userCount in department
  public async getUserCountInDepartment(departmentId: string): Promise<number> {
    const count: number = await AuthModel.countDocuments({ departmentId: departmentId }).exec();

    return count;
  }


}


export const departmentService: DepartmentService = new DepartmentService();
