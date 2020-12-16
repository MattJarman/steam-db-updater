import SteamApp from '../../interfaces/steam/store/SteamApp'
import App from '../../interfaces/mongoose/App'

export default class AppMapper {
  private readonly steamApp: SteamApp

  constructor(steamApp: SteamApp) {
    this.steamApp = steamApp
  }

  public get(): App {
    return {
      _id: this.steamApp.steam_appid,
      type: this.steamApp.type,
      name: this.steamApp.name,
      required_age: this.steamApp.required_age,
      is_free: this.steamApp.is_free,
      dlc: this.steamApp.dlc,
      detailed_description: this.steamApp.detailed_description,
      about_the_game: this.steamApp.about_the_game,
      short_description: this.steamApp.short_description,
      supported_languages: this.steamApp.supported_languages,
      header_image: this.steamApp.header_image,
      website: this.steamApp.website,
      pc_requirements: this.steamApp.pc_requirements,
      mac_requirements: this.steamApp.mac_requirements,
      linux_requirements: this.steamApp.linux_requirements,
      developers: this.steamApp.developers,
      publishers: this.steamApp.publishers,
      platforms: this.steamApp.platforms,
      metacritic: this.steamApp.metacritic,
      categories: this.steamApp.categories,
      genres: this.steamApp.genres,
      screenshots: this.steamApp.screenshots,
      recommendations: this.steamApp.recommendations,
      achievements: this.steamApp.achievements,
      release_date: this.steamApp.release_date,
      background: this.steamApp.background
    } as App
  }
}
