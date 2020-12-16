import Mongoose from 'mongoose'
import AppSchema from '../schemas/AppSchema'
import App from '../interfaces/mongoose/App'

const AppModel = Mongoose.model<App>('App', AppSchema)

export default AppModel
