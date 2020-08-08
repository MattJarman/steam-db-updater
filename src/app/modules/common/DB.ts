import Mongoose from 'mongoose';
import Config from 'config';

class DB {
    connection: any;

    public constructor() {
        this.connect();
    }

    public connect(): any {
        let mongooseOptions: object = Config.get('mongoose.options');

        Mongoose.connect(this.getUriString(), mongooseOptions)
            .then(r => console.log('Connected to the database!'));

        this.connection = Mongoose.connection;

        return this.connection;
    }

    public disconnect(): void
    {
        this.connection.close();
    }

    private getUriString(): string
    {
        let username: string = process.env.MONGODB_USERNAME!;
        let password: string = process.env.MONGODB_PASSWORD!;
        let host: string = Config.get('mongodb.host');
        let database: string = Config.get('mongodb.database');
        let options: string = DB.getOptionsString(Config.get('mongodb.options'));

        return `mongodb+srv://${username}:${password}@${host}/${database}?${options}`;
    }


    private static getOptionsString(options: object): string
    {
        let optionsArray: Array<string> = [];
        for (let [key, value] of Object.entries(options)) {
            optionsArray.push(`${key}=${value}`);
        }

        return optionsArray.join('&');
    }
}

export default DB;
