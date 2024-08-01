import { Request, Response } from 'express';
import HTTP_STATUS from 'http-status-codes';


import { authService } from '@service/db/auth.service';




export class Get {

  public async Rank(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    // check if rank exists
    const rank = await authService.getRankById(id);

    if (!rank) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({ message: 'Rank not found' });
    }

    return res.status(HTTP_STATUS.OK).json(rank);
  }
}
