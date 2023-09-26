import { Socket } from "socket.io";
import assert from "assert";

import logger from "../../configs/logger";

import * as messageRoutes from "../../routes/socket/message";
import { getSocketIP } from "../../utils/socket";

const routes: Routes = {
  ...messageRoutes,
};
Object.keys(routes).forEach((key) => {
  if (key.startsWith("_")) {
    routes[key] = null;
  }
});

function defaultCallback() {
  logger.error("Server Error: emit event with callback");
}

export default function registerRoutes(socket: Socket) {
  return async ([event, data, cb = defaultCallback]: MiddlewareArgs) => {
    const route = routes[event];
    if (route) {
      try {
        const ctx: Context<any> = {
          data,
          socket: {
            id: socket.id,
            ip: getSocketIP(socket),
            get user() {
              return socket.data.user;
            },
            set user(newUserId: string) {
              socket.data.user = newUserId;
            },
            get isAdmin() {
              return socket.data.isAdmin;
            },
            join: socket.join.bind(socket),
            leave: socket.leave.bind(socket),
            emit: (target, _event, _data) => {
              socket.to(target).emit(_event, _data);
            },
          },
        };
        const before = Date.now();
        const res = await route(ctx);
        const after = Date.now();
        logger.info(
          `[${event}]`,
          after - before,
          ctx.socket.id,
          ctx.socket.user || "null",
          typeof res === "string" ? res : "null"
        );
        cb(res);
      } catch (err) {
        if (err instanceof assert.AssertionError) {
          cb(err.message);
        } else if (err instanceof Error) {
          logger.error(`[${event}]`, err.message);
          cb(`Server Error: ${err.message}`);
        }
      }
    } else {
      cb(`Server Error: event [${event}] not exists`);
    }
  };
}
