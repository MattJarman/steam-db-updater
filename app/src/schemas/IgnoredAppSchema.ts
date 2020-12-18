import { Schema } from 'mongoose'

const IgnoredAppSchema = new Schema({
  appid: Number,
  reason: String
})

export default IgnoredAppSchema
