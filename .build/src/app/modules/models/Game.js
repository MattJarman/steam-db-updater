"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const GameSchema_1 = __importDefault(require("../schemas/GameSchema"));
const Game = mongoose_1.default.model('Game', GameSchema_1.default);
exports.default = Game;
