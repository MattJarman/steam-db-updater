import SteamApp from './SteamApp'

export default interface SteamAppDetailsResponse {
  [key: string]: {
    success: boolean
    data: SteamApp
  }
}
