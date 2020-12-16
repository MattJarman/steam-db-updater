import Mongoose from 'mongoose'
import IgnoredApp from '../interfaces/mongoose/IgnoredApp'
import IgnoredAppSchema from '../schemas/IgnoredAppSchema'

const IgnoredAppModel = Mongoose.model<IgnoredApp>(
  'IgnoredApp',
  IgnoredAppSchema
)

export default IgnoredAppModel
