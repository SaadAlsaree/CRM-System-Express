import { Request, Response } from 'express';
import HTTP_STATUS from 'http-status-codes';

import { departmentService } from '@service/db/department.service';



export class Get {
  public async Departments(req: Request, res: Response): Promise<void> {
    const { organizationId } = req.params;
    const departments = await departmentService.getDepartments(organizationId);
    const count = await departmentService.getDepartmentCount(organizationId);

    res.status(HTTP_STATUS.OK).json({ message: 'All departments', departments, Count: count });
  }

  public async GetById(req: Request, res: Response): Promise<void> {
    const { departmentId } = req.params;
    const department = await departmentService.getDepartmentById(departmentId);

    res.status(HTTP_STATUS.OK).json({ message: 'Department', department });
  }

  public async Count(req: Request, res: Response): Promise<void> {
    const { departmentId } = req.params;
    const count = await departmentService.getUserCountInDepartment(departmentId);

    res.status(HTTP_STATUS.OK).json({ message: 'Department count', Total: count });
  }
}
