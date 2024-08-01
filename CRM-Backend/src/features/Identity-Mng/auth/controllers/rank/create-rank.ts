import { Request, Response } from 'express';
import HTTP_STATUS from 'http-status-codes';

import { joiValidation } from '@globals/decorators/joi-validation.decorators';
import { addRankSchema } from '@auth/schema/rank';
import { IRankDocument, IRankRequest } from '@auth/interfaces/rank.interface';
import { authService } from '@service/db/auth.service';


export class Create {
  @joiValidation(addRankSchema)

  public async Post(req: Request, res: Response): Promise<Response> {
    const { rankCode, rankName }: IRankRequest = req.body as IRankRequest;
    const rankToCreate: IRankDocument = {

      rankName,
      rankCode,
    } as IRankDocument;

    try {
      await authService.createRank(rankToCreate);
    } catch (error) {
      console.log(error);
    }

    return res.status(HTTP_STATUS.CREATED).json({ message: 'Rank created successfully' });
  }
}
