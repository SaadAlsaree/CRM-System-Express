import { Request, Response } from 'express';
import HTTP_STATUS from 'http-status-codes';

import { IAuthDocument } from '@auth/interfaces/auth.interface';
import { userServices } from '@service/db/user.service';
import { IUserDocument } from '@user/interfaces/user.interface';



const PAGE_SIZE = 12;


export class Get {
  public async all(req: Request, res: Response): Promise<void> {

    console.log(req.currentUser?.role);
    const { page } = req.params;
    const skip: number = (parseInt(page) - 1) * PAGE_SIZE;
    const limit: number = PAGE_SIZE * parseInt(page);
    const newSkip: number = skip === 0 ? skip : skip + 1;

    // get all users
    const allUsers: IUserDocument[] = await userServices.getUsers({}, newSkip, limit);
    // get total users
    const totalUsers: number = await userServices.getTotalUsers();
    res.status(HTTP_STATUS.OK).json({ message: 'Get users', users: allUsers, totalUsers: totalUsers });

  }

  public async byId(req: Request, res: Response): Promise<void> {
    const { userId } = req.params;
    const user: IUserDocument = await userServices.getUserById(userId);
    res.status(HTTP_STATUS.OK).json({ message: 'User by id', user });
  }

  // get users by organization
  public async byOrganization(req: Request, res: Response): Promise<void> {
    const { organizationId, page } = req.params;

    const skip: number = (parseInt(page) - 1) * PAGE_SIZE;
    const limit: number = PAGE_SIZE * parseInt(page);
    const newSkip: number = skip === 0 ? skip : skip + 1;

    const users: IAuthDocument[] = await userServices.getUsersByOrganization(organizationId, newSkip, limit);
    const totalUsers: number = await userServices.getTotalUsersByOrganization(organizationId);

    res.status(HTTP_STATUS.OK).json({ message: 'Users by organization', Users: users, totalUsers });
  }

  // get users by department
  public async byDepartment(req: Request, res: Response): Promise<void> {
    const { departmentId } = req.params;
    const { page } = req.params;
    const skip: number = (parseInt(page) - 1) * PAGE_SIZE;
    const limit: number = PAGE_SIZE * parseInt(page);
    const newSkip: number = skip === 0 ? skip : skip + 1;

    const users: IAuthDocument[] = await userServices.getUsersByDepartment(departmentId, newSkip, limit);
    const totalUsers: number = await userServices.getTotalUsersByDepartment(departmentId);

    res.status(HTTP_STATUS.OK).json({ message: 'Users by department', Users: users, totalUsers: totalUsers });
  }

  public async profile(req: Request, res: Response): Promise<void> {
    const { authId } = req.params;
    const user: IUserDocument = await userServices.getUserProfile(authId);
    res.status(HTTP_STATUS.OK).json({ message: 'User profile', user });
  }

}
