const { catchAsyncErrors } = require("../middlewares/catchAsyncErrors")
const userModel = require("../models/userModel")
const { sendToken } = require("../utils/SendToken")
const ErrorHandler = require("../utils/errorHandler")


exports.homepage = catchAsyncErrors(async (req, res, next) => {
    res.json({ message: 'homepage' })
}

)


exports.hotelSignup = catchAsyncErrors(async (req, res, next) => {
    const user = await new userModel(req.body).save()
    sendToken(user, 201, res)
    res.json({ sag: user })
})



// HotelSignIN controller
exports.hotelSignin = catchAsyncErrors(async (req, res, next) => {
    // finding the user with the email provided 
    const user = await userModel.findOne({ email: req.body.email })
        // .select("+password") it will also include password field in the user
        .select("+password")

    // if user does not exist the the database then the below code will throw error
    if (!user) return next(new ErrorHandler("User Not Found", 404))

    //isMatchPassword will compare the database password field with the password we got in req.body
    const isMatchPassword = user.comparepassword(req.body.password)
    if (!isMatchPassword) return next(new ErrorHandler("Wrong Password", 500))


    sendToken(user, 201, res)
    res.json(user)
})



exports.hotelSignout = catchAsyncErrors(async (req, res, next) => {
    res.clearCookie("token")
    res.json({ message: 'successfully signout' })
})




exports.hotelUser = catchAsyncErrors(async (req, res, next) => {

    const user = await userModel.findById(req.id)

    res.json({ user })
})