import cors from 'cors';
import express, { Application, NextFunction, Request, Response } from 'express';
// import ApiError from './errors/ApiError'
import cookieParser from 'cookie-parser';
import httpStatus from 'http-status';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import routes from './app/routes';
const app: Application = express();

app.use(cors());
app.use(cookieParser());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// application routes
app.use('/api/v1/', routes);

// app.get('/', async (req, res, next) => {
//   // throw new ApiError(404, 'Not Found')
//   // next(new ApiError(404, 'Not Found'))
//   Promise.reject(new Error('Something went wrong'))
// })

app.use(globalErrorHandler);

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Route not found on the server',
    errorMessages: [
      {
        path: req?.originalUrl,
        message: 'Route not found on the server',
      },
    ],
  });
  next();
});

// const academicSemester = {
//   title: 'dfdf',
//   year: '2020',
//   code: '01',
//   startMonth: '',
//   endMonth: '',
// };

// const result = async () => {
//   const testId = await generateStudentId(academicSemester);
//   console.log(testId);
// };

// result();

export default app;
