import mongoose from "mongoose";
import { createServer, Server } from "http";
import { Server as WebsocketIOServer } from "socket.io";

import app from "./app";
import config from "./configs/config";
import logger from "./configs/logger";
import { getSocketIP } from "./utils/socket";
import registerRoutes from "./middlewares/socket/routes";

let server: Server;
mongoose
  .connect(config.mongoose.url)
  .then(() => {
    logger.info("Connected to MongoDB");
    const httpServer = createServer(app.callback());
    const io = new WebsocketIOServer(httpServer, {
      cors: {
        origin: "*",
        credentials: false,
      },
      pingTimeout: 10000,
      pingInterval: 5000,
    });

    io.on("connection", (socket) => {
      logger.info(getSocketIP(socket));

      socket.on("disconnect", () => {
        logger.info(`disconnect ${socket.id}`);
      });

      socket.use(registerRoutes(socket));
    });

    server = httpServer.listen(config.port, () => {
      logger.info(`Listening to port ${config.port}`);
    });
  })
  .catch((error) => {
    logger.error(error);
  });

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info("Server closed");
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error: Error) => {
  logger.error(error);
  exitHandler();
};

process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);

process.on("SIGTERM", () => {
  logger.info("SIGTERM received");

  if (server) {
    server.close();
  }
});
