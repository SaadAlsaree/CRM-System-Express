import express, { Router } from 'express';

import { Create } from '@auth/controllers/role/create-role';
import { Delete } from '@auth/controllers/role/delete-role';
import { Get } from '@auth/controllers/role/get-role';
import { GetAll } from '@auth/controllers/role/get-roles';
import { Update } from '@auth/controllers/role/update-role';


class RoleRoutes {
  private router = Router();

  /**
   *
   */
  constructor() {
    this.router = express.Router();
  }

  public routes(): Router {
    // Role routes
    this.router.post('/auth/role/new', Create.prototype.Post);
    this.router.get('/auth/role/:id', Get.prototype.Role);
    this.router.get('/auth/roles', GetAll.prototype.Roles);
    this.router.delete('/auth/role/:id', Delete.prototype.Role);
    this.router.put('/auth/role/:id', Update.prototype.Put);

    return this.router;
  }
}


export const roleRoutes: RoleRoutes = new RoleRoutes();
