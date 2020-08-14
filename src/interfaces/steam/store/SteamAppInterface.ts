export default interface ISteamApp {
  _id: number
  name: string
  type: string
  requiredAge: number
  isFree: boolean
  description: string
  about: string
  shortDescription: string
  supportedLanguages: string
  headerImage: string
  website: string
  pcRequirements: Record<string, unknown>
  macRequirements: Record<string, unknown>
  linuxRequirements: Record<string, unknown>
  developers: Array<string>
  publishers: Array<string>
  priceOverview: Record<string, unknown>
  packages: Array<number>
  packageGroups: Array<Record<string, unknown>>
  platforms: Record<string, unknown>
  metacritic: Record<string, unknown>
  categories: Array<Record<string, unknown>>
  genres: Array<Record<string, unknown>>
  screenshots: Array<Record<string, unknown>>
  recommendations: Record<string, unknown>
  achievements: Record<string, unknown>
  releaseDate: Record<string, unknown>
  supportInfo: Record<string, unknown>
  background: string
  contentDescriptors: Record<string, unknown>
}
