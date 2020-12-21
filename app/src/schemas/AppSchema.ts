import { Schema } from 'mongoose'

const AppSchema = new Schema({
  _id: Number,
  type: String,
  name: String,
  required_age: Number,
  is_free: Boolean,
  detailed_description: String,
  about_the_game: String,
  short_description: String,
  supported_languages: String,
  header_image: String,
  website: String,
  pc_requirements: Schema.Types.Mixed,
  mac_requirements: Schema.Types.Mixed,
  linux_requirements: Schema.Types.Mixed,
  legal_notice: String,
  developers: [String],
  publishers: [String],
  package_groups: [Schema.Types.Mixed],
  platforms: Schema.Types.Mixed,
  metacritic: Schema.Types.Mixed,
  categories: [Schema.Types.Mixed],
  genres: [Schema.Types.Mixed],
  screenshots: [Schema.Types.Mixed],
  recommendations: [Schema.Types.Mixed],
  achievements: Schema.Types.Mixed,
  release_date: Schema.Types.Mixed,
  background: String,
  content_descriptors: Schema.Types.Mixed
})

export default AppSchema
