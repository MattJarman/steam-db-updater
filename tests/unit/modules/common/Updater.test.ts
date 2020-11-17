import Updater from '@App/modules/common/Updater'
// eslint-disable-next-line no-unused-vars
import SteamStoreClient from '@App/modules/common/SteamStoreClient'

// TODO: Setup mocks for database

// TODO: Setup mocks for Steam api (.getAppList())

// TODO: Mock logger

// TODO: Return app details from here
jest.mock('@App/modules/common/SteamStoreClient', () => {
  return jest.fn().mockImplementation(() => {
    return {
      getAppDetails: jest.fn(() => {
        return 'hello world'
      })
    }
  })
})

/**
 * TODO: Write tests for the following scenarios:
 *       - it inserts an app into the db if there were no errors
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
    })
  })
})
