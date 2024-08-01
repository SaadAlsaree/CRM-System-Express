import { Request, Response } from 'express';
import HTTP_STATUS from 'http-status-codes';

import { organizationService } from '@service/db/organization.service';
import { IDepartmentDocument, IOrganizationDocument } from '@organization/interfaces/organization.interface';


export class Get {
  public async organizations(req: Request, res: Response): Promise<void> {
    const organizations = await organizationService.getOrganizations();
    const count = await organizationService.getOrganizationCount();

    res.status(HTTP_STATUS.OK).json({ message: 'All organizations', organizations, Count: count });
  }

  public async organization(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const organization: IOrganizationDocument = await organizationService.getOrganizationById(id) as IOrganizationDocument;

    const orgId = organization._id.toString();

    const department: IDepartmentDocument[] = await organizationService.getDepartments(orgId) as IDepartmentDocument[];

    res.status(HTTP_STATUS.OK).json({ message: 'Organization', organization, department });
  }

  public async Count(req: Request, res: Response): Promise<void> {
    const { organizationId } = req.params;
    const count = await organizationService.getUserCountInOrganization(organizationId);

    res.status(HTTP_STATUS.OK).json({ message: 'Organization count', Total: count });
  }
}
