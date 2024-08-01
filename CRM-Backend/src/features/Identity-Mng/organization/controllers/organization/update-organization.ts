import { joiValidation } from '@globals/decorators/joi-validation.decorators';
import { IOrganizationDocument } from '@organization/interfaces/organization.interface';
import { newOrganizationSchema } from '@organization/schema/organization';
import { organizationService } from '@service/db/organization.service';
import { Request, Response } from 'express';
import HTTP_STATUS from 'http-status-codes';

export class Update {
  @joiValidation(newOrganizationSchema)
  public async Put(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const { name, code, slug, description, avatar, type, phone, address, email, website } = req.body;

    const updateOrganization: IOrganizationDocument = {
      name,
      code,
      slug,
      description,
      type,
      phone,
      address,
      email,
      website,
      avatar
    } as IOrganizationDocument;

    // Check if organization already exists
    const organizationById = await organizationService.getOrganizationById(id);

    if (!organizationById) {
      res.status(HTTP_STATUS.NOT_FOUND).json({ message: 'Organization not found' });
      return;
    }


    const organization = await organizationService.updateOrganization(id, updateOrganization);

    res.status(HTTP_STATUS.OK).json({ message: 'Organization updated', organization });
  }
}
