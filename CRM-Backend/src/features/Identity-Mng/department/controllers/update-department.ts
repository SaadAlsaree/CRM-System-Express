import { Request, Response } from 'express';
import HTTP_STATUS from 'http-status-codes';


import { departmentService } from '@service/db/department.service';
import { IDepartmentDocument } from '@department/interfaces/department.interface';


export class Update {
  public async department(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const { name, code, description, organizationId, directorateId } = req.body;

    const departmentUpdate: IDepartmentDocument = {
      name,
      code,
      description,
      organizationId,
      directorateId
    } as IDepartmentDocument;

    await departmentService.updateDepartment(id, departmentUpdate);

    res.status(HTTP_STATUS.OK).json({ message: 'Update Department Success' });
  }
}
