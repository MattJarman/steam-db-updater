import Updater from './Updater'

export const handler = async (): Promise<boolean> => {
  const updater = new Updater()
  await updater.run()
  return true
}
