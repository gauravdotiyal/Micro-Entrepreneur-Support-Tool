const mongoose = require('mongoose');

const connectDB= async()=>{
    try {
        await mongoose.connect(process.env.MONGO_DB_URI);
        console.log("Mongodb connected successfully");
    } catch (error) {
        console.log("Not Connected to MongoDb", error)
        process.exit(1);
    }
} 
 

module.exports= connectDB;