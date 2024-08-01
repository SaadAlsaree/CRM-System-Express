import { Request, Response } from 'express';
import HTTP_STATUS from 'http-status-codes';
import { config } from '@root/config';
import JWT from 'jsonwebtoken';

import { joiValidation } from '@globals/decorators/joi-validation.decorators';
import { loginSchema } from '@auth/schema/auth';
import { IAuthDocument } from '@auth/interfaces/auth.interface';
import { authService } from '@service/db/auth.service';
import { BadRequestError } from '@globals/helpers/error-handler';





export class Login {
  @joiValidation(loginSchema)

  public async Post(req: Request, res: Response): Promise<Response> {
    const { userLogin, password } = req.body;

    // check if user exists
    const existingUser: IAuthDocument = await authService.getUserByUserLogin(userLogin) as IAuthDocument;


    if (!existingUser) {
      throw new BadRequestError('Invalid credentials');
    }

    // check if password is correct
    const passwordsMatch: boolean = await existingUser.comparePassword(password);
    if (!passwordsMatch) {
      throw new BadRequestError('Invalid credentials');
    }

    // Assuming authService.getRoleById returns a promise that resolves to a role object
    const rolePromises = existingUser.role.map((role) => {
      return authService.getRoleById(role.toString());
    });

    // Wait for all promises to resolve
    const roles = await Promise.all(rolePromises);

    // generate token
    const userJwt: string = JWT.sign({
      userId: existingUser._id.toString(),
      uId: existingUser.uId,
      userLogin: existingUser.userLogin,
      username: existingUser.username,
      isActivated: existingUser.isActivated,
      role: roles.map(role => role?.roleName),
      avatarColor: existingUser.avatarColor,

    }, config.JWT_TOKEN!, { expiresIn: config.JWT_EXPIRE });

    req.session = { jwt: userJwt };

    return res.status(HTTP_STATUS.OK).json({ message: 'Login successful', isActivated: existingUser.isActivated });

  }
}
