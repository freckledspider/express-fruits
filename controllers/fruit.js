const express = require("express") // bring this in so we can make our router
const Fruit = require("../models/fruit")

// create router variable to attach routes
const router = express.Router() // router will have all routes attached to it


//---------------------------------
// Actual Routes
//---------------------------------

router.get("/", (req, res) => {
    res.send("Server doing what it should be doing")
})

router.get("/fruits/seed", (req, res) => {
    // define data we want to put in the database
})


router.get("/fruits", (req, res) => {

    // get all the fruits from mongo and send them back
    Fruit.find({})
    .then((fruits) => {
        // res.json(fruits)
        res.render("fruits/index.ejs", {fruits})
    })
    .catch(err => console.log(err))
})

// new route

router.get("/fruits/new", (req, res) => {
    res.render("fruits/new.ejs")
})

// create route

router.post("/fruits", (req, res) => {
    // check if the readyToEat property should be true or false
    req.body.readyToEat = req.body.readyToEat === "on" ? true : false
    // create the new fruit
    Fruit.create(req.body, (err, fruit) => {
        // redirect the user back to the main fruits page after fruit created
        res.redirect("/fruits")
    })
})


// edit route
router.get("/fruits/:id/edit", (req, res) => {
    // get the id from params
    const id = req.params.id
    // get the fruit from the database
    Fruit.findById(id, (err, fruit) => {
        // render template and send it fruit
        res.render("fruits/edit.ejs", {fruit})
    })
})

//update route
router.put("/fruits/:id", (req, res) => {
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

router.get("/fruits/:id", (req, res) => {

    // go and get the fruit from the database
    Fruit.findById(req.params.id)
    .then((fruit) => {
        res.render("fruits/show.ejs", {fruit})
    })
})


router.delete("/fruits/:id", (req, res) => {
    // get the id from params
    const id = req.params.id
    // delete the fruit
    Fruit.findByIdAndDelete(req.params.id, (err, fruit) => {
        // redirect user back to index page
        res.redirect("/fruits")
    })
})



// export this router to use in other files
module.exports = router