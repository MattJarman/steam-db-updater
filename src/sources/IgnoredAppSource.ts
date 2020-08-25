import { DocumentDefinition, Model } from 'mongoose'
import DB from '../modules/common/DB'
import IgnoredAppModel from '../models/IgnoredAppModel'
import IgnoredApp from '../interfaces/mongoose/IgnoredAppInterface'

export default class IgnoredAppSource extends DB {
  ignoredApp: Model<IgnoredApp>

  public constructor() {
    super()
    this.ignoredApp = IgnoredAppModel
  }

  public async index(): Promise<DocumentDefinition<any>> {
    return new Promise((resolve, reject) => {
      this.ignoredApp
        .find({})
        .distinct('appid')
        .lean()
        .exec((err, results) => {
          if (err) {
            reject(err)
          }

          resolve(results)
        })
    })
  }

  public async insert(
    erroneousApp: IgnoredApp
  ): Promise<DocumentDefinition<any>> {
    const query = { appid: erroneousApp.appid }
    const options = { upsert: true }

    return new Promise((resolve, reject) => {
      this.ignoredApp
        .updateOne(query, erroneousApp, options)
        .exec((err, result) => {
          if (err) {
            reject(err)
          }
          resolve(result)
        })
    })
  }
}
