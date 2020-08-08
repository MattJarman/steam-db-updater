"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const HttpClient_1 = __importDefault(require("./HttpClient"));
const config_1 = __importDefault(require("config"));
class SteamAPIClient extends HttpClient_1.default {
    constructor() {
        super(config_1.default.get('steam.api.baseUrl'));
    }
    async getAppList() {
        let route = config_1.default.get('steam.api.routes.appList');
        return this.instance.get(route);
    }
}
exports.default = SteamAPIClient;
