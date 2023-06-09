import mongoose from 'mongoose'
import app from './app'
import config from './config'
import { logger, errorLogger } from './shared/logger'
import { Server } from 'http'

async function connect() {
  let server: Server
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
    console.log('error......................')
    if (server) {
      server.close(() => {
        errorLogger.error(`Unhandle Exception: ${error}`)
        process.exit(1)
      })
    } else {
      process.exit(1)
    }
  })
}

connect()
