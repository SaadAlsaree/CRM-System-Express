import { Request, Response } from 'express';
import HTTP_STATUS from 'http-status-codes';
import { ObjectId } from 'mongodb';

import { joiValidation } from '@globals/decorators/joi-validation.decorators';
import { registerSchema } from '@auth/schema/auth';
import { IAuthDocument } from '@auth/interfaces/auth.interface';
import { authService } from '@service/db/auth.service';
import { Helpers } from '@globals/helpers/helpers';
import { IUserDocument } from '@user/interfaces/user.interface';
import { userServices } from '@service/db/user.service';
import { organizationService } from '@service/db/organization.service';
import { IOrganizationDocument } from '@organization/interfaces/organization.interface';
import { departmentService } from '@service/db/department.service';
import { IDepartmentDocument } from '@department/interfaces/department.interface';
import { IDirectorateDocument } from '@directorate/interfaces/directorate.interface';
import { directorateService } from '@service/db/directorate.service';


export class Create {
  @joiValidation(registerSchema)

  public async Post(req: Request, res: Response): Promise<Response> {
    const { userLogin, password, username, avatarColor, role, rank, organizationId, departmentId, directorateId } = req.body;


    if (organizationId) {
      // check if organization exists
      const organization: IOrganizationDocument = await organizationService.getOrganizationById(organizationId);

      if (!organization) {
        return res.status(HTTP_STATUS.NOT_FOUND).json({ message: 'Organization not found' });
      }
    }

    if (directorateId) {
      // check if directorate exists
      const directorate: IDirectorateDocument = await directorateService.getDirectorateById(directorateId);

      if (!directorate) {
        return res.status(HTTP_STATUS.NOT_FOUND).json({ message: 'Directorate not found' });
      }
    }


    // check if department exists
    const department: IDepartmentDocument = await departmentService.getDepartmentById(departmentId);

    if (!department) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({ message: 'Department not found' });
    }
    // auth data
    const uId = `${Helpers.generateRandomIntegers(12)}`;
    const authId = new ObjectId();
    const authToCreate: IAuthDocument = {
      _id: authId,
      userLogin,
      password,
      username,
      avatarColor,
      uId,
      role,
      rank,
      organizationId,
      departmentId
    } as IAuthDocument;

    // user data
    const userToCreate: IUserDocument = {
      authId,
      userLogin,
      username,
      uId,
    } as IUserDocument;

    // check if user already exists
    const user: IAuthDocument = await authService.getUserByUserLogin(userLogin) as IAuthDocument;

    if (user) {
      return res.status(HTTP_STATUS.CONFLICT).json({ message: 'User already exists' });
    }

    // create Auth
    await authService.createAuth(authToCreate);

    // create User
    await userServices.createUser(userToCreate);

    return res.status(HTTP_STATUS.CREATED).json({ message: 'Auth created successfully' });
  }
}
