
import { Request, Response } from 'express';

export class Logout {
  public async update(req: Request, res: Response): Promise<void> {
    req.session = null;
    res.status(204).json({ message: 'Logout successful', user: {}, token: '' });
  }
}
