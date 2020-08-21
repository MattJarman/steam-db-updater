import { Document } from 'mongoose'
import {
  Achievements,
  Metacritic,
  Platforms,
  Recommendations,
  ReleaseDate,
  Requirements,
  Screenshot,
  Tag
} from '../steam/store/SteamAppInterface'

export default interface App extends Document {
  _id: number
  type: string
  name: string
  required_age: number
  is_free: boolean
  dlc: Array<number>
  detailed_description: string
  about_the_game: string
  short_description: string
  supported_languages: string
  header_image: string
  website: string
  pc_requirements: Requirements
  mac_requirements: Requirements
  linux_requirements: Requirements
  developers: Array<string>
  publishers: Array<string>
  platforms: Platforms
  metacritic: Metacritic
  categories: Array<Tag>
  genres: Array<Tag>
  screenshots: Array<Screenshot>
  recommendations: Recommendations
  achievements: Achievements
  release_date: ReleaseDate
  background: string
}
