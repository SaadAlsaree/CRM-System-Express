import express, { Router } from 'express';

import { Create } from '@department/controllers/create-department';
import { Delete } from '@department/controllers/delete-department';
import { Get } from '@department/controllers/get-department';
import { Update } from '@department/controllers/update-department';

class DepartmentRoutes {


  private router: Router;

  constructor() {
    this.router = express.Router();
  }

  public routes(): Router {

    // Create department route
    this.router.post('/departments/new', Create.prototype.department);
    // get departments route
    this.router.get('/departments/:organizationId', Get.prototype.Departments);
    // get department by id route
    this.router.get('/department/:departmentId', Get.prototype.GetById);
    // update department route
    this.router.put('/departments/:id', Update.prototype.department);
    // delete department route
    this.router.delete('/departments/:id', Delete.prototype.department);
    // get user count of department route
    this.router.get('/departments/user-count/:departmentId', Get.prototype.Count);


    return this.router;
  }
}

export const departmentRoutes: DepartmentRoutes = new DepartmentRoutes();
