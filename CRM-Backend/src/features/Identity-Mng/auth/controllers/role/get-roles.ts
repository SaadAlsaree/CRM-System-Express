import { Request, Response } from 'express';
import HTTP_STATUS from 'http-status-codes';


import { authService } from '@service/db/auth.service';
import { IRoleDocument } from '@auth/interfaces/role.interface';


export class GetAll {

  public async Roles(req: Request, res: Response): Promise<Response> {
    const roles: IRoleDocument[] = await authService.getRoles() as IRoleDocument[];

    return res.status(HTTP_STATUS.OK).json({ data: roles });
  }
}
