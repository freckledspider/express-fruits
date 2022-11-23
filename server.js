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
const { emitWarning } = require("process")
const PORT = process.env.PORT
const app = express()



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

// new route

app.get("/fruits/new", (req, res) => {
    res.render("fruits/new.ejs")
})

// create route

app.post("/fruits", (req, res) => {
    // check if the readyToEat property should be true or false
    req.body.readyToEat = req.body.readyToEat === "on" ? true : false
    // create the new fruit
    Fruit.create(req.body, (err, fruit) => {
        // redirect the user back to the main fruits page after fruit created
        res.redirect("/fruits")
    })
})


// edit route
app.get("/fruits/:id/edit", (req, res) => {
    // get the id from params
    const id = req.params.id
    // get the fruit from the database
    Fruit.findById(id, (err, fruit) => {
        // render template and send it fruit
        res.render("fruits/edit.ejs", {fruit})
    })
})

//update route
app.put("/fruits/:id", (req, res) => {
    // get the id from params
    const id = req.params.id
    // check if the readyToEat property should be true or false
    req.body.readyToEat = req.body.readyToEat === "on" ? true : false
    // update the fruit
    Fruit.findByIdAndUpdate(id, req.body, {new: true}, (err, fruit) => {
        // redirect user back to main page when fruit 
        res.redirect("/fruits")
    })
})


// show

app.get("/fruits/:id", (req, res) => {

    // go and get the fruit from the database
    Fruit.findById(req.params.id)
    .then((fruit) => {
        res.render("fruits/show.ejs", {fruit})
    })
})


app.delete("/fruits/:id", (req, res) => {
    // get the id from params
    const id = req.params.id
    // delete the fruit
    Fruit.findByIdAndDelete(req.params.id, (err, fruit) => {
        // redirect user back to index page
        res.redirect("/fruits")
    })
})

app.listen(PORT, () => console.log(`Who let the dogs out on port: ${PORT}`))