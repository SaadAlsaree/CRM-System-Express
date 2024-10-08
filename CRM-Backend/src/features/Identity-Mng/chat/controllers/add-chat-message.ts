import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import HTTP_STATUS from 'http-status-codes';
import mongoose from 'mongoose';

import { UserCache } from '@service/redis/user.cache';
import { joiValidation } from '@globals/decorators/joi-validation.decorators';
import { addChatSchema } from '@chat/schema/chat';
import { IUserDocument } from '@user/interfaces/user.interface';
import { UploadApiResponse } from 'cloudinary';
import { uploads } from '@globals/helpers/cloudinary-upload';
import { BadRequestError } from '@globals/helpers/error-handler';
import { IMessageData, IMessageNotification } from '@chat/interfaces/chat.interface';
import { socketIOChatObject } from '@socket/chat';
import { INotificationTemplate } from '@notification/interfaces/notification.interface';
import { notificationTemplate } from '@service/emails/templates/notifications/notification-template';
import { emailQueue } from '@service/queues/email.queue';
import { MessageCache } from '@service/redis/message.cache';
import { chatQueue } from '@service/queues/chat.queue';

const userCache: UserCache = new UserCache();
const messageCache: MessageCache = new MessageCache();

export class Add {
   @joiValidation(addChatSchema)
   public async message(req: Request, res: Response): Promise<void> {
      const {
         conversationId,
         receiverId,
         receiverUsername,
         receiverAvatarColor,
         receiverProfilePicture,
         body,
         gifUrl,
         isRead,
         selectedImage
      } = req.body;

      let fileUrl = '';
      const messageObjectId: ObjectId = new ObjectId();
      const conversationObjectId: ObjectId = !conversationId ? new ObjectId() : new mongoose.Types.ObjectId(conversationId);

      const sender: IUserDocument = (await userCache.getUserFromCache(`${req.currentUser?.userId}`)) as IUserDocument;

      if (selectedImage.length) {
         const result: UploadApiResponse = (await uploads(req.body.image, req.currentUser!.userId, true, true)) as UploadApiResponse;
         if (!result?.public_id) {
            throw new BadRequestError(result.message);
         }
         fileUrl = `https://res.cloudinary.com/dyamr9ym3/image/upload/v${result.version}/${result.public_id}`;
      }

      const messageData: IMessageData = {
         _id: `${messageObjectId}`,
         conversationId: new mongoose.Types.ObjectId(conversationObjectId),
         receiverId,
         receiverAvatarColor,
         receiverProfilePicture,
         receiverUsername,
         senderUsername: `${req.currentUser!.username}`,
         senderId: `${req.currentUser!.userId}`,
         senderAvatarColor: `${req.currentUser!.avatarColor}`,
         senderProfilePicture: `${sender.profilePicture}`,
         body,
         isRead,
         gifUrl,
         selectedImage: fileUrl,
         reaction: [],
         deleteForEveryone: false,
         deleteForMe: false
      };

      Add.prototype.emitSocketIOEvent(messageData);

      if (!isRead) {
         Add.prototype.messageNotification({
            currentUser: req.currentUser!,
            message: body,
            receiverName: receiverUsername,
            receiverId,
            messageData
         });
      }

      // add sender to chat list
      await messageCache.addChatListToCache(`${req.currentUser!.userId}`, `${receiverId}`, `${conversationObjectId}`);
      // add receiver to chat list
      await messageCache.addChatListToCache(`${receiverId}`, `${req.currentUser!.userId}`, `${conversationObjectId}`);
      // add message data to cache
      await messageCache.addChatMessageToCache(`${conversationObjectId}`, messageData);
      // add message to chat queue
      chatQueue.addChatJob('addChatMessageToDB', messageData);

      res.status(HTTP_STATUS.OK).json({ message: 'Message added', conversationId: conversationObjectId });
   }

   public async addChatUsers(req: Request, res: Response): Promise<void> {
      const chatUsers = await messageCache.addChatUsersToCache(req.body);
      socketIOChatObject.emit('add chat users', chatUsers);
      res.status(HTTP_STATUS.OK).json({ message: 'Users added' });
   }

   public async removeChatUsers(req: Request, res: Response): Promise<void> {
      const chatUsers = await messageCache.removeChatUsersFromCache(req.body);
      socketIOChatObject.emit('add chat users', chatUsers);
      res.status(HTTP_STATUS.OK).json({ message: 'Users removed' });
   }

   private emitSocketIOEvent(data: IMessageData): void {
      socketIOChatObject.emit('message received', data);
      socketIOChatObject.emit('chat list', data);
   }

   private async messageNotification({ currentUser, message, receiverName, receiverId }: IMessageNotification): Promise<void> {
      const cachedUser: IUserDocument = (await userCache.getUserFromCache(`${receiverId}`)) as IUserDocument;

      if (cachedUser.notifications.messages) {
         const templateParams: INotificationTemplate = {
            username: receiverName,
            message,
            header: `Message notification from ${currentUser.username}`
         };

         const template: string = notificationTemplate.notificationMessageTemplate(templateParams);
         emailQueue.addEmailJob('directMessageEmail', {
            receiverEmail: cachedUser.email!,
            template,
            subject: `You've received messages from ${currentUser.username}`
         });
      }
   }
}
