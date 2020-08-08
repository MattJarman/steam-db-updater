"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const GameSchema = new mongoose_1.Schema({
    _id: Number,
    name: String,
    type: String,
    headerImage: String,
    description: String,
    pcRequirements: mongoose_1.Schema.Types.Mixed,
    platforms: mongoose_1.Schema.Types.Mixed,
    screenshots: mongoose_1.Schema.Types.Mixed,
    developers: [String],
    publishers: [String],
    categories: mongoose_1.Schema.Types.Mixed,
    metacritic: mongoose_1.Schema.Types.Mixed
});
exports.default = GameSchema;
