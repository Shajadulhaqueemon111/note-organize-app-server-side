import { Router } from 'express';

const router = Router();

const modulesRouter = [
  {
    path: '/',
    route: router,
  },
];

modulesRouter.forEach((route) => router.use(route.path, route.route));
export default router;
