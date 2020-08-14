import ISteamApp from './SteamAppInterface'

export default interface ISteamAppDetailsResponse {
  [key: string]: {
    success: boolean
    data: ISteamApp
  }
}
