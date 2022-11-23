//---------------------------------
// Database Connections
//---------------------------------

require("dotenv").config() // load env variables
const mongoose = require("mongoose") // gives us that db connection and cool methods for CRUD to the data

const DATABASE_URL = process.env.DATABASE_URL
const CONFIG = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

// establish connection
mongoose.connect(DATABASE_URL, CONFIG)

// log connection events from mongoose
mongoose.connection 
    .on("open", () => console.log("Mongoose connected"))
    .on("close", () => console.log("Disconnected from mongoose"))
    .on("error", () => console.log("Mongoose error", error))

// export mongoose with connection to use in other files
module.exports = mongoose