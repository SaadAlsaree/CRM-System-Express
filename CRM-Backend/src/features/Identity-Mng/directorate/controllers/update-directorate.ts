import { Request, Response } from 'express';
import HTTP_STATUS from 'http-status-codes';

import { joiValidation } from '@globals/decorators/joi-validation.decorators';
import { updateDirectorateSchema } from '@directorate/schema/directorate';
import { directorateService } from '@service/db/directorate.service';
import { IDirectorateDocument } from '@directorate/interfaces/directorate.interface';


export class Update {
  @joiValidation(updateDirectorateSchema)
  public async put(req: Request, res: Response): Promise<void> {
    const { name, code, description, avatar, phone, address, email, website, organizationId } = req.body;
    const directorateId = req.params.directorateId;

    const updateDirectorate: IDirectorateDocument = {
      name,
      code,
      phone,
      address,
      email,
      website,
      description,
      avatar,
      organizationId,
    } as IDirectorateDocument;

    // check if directorate exists in organization
    const directorate = await directorateService.checkDirectorateById(directorateId);

    if (!directorate) {
      res.status(HTTP_STATUS.CONFLICT).json({ message: 'Directorate Not exists' });
      return;
    }


    await directorateService.updateDirectorate(directorateId, updateDirectorate);

    res.status(HTTP_STATUS.CREATED).json({ message: 'Directorate updated successfully' });
  }
}
