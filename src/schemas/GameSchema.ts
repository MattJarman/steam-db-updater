import { Schema } from 'mongoose'

const GameSchema = new Schema({
  _id: Number,
  name: String,
  type: String,
  headerImage: String,
  description: String,
  pcRequirements: Schema.Types.Mixed,
  platforms: Schema.Types.Mixed,
  screenshots: Schema.Types.Mixed,
  developers: [String],
  publishers: [String],
  categories: Schema.Types.Mixed,
  metacritic: Schema.Types.Mixed
})

export default GameSchema
