import { Request, Response } from 'express';
import HTTP_STATUS from 'http-status-codes';

import { authService } from '@service/db/auth.service';


export class Delete {
  public async Role(req: Request, res: Response): Promise<Response> {
    const roleId = req.params.id as unknown as string;

    // check if role exists
    const role = await authService.getRoleById(roleId);

    if (!role) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({ message: 'Role not found' });
    }

    try {
      await authService.deleteRole(roleId);
    } catch (error) {
      console.log(error);
    }

    return res.status(HTTP_STATUS.CREATED).json({ message: 'Role deleted successfully' });
  }
}
