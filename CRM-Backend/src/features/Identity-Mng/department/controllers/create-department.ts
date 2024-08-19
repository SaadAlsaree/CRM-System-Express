import { IDepartmentDocument } from '@department/interfaces/department.interface';
import { newDepartmentSchema } from '@department/schema/department';
import { joiValidation } from '@globals/decorators/joi-validation.decorators';
import { departmentService } from '@service/db/department.service';
import { directorateService } from '@service/db/directorate.service';
import { organizationService } from '@service/db/organization.service';
import { Request, Response } from 'express';
import HTTP_STATUS from 'http-status-codes';




export class Create {
  @joiValidation(newDepartmentSchema)
  public async department(req: Request, res: Response): Promise<void> {

    const { name, code, description, organizationId, directorateId, email, phone } = req.body;

    const departmentCreate: IDepartmentDocument = {
      name,
      code,
      email,
      phone,
      description,
      organizationId,
      directorateId
    } as IDepartmentDocument;


    if (organizationId) {
      // check if department exists in organization
      const organization = await organizationService.checkOrganizationById(organizationId);
      if (!organization) {
        res.status(HTTP_STATUS.NOT_FOUND).json({ message: 'Organization not found' });
        return;
      }
    }

    if (directorateId) {
      // check if department exists in directorate
      const directorate = await directorateService.checkDirectorateById(directorateId);
      if (!directorate) {
        res.status(HTTP_STATUS.NOT_FOUND).json({ message: 'Directorate not found' });
        return;
      }
    }

    await departmentService.createDepartment(departmentCreate);

    res.status(HTTP_STATUS.OK).json({ message: 'Create Department Success' });
  }
}

