import * as fs from 'fs'
import AppMapper from '@App/modules/mappers/AppMapper'
import SteamAppDetailsResponse from '@App/interfaces/steam/store/SteamAppDetailsResponseInterface'

const APP_ID = 400

describe('AppMapper', () => {
  it('maps app into correct format', async () => {
    const app: SteamAppDetailsResponse = JSON.parse(
      fs.readFileSync(`tests/test-data/${APP_ID}.json`, 'utf-8')
    )

    const steamApp = app[APP_ID].data
    const actual = new AppMapper(steamApp).get()
    const expected = JSON.parse(
      fs.readFileSync(`tests/test-data/${APP_ID}-mapped.json`, 'utf-8')
    )

    expect(actual).toMatchObject(expected)
  })
})
