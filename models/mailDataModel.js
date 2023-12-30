const mongoose = require("mongoose")



const mailData = new mongoose.Schema({
    name: String,
    email:String,
    mobileNumber: String,
    message: String
}, { timestamps: true })




const mailDataModel = mongoose.model('mailData', mailData)

module.exports = mailDataModel