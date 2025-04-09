import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); 

export default async function connection() {
    try {
        const db = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true, 
            useUnifiedTopology: true, 
        });
        console.log("Database connected to Atlas");
        return db;
    } catch (error) {
        console.error("Error connecting to the database:", error);
        throw error;
    }
}