import { Application } from 'express';

import { departmentRoutes } from '@department/routes/department.routes';
import { organizationRoutes } from '@organization/routes/organization.routes';
import { roleRoutes } from '@auth/routes/role.routes';
import { rankRoutes } from '@auth/routes/rank.routes';
import { authRoutes } from '@auth/routes/auth.routes';
import { authMiddleware } from '@globals/helpers/auth-middleware';
import { currentUserRoutes } from '@auth/routes/current.routes';
import { userRoutes } from '@user/routes/user.routes';
import { directorateRoutes } from '@directorate/routes/directorate.routes';
import { notificationRoutes } from '@notification/routes/notificationRoutes';
import { serverAdapter } from '@service/queues/base.queue';

const BASE_PATH = '/api/v1';

export default (app: Application) => {
  const routes = () => {

    app.use('/queues', serverAdapter.getRouter());
    // auth routes
    //Auth
    app.use(BASE_PATH, authRoutes.routes());
    // role
    app.use(BASE_PATH, roleRoutes.routes());
    //rank
    app.use(BASE_PATH, rankRoutes.routes());
    // Organization routes
    app.use(BASE_PATH, organizationRoutes.routes());
    app.use(BASE_PATH, directorateRoutes.routes());
    app.use(BASE_PATH, departmentRoutes.routes());
    // Notification routes
    app.use(BASE_PATH, authMiddleware.verifyUser, notificationRoutes.routes());
    //Current User
    app.use(BASE_PATH, authMiddleware.verifyUser, currentUserRoutes.routes());
    // user routes
    app.use(BASE_PATH, authMiddleware.verifyUser, userRoutes.routes());

  };
  routes();
};
