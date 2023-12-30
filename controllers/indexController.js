const { catchAsyncErrors } = require("../middlewares/catchAsyncErrors")
const userModel = require("../models/userModel")
const { sendToken } = require("../utils/SendToken")
const ErrorHandler = require("../utils/errorHandler")
const mailDataModel = require("../models/mailDataModel")
const nodemailer = require("nodemailer")



const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
        user: process.env.SMTP_MAIL,
        pass: process.env.SMTP_PASSWORD,
    },
});



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



exports.sendmail = catchAsyncErrors(async (req, res, next) => {
    const data = req.body
    try {
        const gg = await mailDataModel.create({
            name: data.name,
            email: data.email,
            mobileNumber: data.number,
            message: data.message
        })
    } catch (error) {
        
    }
  

    var mailOptions = {
        from: process.env.SMTP_MAIL,
        to: data.email,
        subject: "Thank You for Contacting OptiManage Softwares",
        html: `<h5>
        Dear ${data.name}, <br><br>
        Thank you for reaching out to OptiManage Softwares. We are thrilled to have received your inquiry and are eager to assist you with your query.
        Your interest in our services is greatly appreciated, and we assure you that our team is already reviewing your message. We strive to provide prompt and efficient support to our valued customers.
        Please expect a follow-up from us shortly. Our dedicated team will work diligently to address your concerns and provide you with the information or assistance you require.
        In the meantime, if you have any additional details or questions you'd like to share, please don't hesitate to let us know. We are here to ensure that your experience with OptiManage Softwares exceeds your expectations.
        Once again, thank you for choosing OptiManage Softwares. We look forward to speaking with you soon.
        <br><br>
        Best Regards,<br>
        OptiManage Softwares
        </h5>`
    }
    transporter.sendMail(mailOptions, function (err, info) {
        if (err) {
            console.log(err)
            res.json({ message: "Error Try Again" })
        } else {
            res.json({ message: "Mail successfully sent" })
        }
    })


    var mailOptions2 = {
        from: process.env.SMTP_MAIL,
        to: "gouravshandilya48@gmail.com",
        subject: "New Inquiry Received: Action Required",
        html: `<h5>
        The customer has reached out to us seeking assistance and information regarding our services. As always, providing exceptional support to our clients is our top priority.<br><br>
        name: ${data.name}<br><br>
        email: ${data.email}<br><br>
        mobileNumber: ${data.number}<br><br>
        message: ${data.message}<br><br>
        </h5>`
    }
    transporter.sendMail(mailOptions2, function (err, info) {
        if (err) {
            console.log(err)
        } else {
           
        }
    })

})