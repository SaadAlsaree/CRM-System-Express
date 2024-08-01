import { Request, Response } from 'express';
import HTTP_STATUS from 'http-status-codes';

import { joiValidation } from '@globals/decorators/joi-validation.decorators';
import { addRankSchema } from '@auth/schema/rank';
import { IRankDocument, IRankRequest } from '@auth/interfaces/rank.interface';
import { authService } from '@service/db/auth.service';



export class Update {
  @joiValidation(addRankSchema)

  public async Put(req: Request, res: Response): Promise<Response> {
    const { rankCode, rankName }: IRankRequest = req.body as IRankRequest;
    const { id } = req.params;

    // check if rank exists
    const rank = await authService.getRankById(id);

    if (!rank) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({ message: 'Rank not found' });
    }


    const rankToUpdate: IRankDocument = {
      _id: id,
      rankName,
      rankCode,
    } as IRankDocument;

    try {
      await authService.updateRank(rankToUpdate);
    } catch (error) {
      console.log(error);
    }

    return res.status(HTTP_STATUS.CREATED).json({ message: 'Rank updated successfully' });
  }
}
