const mongoose =require('mongoose')
const { type } = require('os')

const UserSchema = new mongoose.Schema({
    name:String,
    address:String,
    email:String,
    number:String,
    role:String,
    cId:String,
    password:String,
    status:{
        type:Boolean,
        default: false
    }
    
})

const UserModel = mongoose.model("users", UserSchema)
module.exports = UserModel