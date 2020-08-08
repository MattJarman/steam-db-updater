import Mongoose, { Model } from 'mongoose';
import DB from '../common/DB';
import IGame from '../interfaces/mongoose/GameInterface'
import Game from '../models/Game';

class GameSource extends DB {
    game: Model<IGame>;

    public constructor() {
        super()
        this.game = Game;
    }

    public async index(): Promise<Array<object>> {
        return new Promise((resolve, reject) => {
            this.game.find({ type: 'game' })
                .distinct('_id')
                .lean()
                .exec((err, results) => {
                    if (err) {
                        reject(err);
                    }

                    resolve(results);
                })
            ;
        });
    }
}

export default GameSource;