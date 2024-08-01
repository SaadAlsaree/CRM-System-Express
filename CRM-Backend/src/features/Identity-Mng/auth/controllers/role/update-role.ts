import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import HTTP_STATUS from 'http-status-codes';

import { joiValidation } from '@globals/decorators/joi-validation.decorators';
import { addRoleSchema } from '@auth/schema/role';
import { IRoleDocument, IRoleRequest } from '@auth/interfaces/role.interface';
import { authService } from '@service/db/auth.service';




export class Update {
  @joiValidation(addRoleSchema)

  public async Put(req: Request, res: Response): Promise<Response> {
    const { roleName, roleCode }: IRoleRequest = req.body as IRoleRequest;
    const roleId: ObjectId = req.params.id as unknown as ObjectId;

    // check if role exists
    const role = await authService.getRoleById(roleId as unknown as string);

    if (!role) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({ message: 'Role not found' });
    }

    const roleToUpdate: IRoleDocument = {
      _id: roleId,
      roleName,
      roleCode,
    } as IRoleDocument;


    try {
      await authService.updateRole(roleToUpdate);
    } catch (error) {
      console.log(error);
    }

    return res.status(HTTP_STATUS.CREATED).json({ message: 'Role updated successfully' });
  }
}
