const mongoose = require('mongoose')

exports.connectdatabase = async()=>{
try {
    await mongoose.connect(process.env.mongodbUrl)
    console.log('database connected')
} catch (error) {
    
    console.log(error)
    console.log('database error')
}
}