import HttpClient from './HttpClient'
import Config from 'config'
import SteamAppDetailsResponse from '../../interfaces/steam/store/SteamAppDetailsResponse'

export default class SteamStoreClient extends HttpClient {
  public constructor() {
    super(Config.get('steam.store.baseUrl'))
  }

  public async getAppDetails(id: number): Promise<SteamAppDetailsResponse> {
    const route: string = Config.get('steam.store.routes.appDetails')
    const config = {
      params: {
        appids: id
      }
    }
    return this.instance.get<SteamAppDetailsResponse>(`${route}`, config)
  }
}
