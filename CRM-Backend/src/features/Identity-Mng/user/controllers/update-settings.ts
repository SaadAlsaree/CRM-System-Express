import { Request, Response } from 'express';
import HTTP_STATUS from 'http-status-codes';

import { userServices } from '@service/db/user.service';
import { INotificationSettings } from '@user/interfaces/user.interface';


export class UpdateSettings {

  public async notification(req: Request, res: Response): Promise<void> {
    const { userId } = req.params;
    const { comments, follows, messages, cases, tasks, tickets } = req.body as INotificationSettings;
    // check if user exists
    const user = await userServices.getUserById(userId);

    if (!user) {
      res.status(HTTP_STATUS.NOT_FOUND).json({ message: 'User not found' });
      return;
    }

    await userServices.updateNotificationSettings(userId, { comments, follows, messages, cases, tasks, tickets });

    res.status(HTTP_STATUS.OK).json({ message: 'Notification settings updated' });

  }
}
