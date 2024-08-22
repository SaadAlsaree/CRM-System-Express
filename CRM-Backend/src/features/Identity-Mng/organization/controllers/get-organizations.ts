import { Request, Response } from 'express';
import HTTP_STATUS from 'http-status-codes';

import { organizationService } from '@service/db/organization.service';
import { IOrganizationDocument } from '@organization/interfaces/organization.interface';
import { IAuthDocument } from '@auth/interfaces/auth.interface';
import { Helpers } from '@globals/helpers/helpers';

const PAGE_SIZE = 10;


export class Get {
  public async organizations(req: Request, res: Response): Promise<void> {
    const organizations = await organizationService.getOrganizations();
    const count = await organizationService.getOrganizationCount();

    res.status(HTTP_STATUS.OK).json({ message: 'All organizations', organizations, Count: count });
  }

  public async organization(req: Request, res: Response): Promise<void> {

    const { id, page } = req.params;

    const search: string = req.query.userLogin as string || '';
    const userLogin = new RegExp(Helpers.escapeRegex(search), 'i');
    const skip: number = (parseInt(page) - 1) * PAGE_SIZE;
    const limit: number = PAGE_SIZE * parseInt(page);
    const newSkip: number = skip === 0 ? skip : skip + 1;


    const organization: IOrganizationDocument = await organizationService.getOrganizationById(id) as IOrganizationDocument;

    const users: IAuthDocument[] = await organizationService.getUsersInOrganization(id, userLogin, newSkip, limit) as IAuthDocument[];

    res.status(HTTP_STATUS.OK).json({ message: 'Organization', Organization: organization, Users: users });
  }

  public async CountOrg(req: Request, res: Response): Promise<void> {
    const id = req.params.organizationId;

    const count: number = await organizationService.getUserCountInOrganization(id);

    res.status(HTTP_STATUS.OK).json({ message: 'Organization count', Total: count });
  }
}
