import Logger from '@App/modules/common/Logger'

const message = 'Test message.'
const fullMessage = 'Full message.'
const tags = 'tags'

describe('Test Logger', () => {
  it('Logs errors', () => {
    process.env.LOG_LEVEL = 'ERROR'
    const log = new Logger()
    console.error = jest.fn()

    log.error(message, fullMessage, tags)
    log.error(message)

    expect(console.error).toBeCalledWith(message, fullMessage, tags)
    expect(console.error).toBeCalledWith(message, null, null)
    expect(console.error).toBeCalledTimes(2)
  })

  it('Logs warnings', () => {
    process.env.LOG_LEVEL = 'WARNING'
    const log = new Logger()
    console.warn = jest.fn()

    log.warn(message, fullMessage, tags)
    log.warn(message)

    expect(console.warn).toBeCalledWith(message, fullMessage, tags)
    expect(console.warn).toBeCalledWith(message, null, null)
    expect(console.warn).toBeCalledTimes(2)
  })

  it('Logs logs', () => {
    process.env.LOG_LEVEL = 'LOG'
    const log = new Logger()
    console.log = jest.fn()

    log.log(message, fullMessage, tags)
    log.log(message)

    expect(console.log).toBeCalledWith(message, fullMessage, tags)
    expect(console.log).toBeCalledWith(message, null, null)
    expect(console.log).toBeCalledTimes(2)
  })

  it('Logs info', () => {
    process.env.LOG_LEVEL = 'INFO'
    const log = new Logger()
    console.info = jest.fn()

    log.info(message, fullMessage, tags)
    log.info(message)

    expect(console.info).toBeCalledWith(message, fullMessage, tags)
    expect(console.info).toBeCalledWith(message, null, null)
    expect(console.info).toBeCalledTimes(2)
  })

  it('Logs debug', () => {
    process.env.LOG_LEVEL = 'DEBUG'
    const log = new Logger()
    console.debug = jest.fn()

    log.debug(message, fullMessage, tags)
    log.debug(message)

    expect(console.debug).toBeCalledWith(message, fullMessage, tags)
    expect(console.debug).toBeCalledWith(message, null, null)
    expect(console.debug).toBeCalledTimes(2)
  })
})
