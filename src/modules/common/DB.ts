import Mongoose, { Connection } from 'mongoose'
import Config from 'config'

class DB {
  public constructor() {
    this.connect()
  }

  public connect(): Connection {
    const mongooseOptions: Record<string, unknown> = Config.get(
      'mongoose.options'
    )

    Mongoose.connect(this.getUriString(), mongooseOptions).then(() =>
      console.log('Connected to the database!')
    )

    return Mongoose.connection
  }

  public disconnect(): void {
    Mongoose.connection.close()
  }

  private getUriString(): string {
    const username: string | undefined = process.env.MONGODB_USERNAME
    const password: string | undefined = process.env.MONGODB_PASSWORD
    const host: string = Config.get('mongodb.host')
    const database: string = Config.get('mongodb.database')
    const options: string = DB.getOptionsString(Config.get('mongodb.options'))

    return `mongodb+srv://${username}:${password}@${host}/${database}?${options}`
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
