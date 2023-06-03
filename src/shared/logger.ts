import { createLogger, format, transports } from 'winston'
const { combine, timestamp, label, printf, prettyPrint } = format
import path from 'path'

const myFormat = printf(({ level, message, label, timestamp }) => {
  const date = new Date(timestamp).toLocaleString()
  return `${date} [${label}] ${level}: ${message}`
})

const logger = createLogger({
  level: 'info',
  format: combine(label({ label: 'sr' }), timestamp(), myFormat, prettyPrint()),
  transports: [
    new transports.Console(),
    new transports.File({
      // eslint-disable-next-line no-undef
      filename: path.join(process.cwd(), 'logs', 'winston', 'succeess.log'),
    }),
  ],
})

const errorLogger = createLogger({
  level: 'error',
  format: combine(label({ label: 'sr' }), timestamp(), myFormat),
  transports: [
    new transports.Console(),
    new transports.File({
      // eslint-disable-next-line no-undef
      filename: path.join(process.cwd(), 'logs', 'winston', 'error.log'),
    }),
  ],
})

export { logger, errorLogger }
