// console.log('hello world ');
// require('dotenv').config({path : './env'})
import dotenv from 'dotenv'

import connectDB from './db/index.js';

connectDB()
// config is taking an object so we are defining the path of the env 
// but its not gonna run use this on package.json on dev -r dotenv/config --experimental-json-modules
dotenv.config({
    path:'/.env'
})

/*
const app = express()
import mongoose from 'mongoose'
import { DB_NAME } from './constants';
import express from 'express'

// never connect the database into one line use async/ await ot try catch or promise block
// iifi function --> use iffi with a semicolon its a cleaning way 

;( async ()=>{
    try{
     await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
     app.on("error",()=>{
        console.log("Error:",error);
        throw error 
     })
     app.listen(process.env.PORT,()=>{
        console.log(`app is listening on port ${process.env.PORT}`);
     })

    }catch (error) {
        console.log("ERROR",error);
        throw error 
    }
})() */