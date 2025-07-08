import express, { Request, Response } from 'express';
import cors from 'cors';
import router from './app/routes';
import notFound from './app/middlewares/not-found';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import cookieParser from 'cookie-parser';
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: [
      'http://localhost:5173',
      'https://pharma-door-frontend.vercel.app',
    ],
    credentials: true,
  }),
);
app.use(cookieParser());

app.use('/api/v1', router);
app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});
app.use(globalErrorHandler);
app.use(notFound);

export default app;
