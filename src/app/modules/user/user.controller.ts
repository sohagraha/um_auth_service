import { Request, RequestHandler, Response } from 'express';
import { UserService } from './user.service';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';

const createUser: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { ...user } = req.body;
    const newUser = await UserService.createUser(user);
    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      data: newUser,
      message: 'User created successfully',
    });
    // next();
  }
);

export const UserController = {
  createUser,
};
