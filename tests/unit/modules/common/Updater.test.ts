import Updater from '@App/modules/common/Updater'
import * as fs from 'fs'

const APP_ID = 400

jest.mock('@App/modules/common/Logger')
jest.mock('@App/modules/common/DB')

const insertMock = jest.fn()
jest.mock('@App/sources/AppSource', () => {
  return jest.fn().mockImplementation(() => {
    return {
      index: jest.fn(() => {
        return []
      }),
      insert: insertMock
    }
  })
})

jest.mock('@App/sources/IgnoredAppSource', () => {
  return jest.fn().mockImplementation(() => {
    return {
      index: jest.fn(() => {
        return []
      })
    }
  })
})

jest.mock('@App/modules/common/SteamAPIClient', () => {
  return jest.fn().mockImplementation(() => {
    return {
      getAppList: jest.fn(() => {
        return {
          applist: {
            apps: [
              {
                appid: APP_ID,
                name: 'Portal'
              }
            ]
          }
        }
      })
    }
  })
})

const app = JSON.parse(fs.readFileSync('tests/test-data/400.json', 'utf-8'))
const appMapped = JSON.parse(
  fs.readFileSync('tests/test-data/400-mapped.json', 'utf-8')
)
const appDetailsMock = jest.fn(id => {
  if (id === APP_ID) {
    return app
  }
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
      get: jest.fn(() => {
        return appMapped
      })
    }
  })
})

/**
 * TODO: Write tests for the following scenarios:
 *       - it inserts an app into the db if there were no errors ✔️
 *       - it ignores an app if Steam app details has no context
 *       - it ignores an app if the id found in the app details does not match the one from app list
 *       - it increases the time between requests if we receive a TOO_MANY_REQUESTS error code
 *       - it resets the rate after the next successful response
 */

describe('Updater', () => {
  describe('.run()', () => {
    it('inserts an app into the db if there were no errors', async () => {
      const updater = new Updater()

      await updater.run()
      expect(appDetailsMock).toHaveBeenCalledWith(APP_ID)
      expect(insertMock).toHaveBeenCalledWith(appMapped)
    })
  })
})
