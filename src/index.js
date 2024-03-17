import express from 'express'
import dotenv from 'dotenv'
import app from './app.js'
import { connectDB } from './db/index.js'
dotenv.config({
    path : './env'
})
const PORT = 8000

connectDB()
    .then(()=>{
        app.listen((process.env.PORT || PORT), ()=>{

            try {
                console.log(`Server is listening on port number : ${process.env.PORT}`)
                
            } catch (err) {
                console.log("Error occured : ", err);
            }
        })
        
    })
    .catch((error)=>{
        console.log("Error occured on connecting the database!", error )
    })
// const app = express();



