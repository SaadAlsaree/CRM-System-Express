import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import HTTP_STATUS from 'http-status-codes';

import { joiValidation } from '@globals/decorators/joi-validation.decorators';
import { addRoleSchema } from '@auth/schema/role';
import { IRoleDocument, IRoleRequest } from '@auth/interfaces/role.interface';
import { authService } from '@service/db/auth.service';



export class Create {
  @joiValidation(addRoleSchema)
  public async Post(req: Request, res: Response): Promise<Response> {
    const { roleName, roleCode }: IRoleRequest = req.body as IRoleRequest;

    const roleId: ObjectId = new ObjectId();

    const roleToCreate: IRoleDocument = {
      _id: roleId,
      roleName,
      roleCode,
    } as IRoleDocument;


    try {
      await authService.createRole(roleToCreate);
    } catch (error) {
      console.log(error);
    }

    return res.status(HTTP_STATUS.CREATED).json({ message: 'Role created successfully' });
  }
}
