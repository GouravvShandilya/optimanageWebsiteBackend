const jwt = require("jsonwebtoken")
const { catchAsyncErrors } = require("./catchAsyncErrors")
const ErrorHandler = require("../utils/errorHandler")


exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
    const { token } = req.cookies

    if (!token) {
        return next(new ErrorHandler("Please Login First", 401))
    }

    const { id } = jwt.verify(token, process.env.JWT_SECRET_KEY)
    req.id = id
    
    next()

    // res.json({token,id})
})