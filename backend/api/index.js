//////////////////////////////////////////////////INITIALIZATION//////////////////////////////////////////////////////////////////////
// Import Statements

import 'dotenv/config'

import mongoose from "mongoose";

//express
import express from "express"; //main REST API handler
import compression from "compression";
import cors from "cors";

// Import Routes
import user from "./routes/user.js"
import category from "./routes/categories.js"
import car from "./routes/car.js"

import { decrypt } from "./helpers/crypto.js"
import { log_req } from "./middleware/req_log.js";
import morgan from "morgan"

import { authentication } from './middleware/authentication.js';

let app = express(); //initializing express instance.
app.use(express.json({ limit: '20mb' })); // for parsing application/json
app.use(express.urlencoded({ extended: true, limit: '20mb' })); // for parsing application/x-www-form-urlencoded
app.use(express.static('assets')); // makes a subfolder for static files.
app.use(compression());
app.use(cors());

let server = app.listen(process.env.PORT || process.env.APPPORT, "0.0.0.0", () => console.log("server started.")); //Start the server. heroku adds env automatically so process.env.PORT is necessary.



(async () => {
    try {
        mongoose.connect(process.env.APPMONGOURL)
    } catch (err) {
        console.log(err)
    }
})()


////////////////////////////////////// APP ENDPOINTS //////////////////////////////////////////////////

//app.use(log_req)
morgan.token('body', req => {
    return JSON.stringify(req.body)
})

morgan.token('query', req => {
    return JSON.stringify(req.query)
})

app.use(morgan("[:date[clf]] :method  :url HTTP/:http-version :status :res[content-length] Body':' :body Query: :query\n"))

app.use("/user", user)
app.use("/category", category)
app.use("/car", car)





