import SteamStoreClient from '@App/modules/common/SteamStoreClient'
import * as fs from 'fs'

const client = new SteamStoreClient()
const APP_ID = 400

describe('Test SteamStoreClient', () => {
  it('Retrieves app from Steam', async () => {
    const app = await client.getAppDetails(APP_ID)
    fs.writeFileSync(
      `tests/test-data/${APP_ID}.json`,
      JSON.stringify(app, null, 2),
      'utf-8'
    )
  })
})
