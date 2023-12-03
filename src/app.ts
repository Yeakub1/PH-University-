/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { Application, Request, Response } from 'express';
import cors from 'cors';
const app: Application = express();
import { studentRoute } from './app/modules/student/student.route';
import { UserRoute } from './app/modules/User/user.route';
import globalErrorHandler from './app/middleware/globalErrorHandler';
import notFoundRoute from './app/middleware/notFountRoute';
import router from './app/routes';

// parser
app.use(express.json());
app.use(cors());


// applicaton route
app.use('/api/v1', router);


app.get('/', (req: Request, res: Response) => {
  res.send('The server is running');
})

app.use(globalErrorHandler);
// not found route
app.use(notFoundRoute);

export default app;
