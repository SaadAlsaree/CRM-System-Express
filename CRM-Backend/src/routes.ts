import { Application } from 'express';

import { departmentRoutes } from '@organization/routes/department.routes';
import { organizationRoutes } from '@organization/routes/organization.routes';
import { roleRoutes } from '@auth/routes/role.routes';
import { rankRoutes } from '@auth/routes/rank.routes';
import { authRoutes } from '@auth/routes/auth.routes';
import { authMiddleware } from '@globals/helpers/auth-middleware';
import { currentUserRoutes } from '@auth/routes/current.routes';

const BASE_PATH = '/api/v1';

export default (app: Application) => {
  const routes = () => {

    // auth routes
    //Auth
    app.use(BASE_PATH, authRoutes.routes());
    // role
    app.use(BASE_PATH, authMiddleware.verifyUser, roleRoutes.routes());
    //rank
    app.use(BASE_PATH, authMiddleware.verifyUser, rankRoutes.routes());
    //Current User
    app.use(BASE_PATH, authMiddleware.verifyUser, currentUserRoutes.routes());
    // Organization routes
    app.use(BASE_PATH, authMiddleware.verifyUser, organizationRoutes.routes());
    app.use(BASE_PATH, authMiddleware.verifyUser, departmentRoutes.routes());

  };
  routes();
};
