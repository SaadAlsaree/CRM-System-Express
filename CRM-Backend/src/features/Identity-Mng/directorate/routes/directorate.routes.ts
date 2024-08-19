import { Create } from '@directorate/controllers/create-directorate';
import { Get } from '@directorate/controllers/get-directorates';
import { Update } from '@directorate/controllers/update-directorate';
import express, { Router } from 'express';

class DirectorateRoutes {
  private router: Router;

  constructor() {
    this.router = express.Router();
  }

  routes() {
    // get all directorates by organization id
    this.router.get('/directorates/:organizationId', Get.prototype.InOrg);
    // get all directorates when no organization
    this.router.get('/directorates', Get.prototype.directorates);
    // get directorate by id
    this.router.get('/directorate/:id/:page', Get.prototype.directorate);
    // create directorate
    this.router.post('/directorate/new', Create.prototype.post);
    // update directorate
    this.router.put('/directorate/update/:directorateId', Update.prototype.put);

    return this.router;
  }
}

export const directorateRoutes = new DirectorateRoutes();
