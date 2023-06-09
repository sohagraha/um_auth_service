import { Server } from 'http'
import mongoose from 'mongoose'
import app from './app'
import config from './config'
import { errorLogger, logger } from './shared/logger'

// Uncaught Exception
process.on('uncaughtException', error => {
  errorLogger.error(`Uncaught Exception: ${error}`)
  process.exit(1)
})

let server: Server
async function connect() {
  try {
    await mongoose.connect(config.DATABASE_URL as string)
    logger.info('Connected to database')
    server = app.listen(config.PORT, () => {
      logger.info(`Server is running on port ${config.PORT}`)
    })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    errorLogger.error(`Error connecting to database: ${error.message}`)
  }

  process.on('unhandledRejection', error => {
    // errorLogger.error(`Uncaught Exception: ${error.message}`)
    if (server) {
      server.close(() => {
        errorLogger.error(`Unhandle Rejection: ${error}`)
        process.exit(1)
      })
    } else {
      process.exit(1)
    }
  })
}

connect()

process.on('SIGTERM', () => {
  logger.info('SIGTERM received')
  if (server) {
    server.close()
  }
})
