const mongoose = require("mongoose");

const answerSchema = new mongoose.Schema({
    interviewId : {
        type : mongoose.Schema.Types.ObjectId ,
        ref : "interview" ,
        required  : [true , "Interview id required"], 
    },
    questionId : {
        type : mongoose.Schema.Types.ObjectId ,
        ref : "question" ,
        required : [true , "Question id required"]
    },
    userId : {
        type : mongoose.Schema.Types.ObjectId ,
        ref : "User",
        required : [true , "User id required"]
    },
    answer : {
        type : String ,
        required : [true , "Answer is required"],
        trim : true
    },
    score : {
        type : Number ,
        default : 0 
    },
    feedback : {
        type : String,
        trim : true
    },
    strengths : {
        type : [String],
        default : []
    },
    weakness : {
        type : [String] ,
        default : []
    },
    accurateAnswer : {
        type : String 
    }
},{timestamps : true});

const answerModel = mongoose.model("answer" , answerSchema) ;

module.exports = answerModel ;