const mongoose = require("mongoose");

const interviewSchema = new mongoose.Schema({
    user: {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true 
    },
    title: {
        type : String ,
        required : [true , "Enter the Title for the Interview"]
    },
    role : {
        type : String ,
        required : [true , "Role is Required" ] 
    },
    experienceLevel : {
        type : String ,
        enum : [ "Fresher" , "1-2 Years" , "3-5 Years" , "5+ Years"] ,
        required : [true , "Experience Level Required"] 
    },
    interviewType : {
        type : String ,
        enum : ["Technical" , "HR" , "Behavioral" ,"Mixed"],
        required : [true , "Interview Type Required"] 
    },
    difficulty : {
        type : String ,
        enum : ["Easy" , "Medium" , "Hard"],
        required : [true , "Difficulty Level Required"] 
    },
    duration : {
        type : Number ,
        default  : 15,
        enum : [15 , 30 , 45]
    },
    status : {
        type : String ,
        enum : ["Pending" , "Ongoing" , "Completed"] ,
        default : "Pending"
    }

},{timestamps : true});

const interviewModel = mongoose.model("interview" , interviewSchema) ;

module.exports = interviewModel ;

