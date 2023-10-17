import Router from "@koa/router";

import userRoute from "./user.route";
import groupRoute from "./group.route";
import qrCodeRoute from "./qrcode.route";

const rootRouter = new Router();

const defaultRoutes = [
  { path: "/users", router: userRoute },
  {
    path: "/groups",
    router: groupRoute,
  },
  {
    path: "/qrcode",
    router: qrCodeRoute,
  },
];

defaultRoutes.forEach(({ path, router }) => {
  rootRouter.use(path, router.routes());
});

export default rootRouter;
