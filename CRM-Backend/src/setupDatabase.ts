import mongoose from 'mongoose';
import { config } from '@root/config';
import Logger from 'bunyan';
import { redisConnection } from '@service/redis/redis.connection';

const log: Logger = config.createLogger('Database');

export default () => {
   const connect = () => {
      mongoose
         .connect(`${config.DATABASE_URI}`)
         .then(() => {
            log.info('Successfully connected to Mongo');
            redisConnection.connect();
         })
         .catch((error) => {
            log.error('Error connecting to Mongo', error);
            return process.exit(1);
         });
   };

   connect();

   mongoose.connection.on('disconnected', connect);
};
