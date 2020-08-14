import GameSource from '../../sources/GameSource'
import ISteamAppListResponse from '../../interfaces/steam/api/SteamAppListResponseInterface'
import SteamAPIClient from './SteamAPIClient'
import ISteamAppListItem from '../../interfaces/steam/api/SteamAppListItemInterface'
import ISteamAppDetailsResponse from '../../interfaces/steam/store/SteamAppDetailsResponseInterface'
import SteamStoreClient from './SteamStoreClient'
import ISteamApp from '../../interfaces/steam/store/SteamAppInterface'

export const handler = async (): Promise<boolean> => {
  const source: GameSource = new GameSource()
  const apiClient: SteamAPIClient = new SteamAPIClient()
  const storeClient: SteamStoreClient = new SteamStoreClient()

  // Get app ids from our database
  const games = await source.index()

  // Get all app ids from steam
  const response: ISteamAppListResponse = await apiClient.getAppList()
  let apps: Array<ISteamAppListItem> = response.applist.apps

  // Filter apps
  apps = apps.filter(app => {
    return !games.includes(app.appid)
  })

  for (const app of apps) {
    const appid: number = app.appid
    const detailsResponse: ISteamAppDetailsResponse = await storeClient.getAppDetails(
      appid
    )

    const success: boolean = detailsResponse[appid].success
    if (!success) {
      // Log error
      // Add failed app to DB
      continue
    }

    const details: ISteamApp = detailsResponse[appid].data

    console.log(details)

    break
  }

  source.disconnect()
  return true
}
