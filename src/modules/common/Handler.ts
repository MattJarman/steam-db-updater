import AppSource from '../../sources/AppSource'
import SteamAPIClient from './SteamAPIClient'
import SteamStoreClient from './SteamStoreClient'
import Config from 'config'
import AppMapper from '../mappers/AppMapper'

export const handler = async (): Promise<boolean> => {
  const source = new AppSource()
  const apiClient = new SteamAPIClient()
  const storeClient = new SteamStoreClient()

  // Get app ids from our database
  console.log('Retrieving all apps in DB...')
  const games = await source.index()
  console.log(`Done. ${games.length} retrieved.`)

  // Get all app ids from steam
  console.log('Retrieving all apps from Steam...')
  const appListResponse = await apiClient.getAppList()
  let apps = appListResponse.applist.apps
  console.log(`Done. ${apps.length} retrieved.`)

  // TODO: Get erroneous apps from DB

  // Filter apps
  apps = apps.filter(app => {
    return !games.includes(app.appid)
  })

  const rate: number = Config.get('updater.rate')
  for (const app of apps) {
    const appId: number = app.appid
    const detailsResponse = await storeClient.getAppDetails(appId)

    const success: boolean = detailsResponse[appId].success
    if (!success) {
      // Log error
      // If not a network error, add failed app to DB
      continue
    }

    const steamApp = detailsResponse[appId].data
    const mappedApp = new AppMapper(steamApp).get()
    await source.insert(mappedApp)

    await sleep(rate)

    break
  }

  source.disconnect()
  return true
}

function sleep(ms: number) {
  return new Promise(resolve => {
    setTimeout(resolve, ms)
  })
}
