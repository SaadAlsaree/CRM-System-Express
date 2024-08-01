import { Request, Response } from 'express';
import HTTP_STATUS from 'http-status-codes';

import { organizationService } from '@service/db/organization.service';

export class Delete {
  public async organization(req: Request, res: Response): Promise<void> {
    const { id } = req.params;


    // check if organization exists
    const organization = await organizationService.getOrganizationById(id);

    if (!organization) {
      res.status(HTTP_STATUS.NOT_FOUND).json({ message: 'Organization not found' });
      return;
    }


    await organizationService.deleteOrganization(id);

    res.status(HTTP_STATUS.OK).json({ message: 'Organization deleted successfully' });
  }

  public async department(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    await organizationService.deleteDepartment(id);

    res.status(HTTP_STATUS.OK).json({ message: 'Department deleted successfully' });
  }
}
