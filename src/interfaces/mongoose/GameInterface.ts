import { Document } from 'mongoose'

export default interface IGame extends Document {
  _id: number
  name: string
  type: string
  headerImage: string
  description: string
  pcRequirements: Record<string, unknown>
  platforms: Record<string, unknown>
  screenshots: Array<Record<string, unknown>>
  developers: Array<string>
  publishers: Array<string>
  categories: Array<Record<string, unknown>>
  metacritic: Record<string, unknown>
}
