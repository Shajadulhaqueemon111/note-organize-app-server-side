import { Router } from 'express';
import { NoteRouter } from '../modules/createNote/note.route';
import { userRoute } from '../modules/user/user.route';
import { LoginRouetr } from '../modules/auth/auth.route';

const router = Router();

const modulesRouter = [
  {
    path: '/notes',
    route: NoteRouter,
  },
  {
    path: '/user',
    route: userRoute,
  },
  {
    path: '/auth',
    route: LoginRouetr,
  },
];

modulesRouter.forEach((route) => router.use(route.path, route.route));
export default router;
