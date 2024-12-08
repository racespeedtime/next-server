import process from 'node:process'
import pino from 'pino'

export const logger = pino({
  transport: {
    target: 'pino-pretty',
    options: {
      translateTime: 'SYS:standard',
      ignore: 'pid,hostname',
    },
  },
})

process.on('uncaughtException', (err) => {
  logger.error(err)
})
