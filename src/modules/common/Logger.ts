import Config from 'config'

export default class Logger {
  private readonly level: string
  private readonly hierarchy: Record<string, number>

  constructor() {
    this.level = process.env.LOG_LEVEL || 'WARNING'
    this.hierarchy = Config.get('log.hierarchy')
  }

  public error(
    message: string,
    fullMessage: unknown = null,
    tags: unknown = null
  ): void {
    if (this.hierarchy.ERROR <= this.getLevel()) {
      console.error(message, fullMessage, tags)
    }
  }

  public warn(
    message: string,
    fullMessage: unknown = null,
    tags: unknown = null
  ): void {
    if (this.hierarchy.WARNING <= this.getLevel()) {
      console.warn(message, fullMessage, tags)
    }
  }

  public log(
    message: string,
    fullMessage: unknown = null,
    tags: unknown = null
  ): void {
    if (this.hierarchy.LOG <= this.getLevel()) {
      console.log(message, fullMessage, tags)
    }
  }

  public info(
    message: string,
    fullMessage: unknown = null,
    tags: unknown = null
  ): void {
    if (this.hierarchy.INFO <= this.getLevel()) {
      console.info(message, fullMessage, tags)
    }
  }

  public debug(
    message: string,
    fullMessage: unknown = null,
    tags: unknown = null
  ): void {
    if (this.hierarchy.DEBUG <= this.getLevel()) {
      console.debug(message, fullMessage, tags)
    }
  }

  private getLevel(): number {
    return this.hierarchy[this.level]
  }
}
