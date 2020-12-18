export interface Requirements {
  minimum?: string
  recommended?: string
}

export interface Demo {
  appid: number
  description: string
}

export interface PriceOverview {
  currency: string
  initial: number
  final: number
  discount_percent: string
  initial_formatted: string
  final_formatted: string
}

export interface PackageGroup {
  name: string
  title: string
  description: string
  selection_text: string
  save_text: string
  display_type: number
  is_recurring_subscription: string
  subs: Array<Record<string, unknown>>
}

export interface Platforms {
  windows: boolean
  mac: boolean
  linux: boolean
}

export interface Metacritic {
  score: number
  url: string
}

export interface Recommendations {
  total: number
}

export interface Achievement {
  name: string
  path: string
}

export interface Achievements {
  total: number
  highlights: Array<Achievement>
}

export interface Tag {
  id: number
  description: string
}

export interface Screenshot {
  id: number
  path_thumbnail: string
  path_full: string
}

export interface ReleaseDate {
  coming_soon: boolean
  date: string
}

export interface SupportInfo {
  url: string
  email: string
}

export interface ContentDescriptors {
  ids: Array<number>
  notes: string | null
}

export default interface SteamApp {
  type: string
  name: string
  steam_appid: number
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
  legal_notice: string
  developers: Array<string>
  publishers: Array<string>
  demos: Array<Demo>
  price_overview: PriceOverview
  packages: Array<number>
  package_groups: Array<PackageGroup>
  platforms: Platforms
  metacritic: Metacritic
  categories: Array<Tag>
  genres: Array<Tag>
  screenshots: Array<Screenshot>
  recommendations: Recommendations
  achievements: Achievements
  release_date: ReleaseDate
  support_info: SupportInfo
  background: string
  content_descriptors: ContentDescriptors
}
