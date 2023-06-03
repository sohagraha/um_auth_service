import mongoose from 'mongoose'
import app from './app'
import config from './config'
import { logger, errorLogger } from './shared/logger'

async function connect() {
  try {
    await mongoose.connect(config.DATABASE_URL as string)
    logger.info('Connected to database')
    app.listen(config.PORT, () => {
      logger.info(`Server is running on port ${config.PORT}`)
    })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    errorLogger.error(`Error connecting to database: ${error.message}`)
  }
}

connect()
