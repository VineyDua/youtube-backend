import mongoose from "mongoose";
import {DB_NAME} from "../constants.js";

const connectDB = async () => {
    try{
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`);
        console.log(`Connected to MongoDB ${DB_NAME} database, ${connectionInstance.connection.host}`);
    }
    catch(error){
        console.log("MongoDB connection failed, exiting the application");
        process.exit(1);
    }
}

export default connectDB;

