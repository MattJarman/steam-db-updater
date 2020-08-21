import HttpClient from './HttpClient'
import Config from 'config'
import SteamAppDetailsResponse from '../../interfaces/steam/store/SteamAppDetailsResponseInterface'

class SteamStoreClient extends HttpClient {
  public constructor() {
    super(Config.get('steam.store.baseUrl'))
  }

  public async getAppDetails(id: number): Promise<SteamAppDetailsResponse> {
    const route: string = Config.get('steam.store.routes.appDetails')
    return this.instance.get<SteamAppDetailsResponse>(`${route}${id}`)
  }
}

export default SteamStoreClient
