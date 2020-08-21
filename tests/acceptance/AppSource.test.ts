import fs from 'fs'
import SteamApp from '@App/interfaces/steam/store/SteamAppInterface'
import AppMapper from '@App/modules/mappers/AppMapper'
import AppSource from '@App/sources/AppSource'

const source = new AppSource()

describe('Test App Source', () => {
  afterAll(() => source.disconnect())
  it('Inserts an application into the database', async () => {
    const steamApp: SteamApp = JSON.parse(
      fs.readFileSync('./tests/test-data/app.json', 'utf8')
    )

    const app = new AppMapper(steamApp).get()
    await source.insert(app)
    expect(true).toEqual(true)
  })
})
