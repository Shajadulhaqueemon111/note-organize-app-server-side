import { Router } from 'express';
import { NoteRouter } from '../modules/createNote/note.route';

const router = Router();

const modulesRouter = [
  {
    path: '/notes',
    route: NoteRouter,
  },
];

modulesRouter.forEach((route) => router.use(route.path, route.route));
export default router;
