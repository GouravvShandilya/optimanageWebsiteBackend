const mongoose = require('mongoose')
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")


const userModel = new mongoose.Schema({
    email: {
        type: String,
        trim: true,
        unique: true,
        required: [true, "Email is required"],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password: {
        type: String,
        select: false,
        maxLength: [15, "Password should not exceed more than 15 characters"],
        minLength: [6, "Password should have atleast 6 characters"],
        // match:[]
    }
}, { timestamps: true })


userModel.pre("save", function () {

    if (!this.isModified("password")) {
        return
    }

    let salt = bcrypt.genSaltSync(10)
    this.password = bcrypt.hashSync(this.password, salt)
})

userModel.methods.comparepassword = function(password){

    return bcrypt.compareSync(password,this.password)

}

userModel.methods.getJWTtoken = function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET_KEY,{expiresIn:process.env.JWT_EXPIRE})
}
const user = mongoose.model('userModel', userModel)

module.exports = user