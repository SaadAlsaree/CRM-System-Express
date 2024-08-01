import { Request, Response } from 'express';
import HTTP_STATUS from 'http-status-codes';
import moment from 'moment';
import publicIP from 'ip';


import { userServices } from '@service/db/user.service';
import { IResetPasswordParams } from '@user/interfaces/user.interface';
import { joiValidation } from '@globals/decorators/joi-validation.decorators';
import { changePasswordSchema } from '@user/schema/user';
import { BadRequestError } from '@globals/helpers/error-handler';
import { IAuthDocument } from '@auth/interfaces/auth.interface';
import { authService } from '@service/db/auth.service';


export class Update {
  @joiValidation(changePasswordSchema)

  public async password(req: Request, res: Response): Promise<void> {
    const { currentPassword, newPassword, confirmPassword } = req.body;
    if (newPassword !== confirmPassword) {
      throw new BadRequestError('Passwords do not match.');
    }
    const existingUser: IAuthDocument = await authService.getUserByUserLogin(req.currentUser!.userLogin) as IAuthDocument;


    const passwordsMatch: boolean = await existingUser.comparePassword(currentPassword);
    if (!passwordsMatch) {
      throw new BadRequestError('Invalid credentials');
    }
    const hashedPassword: string = await existingUser.hashPassword(newPassword);
    userServices.updatePassword(`${req.currentUser!.userLogin}`, hashedPassword);

    // const resetPasswordParams: IResetPasswordParams = {
    //   userLogin: req.currentUser!.userLogin,
    //   email: req.currentUser!.userLogin,
    //   ipAddress: publicIP.address(),
    //   date: moment().format()
    // };

    res.status(HTTP_STATUS.OK).json({
      message: 'Password updated successfully. You will be redirected shortly to the login page.'
    });

  }
}



