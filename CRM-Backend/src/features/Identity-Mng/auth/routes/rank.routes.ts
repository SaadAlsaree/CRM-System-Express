import express, { Router } from 'express';

import { Create } from '@auth/controllers/rank/create-rank';
import { Delete } from '@auth/controllers/rank/delete-rank';
import { Get } from '@auth/controllers/rank/get-rank';
import { GetAll } from '@auth/controllers/rank/get-ranks';
import { Update } from '@auth/controllers/rank/update-rank';


class RankRoutes {
  private router = Router();

  /**
   *
   */
  constructor() {
    this.router = express.Router();
  }

  public routes(): Router {
    // Rank routes
    this.router.post('/auth/rank/new', Create.prototype.Post);
    this.router.get('/auth/rank/:id', Get.prototype.Rank);
    this.router.get('/auth/ranks', GetAll.prototype.Ranks);
    this.router.delete('/auth/rank/:id', Delete.prototype.Rank);
    this.router.put('/auth/rank/:id', Update.prototype.Put);

    return this.router;
  }
}


export const rankRoutes: RankRoutes = new RankRoutes();
