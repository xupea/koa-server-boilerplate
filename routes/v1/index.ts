import Router from "@koa/router";

import userRoute from "./user.route";
import groupRoute from "./group.route";

const rootRouter = new Router();

const defaultRoutes = [
  { path: "/users", router: userRoute },
  {
    path: "/groups",
    router: groupRoute,
  },
];

defaultRoutes.forEach(({ path, router }) => {
  rootRouter.use(path, router.routes());
});

export default rootRouter;
