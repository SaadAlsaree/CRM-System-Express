import { Request, Response } from 'express';
import HTTP_STATUS from 'http-status-codes';

import { organizationService } from '@service/db/organization.service';
import { IDepartmentDocument } from '@organization/interfaces/organization.interface';


export class Update {
  public async department(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const { name, code, description, organization } = req.body;

    const departmentUpdate: IDepartmentDocument = {
      name,
      code,

      description,
      organization
    } as IDepartmentDocument;

    await organizationService.updateDepartment(id, departmentUpdate);

    res.status(HTTP_STATUS.OK).json({ message: 'Update Department Success' });
  }
}
