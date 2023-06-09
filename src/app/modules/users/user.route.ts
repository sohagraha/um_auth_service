import express from 'express'
import { UserController } from './user.controller'

const userRouter = express.Router()

userRouter.post('/create-user', UserController.createUser)

export const userRoutes = userRouter
