import { Request, Response } from 'express';
import HTTP_STATUS from 'http-status-codes';

import { organizationService } from '@service/db/organization.service';
import { IDepartmentDocument } from '@organization/interfaces/organization.interface';


export class Create {
  public async department(req: Request, res: Response): Promise<void> {

    const { name, code, slug, description, organization, email, phone } = req.body;

    const departmentCreate: IDepartmentDocument = {
      name,
      code,
      email,
      phone,
      slug,
      description,
      organization
    } as IDepartmentDocument;

    // check if department exists
    const departmentExists = await organizationService.checkDepartment(departmentCreate);

    if (departmentExists) {
      res.status(HTTP_STATUS.CONFLICT).json({ message: 'Department already exists' });
      return;
    }

    await organizationService.createDepartment(departmentCreate);

    res.status(HTTP_STATUS.OK).json({ message: 'Create Department Success' });
  }
}

