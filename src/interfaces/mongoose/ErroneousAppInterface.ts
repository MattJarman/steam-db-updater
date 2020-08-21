import { Document } from 'mongoose'

export default interface ErroneousApp extends Document {
  appid: number
  errorCode: number
  errorResponse: string
}
