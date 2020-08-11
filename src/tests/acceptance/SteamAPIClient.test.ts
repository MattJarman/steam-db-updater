import SteamAPIClient from "../../modules/common/SteamAPIClient";
import ISteamAppListResponse from "../../modules/interfaces/steam/api/SteamAppListResponseInterface";
import ISteamAppList from "../../modules/interfaces/steam/api/SteamAppListInterface";
import ISteamAppListItem from "../../modules/interfaces/steam/api/SteamAppListItemInterface";

describe('Unmocked case for steam api client response', async () => {
    test('Test api returns correct response', async () => {
        let client: SteamAPIClient = new SteamAPIClient();

        let response: ISteamAppListResponse = await client.getAppList();
        let appList: ISteamAppList = response.applist;
        let apps: Array<ISteamAppListItem> = appList.apps;
        console.log(apps);
    });
});