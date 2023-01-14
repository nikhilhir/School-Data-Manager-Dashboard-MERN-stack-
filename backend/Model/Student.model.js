const mongoose = require("mongoose")


const StudentSchema = new mongoose.Schema({
    name:{type:String,required:true},
    // gender:{type:String,required:true},
    // age:{type:Number,required:true},
    marks:{type:Number,required:true},
    subject:{type:String,required:true},
    date:{type:String,required:true},
    userid:String,
    completed:{type:String,default:false},
    profile_pic:{type:String}

})

const studentModel = mongoose.model("student",StudentSchema);

module.exports=studentModel