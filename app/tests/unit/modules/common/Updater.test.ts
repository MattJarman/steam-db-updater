import Updater from '@App/modules/common/Updater'
import * as fs from 'fs'
import Config from 'config'
import clearAllMocks = jest.clearAllMocks

const APP_ID = 400

const app = JSON.parse(fs.readFileSync('tests/test-data/400.json', 'utf-8'))
const mappedApp = JSON.parse(
  fs.readFileSync('tests/test-data/400-mapped.json', 'utf-8')
)
const appList = {
  applist: {
    apps: [
      {
        appid: APP_ID,
        name: 'Portal'
      }
    ]
  }
}

jest.useFakeTimers()
jest.mock('@App/modules/common/Logger')
jest.mock('@App/modules/common/DB')
jest.mock('@App/modules/common/Helper')

const appInsertMock = jest.fn()
const ignoredAppInsertMock = jest.fn()
const appMapperGetMock = jest.fn()
const ignoredAppMapperGetMock = jest.fn()
const appListMock = jest.fn()
const appDetailsMock = jest.fn()

jest.mock('@App/sources/AppSource', () => {
  return jest.fn().mockImplementation(() => {
    return {
      index: jest.fn(() => {
        return []
      }),
      insert: appInsertMock
    }
  })
})

jest.mock('@App/sources/IgnoredAppSource', () => {
  return jest.fn().mockImplementation(() => {
    return {
      index: jest.fn(() => {
        return []
      }),
      insert: ignoredAppInsertMock
    }
  })
})

jest.mock('@App/modules/common/SteamAPIClient', () => {
  return jest.fn().mockImplementation(() => {
    return {
      getAppList: appListMock
    }
  })
})

jest.mock('@App/modules/common/SteamStoreClient', () => {
  return jest.fn().mockImplementation(() => {
    return {
      getAppDetails: appDetailsMock
    }
  })
})

jest.mock('@App/modules/mappers/AppMapper', () => {
  return jest.fn().mockImplementation(() => {
    return {
      get: appMapperGetMock
    }
  })
})

jest.mock('@App/modules/mappers/IgnoredAppMapper', () => {
  return jest.fn().mockImplementation(() => {
    return {
      get: ignoredAppMapperGetMock
    }
  })
})

describe('Updater', () => {
  beforeAll(() => {
    appListMock.mockReturnValue(appList)
  })

  beforeEach(() => {
    clearAllMocks()
  })

  describe('.run()', () => {
    it('inserts an app into the db if there were no errors', async () => {
      appDetailsMock.mockReturnValue(app)
      appMapperGetMock.mockReturnValue(mappedApp)

      const updater = new Updater()

      await updater.run()
      expect(appDetailsMock).toHaveBeenCalledWith(APP_ID)
      expect(appInsertMock).toHaveBeenCalledWith(mappedApp)
    })

    it('ignores an app if Steam app details has no content', async () => {
      const noContentApp = JSON.parse(JSON.stringify(app))
      const ignoredApp = {
        id: APP_ID,
        reason: '204 - No Content'
      }

      noContentApp[APP_ID].data = {}
      noContentApp[APP_ID].success = false
      appDetailsMock.mockReturnValue(noContentApp)
      ignoredAppMapperGetMock.mockReturnValue(ignoredApp)
      const updater = new Updater()

      await updater.run()
      expect(appDetailsMock).toHaveBeenCalledWith(APP_ID)
      expect(ignoredAppInsertMock).toHaveBeenCalledWith(ignoredApp)
    })

    it('ignores an app if the id found in the app details does not match the requested id', async () => {
      const mismatchedApp = JSON.parse(JSON.stringify(app))
      const ignoredApp = {
        id: APP_ID,
        reason: 'App ID mismatch'
      }

      mismatchedApp[APP_ID].data.steam_appid = 123
      appDetailsMock.mockReturnValue(mismatchedApp)
      ignoredAppMapperGetMock.mockReturnValue(ignoredApp)
      const updater = new Updater()

      await updater.run()
      expect(appDetailsMock).toHaveBeenCalledWith(APP_ID)
      expect(ignoredAppInsertMock).toHaveBeenCalledWith(ignoredApp)
    })

    it('ignores an app if it is not a game', async () => {
      const nonGameApp = JSON.parse(JSON.stringify(app))
      const ignoredApp = {
        id: APP_ID,
        reason: 'type: DLC'
      }

      nonGameApp[APP_ID].data.type = 'DLC'
      appDetailsMock.mockReturnValue(nonGameApp)
      ignoredAppMapperGetMock.mockReturnValue(ignoredApp)
      const updater = new Updater()

      await updater.run()
      expect(appDetailsMock).toHaveBeenCalledWith(APP_ID)
      expect(ignoredAppInsertMock).toHaveBeenCalledWith(ignoredApp)
    })

    it('truncates the apps length to the toProcess value if it exceeds it', async () => {
      appListMock.mockReturnValue({
        applist: {
          apps: [
            {
              appid: APP_ID,
              name: 'Portal'
            },
            {
              appid: APP_ID,
              name: 'Portal 2'
            },
            {
              appid: APP_ID,
              name: 'Portal 3'
            },
            {
              appid: APP_ID,
              name: 'Portal 4'
            }
          ]
        }
      })

      appDetailsMock.mockReturnValue(app)
      appMapperGetMock.mockReturnValue(mappedApp)

      const toProcess: number = Config.get('updater.toProcess')
      const updater = new Updater()

      await updater.run()
      expect(appInsertMock).toBeCalledTimes(toProcess)
    })
  })
})
