// Logger utility - can be disabled in production
const isDev = import.meta.env.DEV;

type LogLevel = 'log' | 'warn' | 'error' | 'info';

interface LoggerOptions {
  prefix?: string;
}

function createLogger(options: LoggerOptions = {}) {
  const { prefix = '' } = options;

  const log = (level: LogLevel, ...args: unknown[]) => {
    if (!isDev) return;

    const prefixedArgs = prefix ? [`[${prefix}]`, ...args] : args;
    console[level](...prefixedArgs);
  };

  return {
    log: (...args: unknown[]) => log('log', ...args),
    info: (...args: unknown[]) => log('info', ...args),
    warn: (...args: unknown[]) => log('warn', ...args),
    error: (...args: unknown[]) => log('error', ...args),
  };
}

// Pre-configured loggers for different modules
export const swLogger = createLogger({ prefix: 'SW' });
export const networkLogger = createLogger({ prefix: 'Network' });
export const syncLogger = createLogger({ prefix: 'Sync' });
export const cacheLogger = createLogger({ prefix: 'Cache' });
export const notificationLogger = createLogger({ prefix: 'Notifications' });

// Generic logger
export const logger = createLogger();
