import { Request, Response } from 'express';
import HTTP_STATUS from 'http-status-codes';

import { organizationService } from '@service/db/organization.service';



export class Get {
  public async Departments(req: Request, res: Response): Promise<void> {
    const { organizationId } = req.params;
    const departments = await organizationService.getDepartments(organizationId);
    const count = await organizationService.getDepartmentCount(organizationId);

    res.status(HTTP_STATUS.OK).json({ message: 'All departments', departments, Count: count });
  }

  public async GetById(req: Request, res: Response): Promise<void> {
    const { departmentId } = req.params;
    const department = await organizationService.getDepartmentById(departmentId);

    res.status(HTTP_STATUS.OK).json({ message: 'Department', department });
  }
}
