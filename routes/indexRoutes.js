const express = require('express')
const { homepage,hotelSignup,hotelSignin,hotelSignout,hotelUser,sendmail} = require('../controllers/indexController')
const { isAuthenticatedUser } = require('../middlewares/authenticated')
const router = express.Router()


//routes
router.get('/',isAuthenticatedUser,homepage)

//Authentication
//Signup
router.post('/user/signup',hotelSignup)
//SignIn
router.post('/user/signin',hotelSignin)

//Authenticated routes
//SignOut
router.get('/user/signout',isAuthenticatedUser,hotelSignout)
//Current User Details
router.get('/user/getuser',isAuthenticatedUser,hotelUser)

// send mail

router.post('/user/sendmail',sendmail)


module.exports = router