import { NextFunction, Request, Response } from 'express';
import JWT from 'jsonwebtoken';

import { NotAuthorizedError } from '@globals/helpers/error-handler';
import { AuthPayload } from '@auth/interfaces/auth.interface';
import { config } from '@root/config';

export class AuthMiddleware {
  public verifyUser(req: Request, res: Response, next: NextFunction): void {
    if (!req.session?.jwt) {
      console.log(req.session?.jwt);
      throw new NotAuthorizedError('Token is not available. Please login again.');
    }

    try {
      const payload: AuthPayload = JWT.verify(req.session?.jwt, config.JWT_TOKEN!) as AuthPayload;

      req.currentUser = payload;
    } catch (error) {
      throw new NotAuthorizedError('Token is invalid. Please login again.');
    }
    next();
  }

  public checkAuthentication(req: Request, res: Response, next: NextFunction): void {
    if (!req.currentUser) {
      throw new NotAuthorizedError('Authentication is required to access this route.');
    }
    next();
  }

  public checkAuthorization(roles: string[]) {
    return (req: Request, res: Response, next: NextFunction): void => {
      if (!req.currentUser || !req.currentUser.role.some(userRole => roles.includes(userRole))) {
        throw new NotAuthorizedError('You are not authorized to access this route.');
      }
      next();
    };
  }

  public checkRole(role: string) {
    return (req: Request, res: Response, next: NextFunction): void => {
      if (!req.currentUser || !req.currentUser.role.includes(role)) {
        throw new NotAuthorizedError('You are not authorized to access this route.');
      }
      next();
    };
  }

  public checkActivated(req: Request, res: Response, next: NextFunction): void {

    if (!req.currentUser?.isActivated) {
      throw new NotAuthorizedError('Your account is not activated. Please contact your administrator.');
    }
    next();
  }
}

export const authMiddleware: AuthMiddleware = new AuthMiddleware();
