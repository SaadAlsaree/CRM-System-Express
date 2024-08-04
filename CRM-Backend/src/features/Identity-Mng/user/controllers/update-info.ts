import { Request, Response } from 'express';
import HTTP_STATUS from 'http-status-codes';

import { joiValidation } from '@globals/decorators/joi-validation.decorators';
import { userServices } from '@service/db/user.service';
import { userInfoSchema } from '@user/schema/user';


export class UpdateUserInfo {
  @joiValidation(userInfoSchema)
  public async Put(req: Request, res: Response): Promise<void> {
    const { userId } = req.params;
    const { email, phone, address, work, displayName } = req.body;
    await userServices.updateUserInfo(userId, { email, phone, address, work, displayName });
    res.status(HTTP_STATUS.OK).json({ message: 'User info updated' });
  }

  public async updateAvatar(req: Request, res: Response): Promise<void> {
    const { userId } = req.params;
    const { avatar } = req.body;

    // check if user exists
    const user = await userServices.getUserById(userId);

    if (!user) {
      res.status(HTTP_STATUS.NOT_FOUND).json({ message: 'User not found' });
      return;
    }
    await userServices.updateUserAvatar(userId, avatar);
    res.status(HTTP_STATUS.OK).json({ message: 'User avatar updated' });
  }
}


