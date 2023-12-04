require('dotenv').config({path:'./.env'})
const express = require('express')
const app = express()
const PORT = process.env.PORT
const logger = require("morgan")



//logger for routes handling
app.use(logger("tiny"))


// Routes
app.use('/', require("./routes/indexRoutes"))


//error handling
const ErrorHandler = require('./utils/errorHandler')
const { generatedErrors } = require('./middlewares/errors')

app.all('*',(req,res,next)=>{
    next(new ErrorHandler(`Page Not Found ${req.url}`, 404))
})
app.use(generatedErrors)


// server setup
app.listen(PORT,console.log(`Server is running on port ${PORT}`))