import { RequestHandler } from 'express';
import { UserService } from './user.service';

const createUser: RequestHandler = async (req, res, next) => {
  try {
    // request validation by zod

    const { user } = req.body;
    const newUser = await UserService.createUser(user);
    res.status(201).json({
      success: true,
      data: newUser,
    });
  } catch (error) {
    next(error);
  }
};

export const UserController = {
  createUser,
};
