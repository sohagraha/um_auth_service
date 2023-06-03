import express, { Application } from 'express'
import cors from 'cors'
import userRouter from './app/modules/users/users.route'
const app: Application = express()

app.use(cors())

app.use(express.json())

app.use(express.urlencoded({ extended: true }))

// application routes
app.use('/api/v1/users', userRouter)

export default app
