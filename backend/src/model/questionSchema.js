const mongoose = require("mongoose") ;

const questionSchema = new mongoose.Schema({
    interviewId :{
        type : mongoose.Schema.Types.ObjectId ,
        trim : true,
        ref : "interview" 
    },
    question : {
        type : String ,
        trim : true,
        required : true
    },
    questionType : {
        type : String ,
        trim : true,
        required : true 
    },
    topic : {
        type : String ,
        trim : true,
        required : true
    }

} , {timestamps : true})

const questionModel = mongoose.model("question" , questionSchema) ;

module.exports = questionModel;