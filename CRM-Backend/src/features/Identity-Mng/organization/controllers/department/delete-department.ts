import { Request, Response } from 'express';
import HTTP_STATUS from 'http-status-codes';

import { organizationService } from '@service/db/organization.service';

export class Delete {
  public async department(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    await organizationService.deleteDepartment(id);

    res.status(HTTP_STATUS.OK).json({ message: 'Delete Department Success' });
  }
}
