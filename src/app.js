import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

// we made a app through express 

const app = express()

// * app.use is a middleware 

// ^ middleware (err,req,req,next) 
// Middleware are functions that run during the request-response cycle. use next to change the function like signup and login 
// They can perform tasks like logging, authentication, parsing, and error handling.
// Middleware is invoked in the order it's defined and can call next() to pass control to the next function

app.use(cors({
    origin : process.env.CORS_ORIGIN,
    credentials:true
}))

// uploading json 
// This middleware is used to parse incoming JSON payloads.
// Payload = The actual data you care about being sent or received.
// Headers = Metadata that helps describe the payload or how to handle it.

app.use(express.json({limit : "16kb"}))

// url like special char = 20%abc or +xyz its url encoder 

app.use(express.urlencoded({extended : true , limit:'16kb'}))

// we are just making a folder to upload like images or pdf
app.use(express.static('public'))

// It allows you to easily read and manipulate cookies in Express routes.client

app.use(cookieParser())
 


export { app }