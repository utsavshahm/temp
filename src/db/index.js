import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";
const connectDB = async () => {
    try {
        
        const connection = await mongoose.connect(`${process.env.MONGO_URL}/${DB_NAME}`);
        console.log("Database Connected Successfully!");

    } catch (error) {
        console.log("ERROR OCCURED while connecting database!", error);
    }
}

export {connectDB};