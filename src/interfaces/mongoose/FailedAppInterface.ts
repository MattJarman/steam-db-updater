import { Document } from 'mongoose'

export default interface IFailedApp extends Document {
  appid: number
  errorCode: number
  errorResponse: string
}
