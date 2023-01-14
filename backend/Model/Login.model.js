
const mongoose = require("mongoose");

const LoginModel = new mongoose.model("LoginUser",mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,require:true},
    gender:{type:String,require:true},
    age:{type:Number,require:true},
    role:{type:String,require:true}
})
);
module.exports = LoginModel