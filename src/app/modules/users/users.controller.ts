import { NextFunction, Request, Response } from 'express'
import usersService from './users.service'

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { user } = req.body
    const newUser = await usersService.createUser(user)
    res.status(201).json({
      success: true,
      data: newUser,
    })
  } catch (err) {
    next(err)
  }
}

export default {
  createUser,
}
