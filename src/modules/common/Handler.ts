import Updater from './Updater'
import * as dotenv from 'dotenv'

export const handler = async (): Promise<boolean> => {
  dotenv.config()
  const updater = new Updater()
  await updater.run()
  return true
}
