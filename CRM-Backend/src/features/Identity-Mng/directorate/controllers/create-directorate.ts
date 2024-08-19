import { Request, Response } from 'express';
import HTTP_STATUS from 'http-status-codes';

import { joiValidation } from '@globals/decorators/joi-validation.decorators';
import { newDirectorateSchema } from '@directorate/schema/directorate';
import { IDirectorateDocument } from '@directorate/interfaces/directorate.interface';
import { directorateService } from '@service/db/directorate.service';


export class Create {

  @joiValidation(newDirectorateSchema)
  public async post(req: Request, res: Response): Promise<void> {
    const { name, code, description, avatar, phone, address, email, website, organizationId } = req.body;

    const createDirectorate: IDirectorateDocument = {
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
    const directorate = await directorateService.checkDirectorate(createDirectorate);

    if (directorate) {
      res.status(HTTP_STATUS.CONFLICT).json({ message: 'Directorate already exists' });
      return;
    }

    // check if directorate exists if organizationId is null
    const directorateById = await directorateService.checkDirectorateById(organizationId);

    if (directorateById) {
      res.status(HTTP_STATUS.CONFLICT).json({ message: 'Directorate already exists' });
      return;
    }

    await directorateService.createDirectorate(createDirectorate);


    res.status(HTTP_STATUS.CREATED).json({ message: 'Directorate created successfully' });

  }
}
