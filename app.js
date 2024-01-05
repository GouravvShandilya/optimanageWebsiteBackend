require('dotenv').config({ path: './.env' })
const express = require('express')
const app = express()
const logger = require("morgan")
const cors = require("cors")
const PORT = process.env.PORT



app.use(cors({
    origin:"https://optimanage.co.in/contactus",
    credentials:true
}));


//database connection
require('./models/database').connectdatabase()

//logger for routes handling
app.use(logger("tiny"))

//body parser
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// session and cookie

const session = require ("express-session")
const cookieparser = require("cookie-parser")

app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: process.env.EXPRESS_SESSION_SECRET
}))

app.use(cookieparser())


// Routes
app.use('/', require("./routes/indexRoutes"))


//error handling
const ErrorHandler = require('./utils/errorHandler')
const { generatedErrors } = require('./middlewares/errors')

app.all('*', (req, res, next) => {
    next(new ErrorHandler(`Page Not Found ${req.url}`, 404))
})
app.use(generatedErrors)


// server setup
app.listen(PORT, console.log(`Server is running on port ${PORT}`))