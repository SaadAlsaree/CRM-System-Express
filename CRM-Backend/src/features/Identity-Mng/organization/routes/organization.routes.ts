import express, { Router } from 'express';

// import { authMiddleware } from '@globals/helpers/auth-middleware';
import { Create } from '@organization/controllers/create-organization';
import { Get } from '@organization/controllers/get-organizations';
import { Update } from '@organization/controllers/update-organization';
import { Delete } from '@organization/controllers/delete-organization';

class OrganizationRoutes {
  private router: Router;

  constructor() {
    this.router = express.Router();
  }

  public routes(): Router {
    // Create organization route
    this.router.post('/organizations/new', Create.prototype.post);
    //get organizations route
    this.router.get('/organizations', Get.prototype.organizations);
    //get organization by id route
    this.router.get('/organizations/:id/:page', Get.prototype.organization);
    //update organization route
    this.router.put('/organizations/:id', Update.prototype.Put);
    // delete organization route
    this.router.delete('/organizations/:id', Delete.prototype.organization);
    // get user count of organization route
    this.router.get('/organizations/user-count/:organizationId', Get.prototype.Count);



    return this.router;
  }
}

export const organizationRoutes: OrganizationRoutes = new OrganizationRoutes();
