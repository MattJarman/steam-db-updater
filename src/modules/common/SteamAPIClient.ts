import HttpClient from './HttpClient'
import Config from 'config'
import ISteamAppListResponse from '../../interfaces/steam/api/SteamAppListResponseInterface'

class SteamAPIClient extends HttpClient {
  public constructor() {
    super(Config.get('steam.api.baseUrl'))
  }

  public async getAppList(): Promise<ISteamAppListResponse> {
    const route: string = Config.get('steam.api.routes.appList')
    return this.instance.get<ISteamAppListResponse>(route)
  }
}

export default SteamAPIClient
