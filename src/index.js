import dotenv from "dotenv";
import connectDB from "./db/index.js";
dotenv.config({path: ".env"});
import app from "./app.js";


connectDB()
.then(()=>{
    app.listen(process.env.PORT || 8000, ()=>{
        console.log(`Server is running on port ${process.env.PORT}`);
    })
})
.catch((error)=>{
    console.log("MongoDB connection failed");
    throw error;
})






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