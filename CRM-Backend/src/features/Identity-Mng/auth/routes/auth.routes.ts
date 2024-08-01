import { Create } from '@auth/controllers/auth/create-auth';
import { Login } from '@auth/controllers/auth/login';
import { Logout } from '@auth/controllers/auth/logout';
import express, { Router } from 'express';

class AuthRoutes {

  private router = Router();

  constructor() {
    this.router = express.Router();
  }

  public routes(): Router {
    // Auth routes
    this.router.post('/auth/login', Login.prototype.Post);
    this.router.post('/auth/new', Create.prototype.Post);
    this.router.post('/auth/logout', Logout.prototype.update);

    return this.router;
  }
}


export const authRoutes: AuthRoutes = new AuthRoutes();
