import { Request, Response } from 'express';
import HTTP_STATUS from 'http-status-codes';

import { IAuthDocument } from '@auth/interfaces/auth.interface';
import { IDirectorateDocument } from '@directorate/interfaces/directorate.interface';
import { directorateService } from '@service/db/directorate.service';
import { Helpers } from '@globals/helpers/helpers';



const PAGE_SIZE = 12;

export class Get {
  // all directorates in an organization
  public async InOrg(req: Request, res: Response): Promise<void> {
    const organizationId = req.params.organizationId;

    const directorates: IDirectorateDocument[] = await directorateService.getDirectoratesInOrganization(organizationId);
    const count: number = await directorateService.getDirectorateCountInOrganization(organizationId);

    res.status(HTTP_STATUS.OK).json({ message: 'All directorates', Data: directorates, Count: count });
  }

  // all directorates with no organization
  public async directorates(req: Request, res: Response): Promise<void> {

    const { page } = req.params;
    const skip: number = (parseInt(page) - 1) * PAGE_SIZE;
    const limit: number = PAGE_SIZE * parseInt(page);
    const newSkip: number = skip === 0 ? skip : skip + 1;
    const directorates: IDirectorateDocument[] = await directorateService.getAllDirectorates(newSkip, limit) as IDirectorateDocument[];

    const Count: number = await directorateService.getAllDirectorateCount();

    res.status(HTTP_STATUS.OK).json({ message: 'All Directorates', Data: directorates, Count });
  }

  // get directorate by id
  public async directorate(req: Request, res: Response): Promise<void> {
    const { id, page } = req.params;

    const search: string = req.query.userLogin as string || '';
    const userLogin = new RegExp(Helpers.escapeRegex(search), 'i');
    const skip: number = (parseInt(page) - 1) * PAGE_SIZE;
    const limit: number = PAGE_SIZE * parseInt(page);
    const newSkip: number = skip === 0 ? skip : skip + 1;

    const directorate: IDirectorateDocument = await directorateService.getDirectorateById(id) as IDirectorateDocument;
    const users: IAuthDocument[] = await directorateService.getUsersInDirectorate(id, userLogin, newSkip, limit) as IAuthDocument[];
    const userCount: number = await directorateService.getUserCountInDirectorate(id);


    res.status(HTTP_STATUS.OK).json({ message: 'Directorate', Data: directorate, Users: users, userCount });
  }

}
