const mongoose  = require('mongoose')
 

const plm = require('passport-local-mongoose')
const userschema = new mongoose.Schema({
    fullname : String , 
    username : String  , 
    email : String , 
    password : String ,
    blogs : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "blog"
    }], 
    profile : { 
        type : String ,  
        default : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMcL4AEbLTIBKLFW09-AXSjpXEPXAVBHF5Qw&s" 
    }
    
})
userschema.plugin(plm)

const user = mongoose.model("user" , userschema)
module.exports = user  

