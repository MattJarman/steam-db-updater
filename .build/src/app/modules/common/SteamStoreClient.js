"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const HttpClient_1 = __importDefault(require("./HttpClient"));
const config_1 = __importDefault(require("config"));
class SteamStoreClient extends HttpClient_1.default {
    constructor() {
        super(config_1.default.get('steam.store.baseUrl'));
    }
    async getAppDetails(id) {
        let route = config_1.default.get('steam.store.routes.appDetails');
        return this.instance.get(`${route}${id}`);
    }
}
exports.default = SteamStoreClient;
