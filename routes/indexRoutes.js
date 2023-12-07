const express = require('express')
const { homepage,hotelSignup,hotelSignin,hotelSignout,hotelUser} = require('../controllers/indexController')
const { isAuthenticatedUser } = require('../middlewares/authenticated')
const router = express.Router()


//routes
router.get('/',isAuthenticatedUser,homepage)

//Authentication
//Signup
router.post('/hotel/signup',hotelSignup)
//SignIn
router.post('/hotel/signin',hotelSignin)

//Authenticated routes
//SignOut
router.get('/hotel/signout',isAuthenticatedUser,hotelSignout)
//Current User Details
router.get('/hotel/user',isAuthenticatedUser,hotelUser)

module.exports = router