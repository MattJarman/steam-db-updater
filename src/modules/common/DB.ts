import Mongoose, { Connection } from 'mongoose'
import Config from 'config'
import { databaseConfig } from '../config/database'

class DB {
  private readonly connection: Connection

  public constructor() {
    this.connection = this.connect()
  }

  public connect(): Connection {
    const mongooseOptions: Record<string, unknown> = Config.get(
      'mongoose.options'
    )

    Mongoose.connect(DB.getUriString(), mongooseOptions)

    return Mongoose.connection
  }

  public disconnect(): void {
    Mongoose.connection.close()
  }

  private static getUriString(): string {
    const prefix: string = Config.get('mongodb.prefix')
    const username: string | undefined = databaseConfig.username
    const password: string | undefined = databaseConfig.password
    const host: string = Config.get('mongodb.host')
    const database: string = Config.get('mongodb.database')
    const options: string = DB.getOptionsString(Config.get('mongodb.options'))

    return `${prefix}://${username}:${password}@${host}/${database}?${options}`
  }

  private static getOptionsString(options: Record<string, unknown>): string {
    const optionsArray: Array<string> = []
    for (const [key, value] of Object.entries(options)) {
      optionsArray.push(`${key}=${value}`)
    }

    return optionsArray.join('&')
  }
}

export default DB
