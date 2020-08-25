import AppSource from '../../sources/AppSource'
import IgnoredAppSource from '../../sources/IgnoredAppSource'
import SteamAPIClient from './SteamAPIClient'
import SteamStoreClient from './SteamStoreClient'
import Logger from './Logger'
import Config from 'config'
import IgnoredAppMapper from '../mappers/IgnoredAppMapper'
import { NO_CONTENT, TOO_MANY_REQUESTS } from './HttpResponses'
import AppMapper from '../mappers/AppMapper'
import SteamApp from '../../interfaces/steam/store/SteamAppInterface'
import { AxiosError } from 'axios'

export default class Updater {
  private readonly appSource: AppSource
  private readonly ignoredAppSource: IgnoredAppSource
  private readonly apiClient: SteamAPIClient
  private readonly storeClient: SteamStoreClient
  private readonly log: Logger
  private readonly increasedRate: number
  private readonly defaultRate: number
  private rate: number

  public constructor() {
    this.appSource = new AppSource()
    this.ignoredAppSource = new IgnoredAppSource()
    this.apiClient = new SteamAPIClient()
    this.storeClient = new SteamStoreClient()
    this.log = new Logger()
    this.increasedRate = Config.get('updater.rateIncrease')
    this.defaultRate = Config.get('updater.rate')
    this.rate = this.defaultRate
  }

  public async run(): Promise<void> {
    const apps = await this.getApps()
    for (const app of apps) {
      // Add a sleep so we don't hit the rate limit
      await this.sleep(this.rate)

      try {
        const response = await this.storeClient.getAppDetails(app)
        const success = response[app].success
        if (!success) {
          // If we have an empty response, ignore for future iterations
          await this.handleNoContent(app, response)
          continue
        }

        await this.handleSuccess(response[app].data)

        // Reset rate for next request if we're using the increase rate
        if (this.rate !== this.defaultRate) {
          this.log.info(`Reverting rate limit to default.`)
          this.resetRate()
        }
      } catch (error) {
        this.handlerError(app, error)
      }
    }
  }

  private handlerError(app: number, error: AxiosError): void {
    if (error.response) {
      if (error.response.status === TOO_MANY_REQUESTS) {
        this.log.warn(`Error inserting app ${app}.`, error.response.statusText)
        this.log.warn(
          `Increasing rate limit for next request to ${
            this.increasedRate / 1000
          } seconds.`
        )
        this.increaseRate()
      }
    }
  }

  private async handleSuccess(app: SteamApp): Promise<void> {
    // We don't care about anything that isn't a game, so add it to the list of ignored apps
    if (app.type !== 'game') {
      this.log.info(
        `${app.name} (${app.steam_appid}) is not a game - ignoring.`
      )

      await this.handleIgnore(app.steam_appid, `type: '${app.type}'`)
      return
    }

    const mappedApp = new AppMapper(app).get()

    await this.appSource.insert(mappedApp).then(() => {
      this.log.info(
        `${mappedApp.name} (${app.steam_appid}) has been inserted into the database.`
      )
    })
  }

  private async handleNoContent(
    appId: number,
    response: unknown
  ): Promise<void> {
    this.log.error(`${appId} has no content.`, response)

    const reason = `${NO_CONTENT} - No Content`
    await this.handleIgnore(appId, reason)
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

    return apps
  }

  private increaseRate() {
    this.rate = this.increasedRate
  }

  private resetRate() {
    this.rate = this.defaultRate
  }

  private async sleep(ms: number): Promise<void> {
    return new Promise(resolve => {
      setTimeout(resolve, ms)
    })
  }
}
