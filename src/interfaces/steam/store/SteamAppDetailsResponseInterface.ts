import SteamApp from './SteamAppInterface'

export default interface SteamAppDetailsResponse {
  [key: string]: {
    success: boolean
    data: SteamApp
  }
}
