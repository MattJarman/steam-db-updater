import Mongoose from 'mongoose'
import ErroneousApp from '../interfaces/mongoose/ErroneousAppInterface'
import ErroneousAppSchema from '../schemas/ErroneousAppSchema'

const ErroneousAppModel = Mongoose.model<ErroneousApp>(
  'ErroneousApp',
  ErroneousAppSchema
)

export default ErroneousAppModel
