import { Request, Response } from 'express';
import HTTP_STATUS from 'http-status-codes';


import { authService } from '@service/db/auth.service';
import { IRoleDocument } from '@auth/interfaces/role.interface';


export class Get {

  public async Role(req: Request, res: Response): Promise<Response> {
    const roleId = req.params.id as unknown as string;

    // check if role exists
    const role: IRoleDocument = await authService.getRoleById(roleId) as IRoleDocument;

    if (!role) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({ message: 'Role not found' });
    }

    return res.status(HTTP_STATUS.OK).json({ data: role });
  }
}
