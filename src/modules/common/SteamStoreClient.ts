import HttpClient from './HttpClient'
import Config from 'config'
import ISteamAppDetailsResponse from '../../interfaces/steam/store/SteamAppDetailsResponseInterface'

class SteamStoreClient extends HttpClient {
  public constructor() {
    super(Config.get('steam.store.baseUrl'))
  }

  public async getAppDetails(id: number): Promise<ISteamAppDetailsResponse> {
    const route: string = Config.get('steam.store.routes.appDetails')
    return this.instance.get<ISteamAppDetailsResponse>(`${route}${id}`)
  }
}

export default SteamStoreClient
