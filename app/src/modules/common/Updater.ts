import AppSource from '../../sources/AppSource'
import IgnoredAppSource from '../../sources/IgnoredAppSource'
import SteamAPIClient from './SteamAPIClient'
import SteamStoreClient from './SteamStoreClient'
import Logger from './Logger'
import Config from 'config'
import IgnoredAppMapper from '../mappers/IgnoredAppMapper'
import { NO_CONTENT } from './HttpResponses'
import AppMapper from '../mappers/AppMapper'
import SteamApp from '../../interfaces/steam/store/SteamApp'
import Helper from './Helper'

export default class Updater {
  private readonly GAME_TYPE = 'game'
  private readonly appSource: AppSource
  private readonly ignoredAppSource: IgnoredAppSource
  private readonly apiClient: SteamAPIClient
  private readonly storeClient: SteamStoreClient
  private readonly log: Logger
  private readonly toProcess: number
  private readonly rate: number

  public constructor() {
    this.appSource = new AppSource()
    this.ignoredAppSource = new IgnoredAppSource()
    this.apiClient = new SteamAPIClient()
    this.storeClient = new SteamStoreClient()
    this.log = new Logger()
    this.toProcess = Config.get('updater.toProcess')
    this.rate = Config.get('updater.rate')
  }

  public async run(): Promise<void> {
    const apps = await this.getApps()
    for (const app of apps) {
      // Add a sleep so we don't hit the rate limit
      await Helper.sleep(this.rate)

      try {
        const response = await this.storeClient.getAppDetails(app)
        const success = response[app].success
        if (!success) {
          // If we have an empty response, ignore for future iterations
          await this.handleNoContent(app, response)
          continue
        }

        const data = response[app].data
        if (app !== data.steam_appid) {
          await this.handleAppIdMismatch(app, data.steam_appid)
          continue
        }

        if (data.type !== this.GAME_TYPE) {
          await this.handleNonGame(data)
          continue
        }

        await this.handleSuccess(data)
      } catch (error) {
        this.log.warn(`Error inserting app ${app}.`, error.response.statusText)
      }
    }
  }

  private async handleSuccess(app: SteamApp): Promise<void> {
    const mappedApp = new AppMapper(app).get()

    await this.appSource.insert(mappedApp)
    this.log.info(
      `${mappedApp.name} (${app.steam_appid}) has been inserted into the database.`
    )
  }

  private async handleNoContent(
    appId: number,
    response: unknown
  ): Promise<void> {
    this.log.error(`${appId} has no content.`, response)

    const reason = `${NO_CONTENT} - No Content`
    await this.handleIgnore(appId, reason)
  }

  private async handleAppIdMismatch(
    expectedAppId: number,
    actualAppId: number
  ): Promise<void> {
    this.log.error(
      `App ID mismatch. (Expected: ${expectedAppId}, Actual: ${actualAppId})`
    )

    const reason = 'App ID mismatch'
    await this.handleIgnore(expectedAppId, reason)
  }

  private async handleNonGame(app: SteamApp): Promise<void> {
    this.log.info(`${app.name} (${app.steam_appid}) is not a game - ignoring.`)
    const reason = `type: '${app.type}'`

    await this.handleIgnore(app.steam_appid, reason)
  }

  private async handleIgnore(appId: number, reason: string): Promise<void> {
    const ignoredApp = new IgnoredAppMapper(appId, reason).get()
    await this.ignoredAppSource.insert(ignoredApp)
  }

  private async getApps(): Promise<number[]> {
    const appsFromDB = await this.appSource.index()
    this.log.info(`${appsFromDB.length} apps retrieved from DB.`)

    const ignoredAppsFromDB = await this.ignoredAppSource.index()
    this.log.info(`${ignoredAppsFromDB.length} ignored apps retrieved from DB.`)

    const appListResponse = await this.apiClient.getAppList()
    const appsFromSteam = appListResponse.applist.apps
    this.log.info(`${appsFromSteam.length} retrieved from Steam.`)

    const apps = appsFromSteam
      .filter(app => !appsFromDB.includes(app.appid))
      .filter(app => !ignoredAppsFromDB.includes(app.appid))
      .map(app => app.appid)

    this.log.info(`${apps.length} to insert.`)

    if (apps.length > this.toProcess) {
      this.log.info(`Truncating amount of apps to ${this.toProcess}.`)
      return apps.slice(0, this.toProcess)
    }

    return apps
  }
}
