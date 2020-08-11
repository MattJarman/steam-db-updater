import { Schema } from 'mongoose';

const FailedAppSchema = new Schema({
    appid: Number,
    errorCode: Number,
    errorResponse: String
});

export default FailedAppSchema;