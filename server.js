//---------------------------------
// Summary of Dependencies
//---------------------------------
// - express => web framework for create server and writing routes

// - mongoose => ODM for connecting to and sending queries to a mongo database

// - method-override => allows us to swap the method of a request based on a URL query

// - ejs => our templating engine

// - dotenv => will allow us to use a `.env` file to define environmental variables we can access via the `process.env` object

// - morgan => logs details about requests to our server, mainly to help us debug

require("dotenv").config()  // Load env variables
const express = require('express') // bring in express to make our app
const morgan = require('morgan') // nice logger for our request
const methodOverride = require('method-override') // allows us to override post request from our ejs/forms
const PORT = process.env.PORT
const FruitRouter = require('./controllers/fruit')

const app = express()

//////////////////////////////////////////////
//////// Middlewares
///////////////////////////////////////////////

app.use(morgan('tiny'))
app.use(methodOverride('_method'))
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))

// app.get('/', homeRoutes)
// app.get('/store', storeRoutes)
// app.get('/user', userRoutes)
app.use('/fruits', FruitRouter)

app.listen(PORT, ()=> console.log(`Who let the dogs out on port: ${PORT}`))