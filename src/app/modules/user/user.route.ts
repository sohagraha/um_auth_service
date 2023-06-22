import express from 'express';
import { UserController } from './user.controller';
import { UserValidation } from './user.validation';
import validateRequest from '../../middlewares/validateRequest';

const userRouter = express.Router();

// userRouter.post(
//   '/create-user',
//   validateRequest(UserValidation.createUserZodSchema),
//   UserController.createUser
// );

userRouter.post(
  '/create-student',
  validateRequest(UserValidation.createStudentZodSchema),
  UserController.createStudent
);

userRouter.post(
  '/create-faculty',
  validateRequest(UserValidation.createFacultyZodSchema),
  UserController.createFaculy
);

userRouter.post(
  '/create-admin',
  validateRequest(UserValidation.createAdminZodSchema),
  UserController.createAdmin
);

export const userRoutes = userRouter;
