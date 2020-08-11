import GameSource from "../sources/GameSource";
import ISteamAppListResponse from "../interfaces/steam/api/SteamAppListResponseInterface";
import SteamAPIClient from "./SteamAPIClient";
import ISteamAppListItem from "../interfaces/steam/api/SteamAppListItemInterface";
import ISteamAppDetailsResponse from "../interfaces/steam/store/SteamAppDetailsResponseInterface";
import SteamStoreClient from "./SteamStoreClient";
import ISteamApp from "../interfaces/steam/store/SteamAppInterface";

export const handler = async (event: any = {}): Promise<any> => {
    let source: GameSource = new GameSource();
    let apiClient: SteamAPIClient = new SteamAPIClient();
    let storeClient: SteamStoreClient = new SteamStoreClient();

    // Get app ids from our database
    let games = await source.index();

    // Get all app ids from steam
    let response: ISteamAppListResponse = await apiClient.getAppList();
    let apps: Array<ISteamAppListItem> = response.applist.apps;

    // Filter apps
    apps = apps.filter((app) => {
        return !games.includes(app.appid);
    });

    for (let app of apps) {
        let appid: number = app.appid;
        let detailsResponse: ISteamAppDetailsResponse = await storeClient.getAppDetails(appid);

        let success: boolean = detailsResponse[appid].success;
        if (!success) {
            // Log error
            // Add failed app to DB
            continue;
        }

        let details: ISteamApp = detailsResponse[appid].data;

        console.log(details)

        break;
    }

    source.disconnect();
    return true;
};
