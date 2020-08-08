"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("config"));
class DB {
    constructor() {
        this.connect();
    }
    connect() {
        let mongooseOptions = config_1.default.get('mongoose.options');
        mongoose_1.default.connect(this.getUriString(), mongooseOptions)
            .then(r => console.log('Connected!'));
        this.connection = mongoose_1.default.connection;
        return this.connection;
    }
    disconnect() {
        this.connection.close();
    }
    getUriString() {
        let username = process.env.MONGODB_USERNAME;
        let password = process.env.MONGODB_PASSWORD;
        let host = config_1.default.get('mongodb.host');
        let database = config_1.default.get('mongodb.database');
        let options = DB.getOptionsString(config_1.default.get('mongodb.options'));
        return `mongodb+srv://${username}:${password}@${host}/${database}?${options}`;
    }
    static getOptionsString(options) {
        let optionsArray = [];
        for (let [key, value] of Object.entries(options)) {
            optionsArray.push(`${key}=${value}`);
        }
        return optionsArray.join('&');
    }
}
exports.default = DB;
