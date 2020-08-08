"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const SteamStoreClient_1 = __importDefault(require("./SteamStoreClient"));
const GameSource_1 = __importDefault(require("../sources/GameSource"));
const SteamAPIClient_1 = __importDefault(require("./SteamAPIClient"));
exports.handler = async (event = {}) => {
    let source = new GameSource_1.default();
    let storeClient = new SteamStoreClient_1.default();
    let apiClient = new SteamAPIClient_1.default();
    // Get app ids from our database
    let games = await source.index();
    // Get all app ids from steam
    let response = await apiClient.getAppList();
    console.log(response.applist.apps);
    source.disconnect();
    return;
};
