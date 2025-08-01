
const mongoose =require("mongoose");

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:2,
        maxlength:50
    },
    email:{
        type:String,
        required:true,
        unique:true,
        
    },
    
    password:{
        type:String,
        minlength:7,
        maxlength:120,
        required:true,
       
    }
},{timestamps:true}
)

module.exports = mongoose.model("User",userSchema);