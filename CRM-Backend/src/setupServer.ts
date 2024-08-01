import { Application, json, urlencoded, Response, Request, NextFunction } from 'express';
import http from 'http';
import cors from 'cors';
import helmet from 'helmet';
import hpp from 'hpp';
import cookieSession from 'cookie-session';
import compression from 'compression';
import Logger from 'bunyan';
import HTTP_STATUS from 'http-status-codes';
import { Server } from 'socket.io';
import { createClient } from 'redis';
import { createAdapter } from '@socket.io/redis-adapter';
import morgan from 'morgan';
import 'express-async-errors';
import apiStats from 'swagger-stats';

import { config } from '@root/config';
import applicationRoutes from './routes';
import { CustomError, IErrorResponse } from '@globals/helpers/error-handler';

const log: Logger = config.createLogger('Server Setup');

//Initialization Port
const SERVER_PORT = 5000;

export class M14Platform {
  private app: Application;

  constructor(app: Application) {
    this.app = app;
  }

  // Initializes the platform Starting the server
  public start(): void {
    this.securityMiddleware(this.app);
    this.standardMiddleware(this.app);
    this.routesMiddleware(this.app);
    this.apiMonitoring(this.app);
    this.globalErrorHandler(this.app);
    this.startServer(this.app);
  }

  // Initializes Security Middleware
  private securityMiddleware(app: Application): void {
    app.use(
      cookieSession({
        name: 'ERM-Session',
        keys: [config.SECRET_KEY_TWO!, config.SECRET_KEY_ONE!],
        maxAge: 24 * 7 * 3600000,
        httpOnly: true,
        secure: false,
      })
    );
    app.use(hpp());
    app.use(helmet());
    app.use(
      cors({
        origin: 'http://localhost:3000',
        credentials: true,
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        // preflightContinue: false,
        optionsSuccessStatus: 200
      })
    );
  }

  // Initializes the Stander middleware
  private standardMiddleware(app: Application): void {
    app.use(compression());
    app.use(json({ limit: '50mb' }));
    app.use(urlencoded({ extended: true, limit: '50mb' }));
    if (config.NODE_ENV === 'development') {
      app.use(morgan('dev'));
    }
  }

  // Initializes the Routes middleware
  private routesMiddleware(app: Application): void {
    applicationRoutes(app);
  }

  // swagger stats
  private apiMonitoring(app: Application): void {
    app.use(
      apiStats.getMiddleware({
        uriPath: '/api-monitoring'
      })
    );
  }

  // Initializes the Global Error Handler
  private globalErrorHandler(app: Application): void {
    app.all('*', (req: Request, res: Response) => {
      res.status(HTTP_STATUS.NOT_FOUND).json({ message: `${req.originalUrl} not found` });
    });

    app.use((error: IErrorResponse, _req: Request, res: Response, next: NextFunction) => {
      log.error(error);
      if (error instanceof CustomError) {
        return res.status(error.statusCode).json(error.serializeErrors());
      }
      next();
    });
  }

  // Initializes Starting the server
  private async startServer(app: Application): Promise<void> {
    try {
      const httpServer: http.Server = new http.Server(app);
      const socketIO: Server = await this.createSocketIO(httpServer);
      this.startHttpServer(httpServer);
      this.socketIOConnection(socketIO);
    } catch (error) {
      log.error(error);
    }
  }

  // Initializes the Socket.IO
  private async createSocketIO(httpServer: http.Server): Promise<Server> {
    const io: Server = new Server(httpServer, {
      cors: {
        origin: config.CLIENT_URL,
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE'
      }
    });
    const pubClient = createClient({ url: config.REDIS_HOST });
    const subClient = pubClient.duplicate();
    await Promise.all([pubClient.connect(), subClient.connect()]);
    io.adapter(createAdapter(pubClient, subClient));
    return io;
  }

  // Initializes the HTTP Server
  private startHttpServer(httpServer: http.Server): void {
    log.info(`Starting HTTP Server with process ${process.pid}`);
    httpServer.listen(SERVER_PORT, () => {
      log.info(`Server is running on port ${SERVER_PORT}`);
    });
  }

  // Initializes Socket.IO Connection
  private socketIOConnection(io: Server): void {
    log.info('io connection');
    // const postSocketHandler: SocketIOPostHandler = new SocketIOPostHandler(io);
    // const socketIOFollowerHandler: SocketIOFollowerHandler = new SocketIOFollowerHandler(io);
    // const socketIOUserHandler: SocketIOUserHandler = new SocketIOUserHandler(io);
    // const socketIOChatHandler: SocketIOChatHandler = new SocketIOChatHandler(io);
    // const socketIONotificationHandler: SocketIONotificationHandler = new SocketIONotificationHandler();
    // const socketIOImageHandler: SocketIOImageHandler = new SocketIOImageHandler();
    // const socketIOTaskHandler: SocketIOTaskHandler = new SocketIOTaskHandler();

    // postSocketHandler.listen();
    // socketIOFollowerHandler.listen();
    // socketIOUserHandler.listen();
    // socketIOChatHandler.listen();
    // socketIONotificationHandler.listen(io);
    // socketIOImageHandler.listen(io);
    // socketIOTaskHandler.listen(io);
  }
}
