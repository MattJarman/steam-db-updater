import Updater from '@App/modules/common/Updater'
import * as fs from 'fs'

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

jest.mock('@App/modules/common/Logger')
jest.mock('@App/modules/common/DB')

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

/**
 * TODO: Write tests for the following scenarios:
 *       - it inserts an app into the db if there were no errors ✔️
 *       - it ignores an app if Steam app details has no content ✔
 *       - it ignores an app if the id found in the app details does not match the one from app list
 *       - it increases the time between requests if we receive a TOO_MANY_REQUESTS error code
 *       - it resets the rate after the next successful response
 */

describe('Updater', () => {
  beforeAll(() => {
    appListMock.mockReturnValue(appList)
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
      appDetailsMock.mockReturnValue(noContentApp)
      ignoredAppMapperGetMock.mockReturnValue(ignoredApp)
      const updater = new Updater()

      await updater.run()
      expect(appDetailsMock).toHaveBeenCalledWith(APP_ID)
      expect(ignoredAppInsertMock).toHaveBeenCalledWith(ignoredApp)
    })
  })
})
