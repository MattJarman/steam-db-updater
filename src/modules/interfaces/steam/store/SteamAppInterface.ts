export default interface ISteamApp {
    _id: number,
    name: string,
    type: string,
    requiredAge: number,
    isFree: boolean,
    description: string,
    about: string,
    shortDescription: string,
    supportedLanguages: string,
    headerImage: string,
    website: string,
    pcRequirements: object,
    macRequirements: object,
    linuxRequirements: object,
    developers: Array<string>,
    publishers: Array<string>,
    priceOverview: object,
    packages: Array<number>,
    packageGroups: Array<object>,
    platforms: object,
    metacritic: object,
    categories: Array<object>,
    genres: Array<object>,
    screenshots: Array<object>,
    recommendations: object,
    achievements: object,
    releaseDate: object,
    supportInfo: object,
    background: string,
    contentDescriptors: object
};