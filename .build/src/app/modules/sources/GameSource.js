"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DB_1 = __importDefault(require("../common/DB"));
const Game_1 = __importDefault(require("../models/Game"));
class GameSource extends DB_1.default {
    constructor() {
        super();
        this.game = Game_1.default;
    }
    async index() {
        return new Promise((resolve, reject) => {
            this.game.find({ type: 'game' })
                .distinct('_id')
                .lean()
                .exec((err, results) => {
                if (err) {
                    reject(err);
                }
                resolve(results);
            });
        });
    }
}
exports.default = GameSource;
