import Mongoose from 'mongoose';
import IFailedApp from "../interfaces/mongoose/FailedAppInterface";
import FailedAppSchema from "../schemas/FailedAppSchema";

const FailedApp = Mongoose.model<IFailedApp>('FailedApp', FailedAppSchema);

export default FailedApp;