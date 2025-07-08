import { Router } from 'express';
import { NoteRouter } from '../modules/createNote/note.route';
import { userRoute } from '../modules/user/user.route';

const router = Router();

const modulesRouter = [
  {
    path: '/notes',
    route: NoteRouter,
  },
  {
    path: '/auth',
    route: userRoute,
  },
];

modulesRouter.forEach((route) => router.use(route.path, route.route));
export default router;
