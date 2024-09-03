const mongoose = require("mongoose");


const blogSchema = new mongoose.Schema({
    title : String ,
    description : String ,
    blogImage : String ,
    user : {
        type : mongoose.Schema.Types.ObjectId ,
        ref : "user"
    } , 
    comments : [
        {
            type : mongoose.Schema.Types.ObjectId , 
            ref : "comment"
        }
    ]
},{timestamps:true});


module.exports = mongoose.model("blog" , blogSchema);
