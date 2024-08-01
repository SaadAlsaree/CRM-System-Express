import HTTP_STATUS from 'http-status-codes';
import { Request, Response } from 'express';

import { joiValidation } from '@globals/decorators/joi-validation.decorators';
import { userBasicSchema } from '@user/schema/user';
import { IAuthDocument } from '@auth/interfaces/auth.interface';
import { authService } from '@service/db/auth.service';
import { IUserDocument } from '@user/interfaces/user.interface';
import { userServices } from '@service/db/user.service';

export class UpdateBasic {
  @joiValidation(userBasicSchema)
  public async Put(req: Request, res: Response): Promise<void> {
    const { authId } = req.params;
    const { userLogin, password, username, avatarColor, role, rank, organizationId, departmentId } = req.body;

    // check if user exists
    const auth: IAuthDocument = await authService.getAuthById(authId) as IAuthDocument;

    if (!auth) {
      res.status(HTTP_STATUS.CONFLICT).json({ message: 'User Not Found !' });
    }



    const dataToUpdate: IAuthDocument = {
      userLogin,
      password,
      username,
      avatarColor,
      role,
      rank,
      organizationId,
      departmentId
    } as IAuthDocument;

    // user data
    const userToUpdate: IUserDocument = {
      userLogin,
      username,
    } as IUserDocument;


    await authService.updateBasicAuth(authId, dataToUpdate);
    await userServices.updateBasicUserInfo(authId, userToUpdate);



    res.status(HTTP_STATUS.OK).json({ message: 'User updated' });
  }

  public async isActive(req: Request, res: Response): Promise<void> {
    const { authId } = req.params;
    const { isActivated } = req.body;

    // check if user exists
    const auth: IAuthDocument = await authService.getAuthById(authId) as IAuthDocument;

    if (!auth) {
      res.status(HTTP_STATUS.CONFLICT).json({ message: 'User Not Found !' });
    }

    await authService.updateIsActive(authId, isActivated);

    res.status(HTTP_STATUS.OK).json({ message: 'User updated' });
  }

  public async isDeleted(req: Request, res: Response): Promise<void> {
    const { authId } = req.params;
    const { isDeleted } = req.body;

    // check if user exists
    const auth: IAuthDocument = await authService.getAuthById(authId) as IAuthDocument;

    if (!auth) {
      res.status(HTTP_STATUS.CONFLICT).json({ message: 'User Not Found !' });
    }

    await authService.updateIsDeleted(authId, isDeleted);

    res.status(HTTP_STATUS.OK).json({ message: 'User Deleted' });
  }
}
