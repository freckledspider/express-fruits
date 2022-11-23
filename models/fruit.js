//---------------------------------
// Fruits model
//---------------------------------

const mongoose = require("./connection")
const {Schema, model} = mongoose // destructuring, grabbing model and schem a off mongoose variable

const fruitSchema = new Schema({
    name: String,
    color: String,
    readyToEat: Boolean
})

const Fruit = model("fruit", fruitSchema)

module.exports = Fruit