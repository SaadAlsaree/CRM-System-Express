import { Request, Response } from 'express';
import HTTP_STATUS from 'http-status-codes';

import { departmentService } from '@service/db/department.service';

export class Delete {
  public async department(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    await departmentService.deleteDepartment(id);

    res.status(HTTP_STATUS.OK).json({ message: 'Delete Department Success' });
  }
}
