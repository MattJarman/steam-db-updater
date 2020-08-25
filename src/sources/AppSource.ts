import { DocumentDefinition, Model } from 'mongoose'
import DB from '../modules/common/DB'
import AppModel from '../models/AppModel'
import App from '../interfaces/mongoose/AppInterface'

export default class AppSource extends DB {
  app: Model<App>

  public constructor() {
    super()
    this.app = AppModel
  }

  public async index(): Promise<DocumentDefinition<any>> {
    return new Promise((resolve, reject) => {
      this.app
        .find({ type: 'game' })
        .distinct('_id')
        .lean()
        .exec((err, results) => {
          if (err) {
            reject(err)
          }

          resolve(results)
        })
    })
  }

  public async insert(app: App): Promise<DocumentDefinition<any>> {
    const query = { _id: app._id }
    const options = { upsert: true }

    return new Promise((resolve, reject) => {
      this.app.updateOne(query, app, options).exec((err, result) => {
        if (err) {
          reject(err)
        }
        resolve(result)
      })
    })
  }
}
