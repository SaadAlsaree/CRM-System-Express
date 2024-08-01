import express, { Router } from 'express';

import { authMiddleware } from '@globals/helpers/auth-middleware';
import { Create } from '@organization/controllers/organization/create-organization';
import { Get } from '@organization/controllers/organization/get-organizations';
import { Update } from '@organization/controllers/organization/update-organization';
import { Delete } from '@organization/controllers/organization/delete-organization';

class OrganizationRoutes {
  private router: Router;

  constructor() {
    this.router = express.Router();
  }

  public routes(): Router {
    // Create organization route
    this.router.post('/organizations/new', authMiddleware.checkAuthentication, Create.prototype.post);
    //get organizations route
    this.router.get('/organizations', authMiddleware.checkAuthentication, Get.prototype.organizations);
    //get organization by id route
    this.router.get('/organizations/:id', authMiddleware.checkAuthentication, Get.prototype.organization);
    //update organization route
    this.router.put('/organizations/:id', authMiddleware.checkAuthentication, Update.prototype.Put);
    // delete organization route
    this.router.delete('/organizations/:id', authMiddleware.checkAuthentication, Delete.prototype.organization);
    // get user count of organization route
    this.router.get('/organizations/user-count/:organizationId', authMiddleware.checkAuthentication, Get.prototype.Count);



    return this.router;
  }
}

export const organizationRoutes: OrganizationRoutes = new OrganizationRoutes();
