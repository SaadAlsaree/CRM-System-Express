import { Request, Response } from 'express';
import HTTP_STATUS from 'http-status-codes';


import { authService } from '@service/db/auth.service';



export class GetAll {

  public async Ranks(req: Request, res: Response): Promise<Response> {
    const ranks = await authService.getRanks();
    return res.status(HTTP_STATUS.OK).json(ranks);
  }
}
