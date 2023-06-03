import express, { Application } from 'express'
import cors from 'cors'
import userRouter from './app/modules/users/users.route'
import ApiError from './errors/ApiError'
import globalErrorHandler from './app/middlewares/globalErrorHandler'
const app: Application = express()

app.use(cors())

app.use(express.json())

app.use(express.urlencoded({ extended: true }))

// application routes
app.use('/api/v1/users', userRouter)

app.get('/', (req, res, next) => {
  //   throw new ApiError(404, 'Not Found')
  next(new ApiError(404, 'Not Found'))
})

app.use(globalErrorHandler)

export default app
