import SteamStoreClient from '@App/modules/common/SteamStoreClient'
import fs from 'fs'

const APP_ID = 400

describe('Test Steam Client', () => {
  it('Can successfully retrieve app details from Steam', async () => {
    const client = new SteamStoreClient()
    const response = await client.getAppDetails(APP_ID)
    const details = response[APP_ID]

    expect(details.success).toBe(true)
    expect(details.data.type).toBe('game')
    await fs.writeFileSync('app.json', JSON.stringify(details.data, null, 4))
  })
})
