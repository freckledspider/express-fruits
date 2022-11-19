//---------------------------------
// Summary of Dependencies
//---------------------------------
// - express => web framework for create server and writing routes

// - mongoose => ODM for connecting to and sending queries to a mongo database

// - method-override => allows us to swap the method of a request based on a URL query

// - ejs => our templating engine

// - dotenv => will allow us to use a `.env` file to define environmental variables we can access via the `process.env` object

// - morgan => logs details about requests to our server, mainly to help us debug

require("dotenv").config() // load env variables
const express = require("express") // bring in express to make our app
const morgan = require("morgan")
const methodOverride = require("method-override") // allows us to override post request fromour ejs/forms
const mongoose = require("mongoose") // gives us that db connection and cool methods for CRUD to the data
const PORT = process.env.PORT
const app = express()


//---------------------------------
// Database Connections
//---------------------------------

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


//---------------------------------
// Fruits model
//---------------------------------

const {Schema, model} = mongoose // destructuring, grabbing model and schem a off mongoose variable

const fruitSchema = new Schema({
    name: String,
    color: String,
    readyToEat: Boolean
})

const Fruit = model("fruit", fruitSchema)


//---------------------------------
// Middleware
//---------------------------------

app.use(morgan("tiny"))
app.use(methodOverride("_method"))
app.use(express.urlencoded({extended:true}))
app.use(express.static("public"))

//---------------------------------
// Routes
//---------------------------------

app.get("/", (req, res) => {
    res.send("Server doing what it should be doing")
})

app.get("/fruits/seed", (req, res) => {
    // define data we want to put in the database
    const startingFruits = [
        { name: "Orange", color: "orange", readyToEat: false },
        { name: "Grape", color: "purple", readyToEat: false },
        { name: "Banana", color: "orange", readyToEat: false },
        { name: "Strawberry", color: "red", readyToEat: false },
        { name: "Coconut", color: "brown", readyToEat: false },
      ]

      // delete all fruits
      Fruit.deleteMany({}, (err, data) => {

        // create new fruits once old
        Fruit.create(startingFruits, (err, createdFruits) => {
            res.json(createdFruits)
        })
      })

})


app.get("/fruits", (req, res) => {

    // get all the fruits from mongo and send them back
    Fruit.find({})
    .then((fruits) => {
        // res.json(fruits)
        res.render("fruits/index.ejs", {fruits})
    })
    .catch(err => console.log(err))
})


// show

app.get("/fruits/:id", (req, res) => {

    // go and get the fruit from the database
    Fruit.findById(req.params.id)
    .then((fruit) => {
        res.render("fruits/show.ejs", {fruit})
    })
})

app.listen(PORT, () => console.log(`Who let the dogs out on port: ${PORT}`))