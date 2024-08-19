import { Request, Response } from 'express';
import HTTP_STATUS from 'http-status-codes';

import { joiValidation } from '@globals/decorators/joi-validation.decorators';
import { newOrganizationSchema } from '@organization/schema/organization';
import { IOrganizationDocument } from '@organization/interfaces/organization.interface';
import { organizationService } from '@service/db/organization.service';

export class Create {
  @joiValidation(newOrganizationSchema)
  public async post(req: Request, res: Response): Promise<void> {
    const { name, code, description, avatar, phone, address, email, website } = req.body;

    const createOrganization: IOrganizationDocument = {
      name,
      code,
      phone,
      address,
      email,
      website,
      description,
      avatar,
    } as IOrganizationDocument;

    // Check if organization already exists
    const organization = await organizationService.checkOrganization(createOrganization);

    if (organization) {
      res.status(HTTP_STATUS.CONFLICT).json({ message: 'Organization already exists' });
      return;
    }

    await organizationService.createOrganization(createOrganization);

    res.status(HTTP_STATUS.CREATED).json({ message: 'Organization created successfully' });
  }
}
