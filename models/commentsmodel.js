const mongoose = require("mongoose") ; 

const commentschema = new mongoose.Schema({
    commentText : String , 
    postedBy : {
        type : mongoose.Schema.Types.ObjectId , 
        ref : "user"
    }  , 
    blogId : { 
        type : mongoose.Schema.Types.ObjectId , 
        ref : "blog"
    }
})

module.exports = mongoose.model("comment" , commentschema)