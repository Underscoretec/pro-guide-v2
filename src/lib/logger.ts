type LogLevel = 'debug' | 'info' | 'warn' | 'error'

type LogMeta = Record<string, unknown>

const LEVEL_LABEL: Record<LogLevel, string> = {
  debug: 'DEBUG',
  info: 'INFO',
  warn: 'WARN',
  error: 'ERROR',
}

function formatMessage(scope: string, level: LogLevel, message: string, meta?: LogMeta): string {
  const timestamp = new Date().toISOString()
  const prefix = `[${timestamp}] [${LEVEL_LABEL[level]}] [${scope}] ${message}`

  if (!meta || Object.keys(meta).length === 0) {
    return prefix
  }

  return `${prefix} ${JSON.stringify(meta)}`
}

function createLogger(scope: string) {
  return {
    debug(message: string, meta?: LogMeta) {
      if (process.env.NODE_ENV === 'production') return
      console.debug(formatMessage(scope, 'debug', message, meta))
    },
    info(message: string, meta?: LogMeta) {
      console.info(formatMessage(scope, 'info', message, meta))
    },
    warn(message: string, meta?: LogMeta) {
      console.warn(formatMessage(scope, 'warn', message, meta))
    },
    error(message: string, meta?: LogMeta) {
      console.error(formatMessage(scope, 'error', message, meta))
    },
  }
}

export const logger = {
  email: createLogger('SES'),
  auth: createLogger('Auth'),
  orders: createLogger('Orders'),
}
