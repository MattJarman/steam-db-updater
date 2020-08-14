import Mongoose from 'mongoose'
import GameSchema from '../schemas/GameSchema'
import IGame from '../interfaces/mongoose/GameInterface'

const Game = Mongoose.model<IGame>('Game', GameSchema)

export default Game
