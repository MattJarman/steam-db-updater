import * as fs from 'fs'
import AppSource from '@App/sources/AppSource'

const source = new AppSource()
const APP_ID = 400

describe('Test AppSource', () => {
  it('Inserts app into DB', async () => {
    const app = JSON.parse(
      fs.readFileSync(`tests/test-data/${APP_ID}-mapped.json`, 'utf-8')
    )

    await source.insert(app)
  })
})
