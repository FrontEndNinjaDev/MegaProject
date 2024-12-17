import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";



const connectDB = async () =>{
    try{
     const connectionInstance = await mongoose.connect
     (`${process.env.MONGODB_URI} / ${DB_NAME}`)
     // for checking the host is right or not 
     console.log(`\n Mongodb conected !! DB Host ${connectionInstance.connection.host} `);
    } catch (error){
        console.log("Mongodb connection" , error);
        // like throw error to exit 
        process.exit(1)
    }
}

export default connectDB