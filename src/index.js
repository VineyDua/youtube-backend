import dotenv from "dotenv"; dotenv.config({path: ".env"});
import connectDB from "./db/index.js";

await connectDB();






// import express from "express";


// const app = express();

// (async()=>{
// try{
//     await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`);
//     console.log(`Connected to MongoDB ${DB_NAME} database`);
//     app.on("error", (error)=>{
//         console.log("MongoDB connection error");
//         throw error;
//     })
//     app.listen(process.env.PORT, ()=>{
//         console.log(`Server is running on port ${process.env.PORT}`);        
//     })

// catch(error){
//     console.log(error);
//     throw error;
// }
// })()