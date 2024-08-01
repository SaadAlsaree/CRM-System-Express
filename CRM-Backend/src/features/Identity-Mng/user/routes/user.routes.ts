import { authMiddleware } from '@globals/helpers/auth-middleware';
import { Get } from '@user/controllers/get-users';
import { Search } from '@user/controllers/search-user';
import { UpdateBasic } from '@user/controllers/update-basic';
import { UpdateUserInfo } from '@user/controllers/update-info';
import { UpdateSettings } from '@user/controllers/update-settings';
import express, { Router } from 'express';

class UserRoutes {
  private router = Router();

  constructor() {
    this.router = express.Router();
  }

  public routes(): Router {
    // User routes
    this.router.get('/users/all/:page', Get.prototype.all);
    this.router.get('/users/:userId', Get.prototype.byId);
    this.router.get('/users/organization/:organizationId/:page', Get.prototype.byOrganization);
    this.router.get('/users/department/:departmentId/:page', Get.prototype.byDepartment);
    this.router.get('/users/search/:query', Search.prototype.user);
    this.router.get('/users/profile/:authId', Get.prototype.profile);

    // Update user basic info
    this.router.put('/users/update/basic/:authId', UpdateBasic.prototype.Put);
    // Update user is active
    this.router.put('/users/update/active/:authId', authMiddleware.checkRole('User'), UpdateBasic.prototype.isActive);
    // Update user is deleted
    this.router.put('/users/update/delete/:authId', UpdateBasic.prototype.isDeleted);

    // Update user info
    this.router.put('/users/update/info/:userId', UpdateUserInfo.prototype.Put);
    // Update user avatar
    this.router.put('/users/update/avatar/:userId', UpdateUserInfo.prototype.updateAvatar);
    // Update user settings
    this.router.put('/users/update/settings/:userId', UpdateSettings.prototype.notification);





    return this.router;
  }
}


export const userRoutes: UserRoutes = new UserRoutes();
