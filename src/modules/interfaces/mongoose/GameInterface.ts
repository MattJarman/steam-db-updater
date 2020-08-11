import { Document } from 'mongoose';

export default interface IGame extends Document {
    _id: number;
    name: string;
    type: string;
    headerImage: string;
    description: string;
    pcRequirements: object;
    platforms: object;
    screenshots: Array<object>;
    developers: Array<string>;
    publishers: Array<string>;
    categories: Array<object>;
    metacritic: object;
};