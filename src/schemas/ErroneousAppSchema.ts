import { Schema } from 'mongoose'

const ErroneousAppSchema = new Schema({
  appid: Number,
  errorCode: Number,
  errorResponse: String
})

export default ErroneousAppSchema
