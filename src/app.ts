import express, { Application } from 'express'
import cors from 'cors'
// import ApiError from './errors/ApiError'
import globalErrorHandler from './app/middlewares/globalErrorHandler'
import { userRoutes } from './app/modules/users/user.route'
const app: Application = express()

app.use(cors())

app.use(express.json())

app.use(express.urlencoded({ extended: true }))

// application routes
app.use('/api/v1/users', userRoutes)

// app.get('/', async (req, res, next) => {
//   // throw new ApiError(404, 'Not Found')
//   // next(new ApiError(404, 'Not Found'))
//   Promise.reject(new Error('Something went wrong'))
// })

app.use(globalErrorHandler)

export default app
