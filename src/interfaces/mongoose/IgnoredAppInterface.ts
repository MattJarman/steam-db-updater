import { Document } from 'mongoose'

export default interface IgnoredApp extends Document {
  appid: number
  reason: string
}
