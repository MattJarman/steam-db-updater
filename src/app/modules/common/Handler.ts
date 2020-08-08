import GameSource from "../sources/GameSource";
import ISteamAppListResponse from "../interfaces/steam/api/SteamAppListResponseInterface";
import SteamAPIClient from "./SteamAPIClient";
import ISteamAppListItem from "../interfaces/steam/api/SteamAppListItemInterface";

export const handler = async (event: any = {}): Promise<any> => {
    let source: GameSource = new GameSource();
    let apiClient: SteamAPIClient = new SteamAPIClient();

    // Get app ids from our database
    let games = await source.index();

    // Get all app ids from steam
    let response: ISteamAppListResponse = await apiClient.getAppList();
    let apps: Array<ISteamAppListItem> = response.applist.apps;

    source.disconnect();
    return apps;
};
