import Logger from '@App/modules/common/Logger'

const logLevels = ['ERROR', 'WARNING', 'LOG', 'INFO', 'DEBUG']

const message = 'message'

console.error = jest.fn()
console.warn = jest.fn()
console.log = jest.fn()
console.info = jest.fn()
console.debug = jest.fn()

describe('Logger', () => {
  describe('.error()', () => {
    it('always logs an error', () => {
      for (const level of logLevels) {
        process.env.LOG_LEVEL = level
        const logger = new Logger()

        logger.error(message)
        expect(console.error).toBeCalledWith(message, '', '')
      }
    })
  })

  describe('.warn()', () => {
    it('logs warning if log level is greater than ERROR', () => {
      const index = logLevels.indexOf('WARNING')
      for (let i = index; i < logLevels.length; i++) {
        process.env.LOG_LEVEL = logLevels[i]
        const logger = new Logger()

        logger.warn(message)
        expect(console.warn).toBeCalledWith(message, '', '')
      }
    })

    it('does not log warning if log level is less than WARNING', () => {
      process.env.LOG_LEVEL = 'ERROR'
      const logger = new Logger()

      logger.warn(message)
      expect(console.warn).toBeCalledTimes(0)
    })
  })

  describe('.log()', () => {
    it('logs log if log level is greater than WARNING', () => {
      const index = logLevels.indexOf('LOG')
      for (let i = index; i < logLevels.length; i++) {
        process.env.LOG_LEVEL = logLevels[i]
        const logger = new Logger()

        logger.log(message)
        expect(console.log).toBeCalledWith(message, '', '')
      }
    })

    it('does not log log if log level is less than LOG', () => {
      const index = logLevels.indexOf('WARNING')
      for (let i = 0; i <= index; i++) {
        process.env.LOG_LEVEL = logLevels[i]
        const logger = new Logger()

        logger.log(message)
        expect(console.log).toBeCalledTimes(0)
      }
    })
  })

  describe('.info()', () => {
    it('logs info if log level is greater than LOG', () => {
      const index = logLevels.indexOf('INFO')
      for (let i = index; i < logLevels.length; i++) {
        process.env.LOG_LEVEL = logLevels[i]
        const logger = new Logger()

        logger.info(message)
        expect(console.info).toBeCalledWith(message, '', '')
      }
    })

    it('does not log info if log level is less than INFO', () => {
      const index = logLevels.indexOf('LOG')
      for (let i = 0; i <= index; i++) {
        process.env.LOG_LEVEL = logLevels[i]
        const logger = new Logger()

        logger.info(message)
        expect(console.info).toBeCalledTimes(0)
      }
    })
  })

  describe('.debug()', () => {
    it('logs debug if log level is greater than INFO', () => {
      const index = logLevels.indexOf('DEBUG')
      for (let i = index; i < logLevels.length; i++) {
        process.env.LOG_LEVEL = logLevels[i]
        const logger = new Logger()

        logger.debug(message)
        expect(console.debug).toBeCalledWith(message, '', '')
      }
    })

    it('does not log debug if log level is less than DEBUG', () => {
      const index = logLevels.indexOf('INFO')
      for (let i = 0; i <= index; i++) {
        process.env.LOG_LEVEL = logLevels[i]
        const logger = new Logger()

        logger.debug(message)
        expect(console.debug).toBeCalledTimes(0)
      }
    })
  })

  describe('Log level initialisation', () => {
    it('sets the log level to WARNING if no logLevel env variable is set', () => {
      process.env.LOG_LEVEL = ''
      const logger = new Logger()

      logger.warn(message)
      logger.log(message)

      expect(console.warn).toBeCalledTimes(1)
      expect(console.log).toBeCalledTimes(0)
    })
  })
})
