import IgnoredApp from '../../interfaces/mongoose/IgnoredAppInterface'
import SteamAppDetailsResponse from '../../interfaces/steam/store/SteamAppDetailsResponseInterface'

export default class IgnoredAppMapper {
  private readonly appId: number
  private readonly reason: string

  constructor(appId: number, reason: string) {
    this.appId = appId
    this.reason = reason
  }

  public get(): IgnoredApp {
    return {
      appid: this.appId,
      reason: this.reason
    } as IgnoredApp
  }
}
