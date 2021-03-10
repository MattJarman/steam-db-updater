import HttpClient from './HttpClient'
import Config from 'config'
import SteamAppListResponse from '../../interfaces/steam/api/SteamAppListResponseInterface'

export default class SteamAPIClient extends HttpClient {
  public constructor() {
    super(Config.get('steam.api.baseUrl'))
  }

  public async getAppList(): Promise<SteamAppListResponse> {
    const route: string = Config.get('steam.api.routes.appList')
    return this.instance.get<SteamAppListResponse>(route)
  }
}
