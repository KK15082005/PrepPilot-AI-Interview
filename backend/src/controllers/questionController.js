const questionModel = require("../model/questionSchema");

async function getQuestions(req , res){
    try{
        const {interviewId} = req.params;
        const questions = await questionModel.find({
            interviewId : interviewId
        });
        if (questions.length == 0){
            return res.status(404).json({
                success : false,
                message : "No Question Found"
            });
        }
        return res.status(200).json({
            totalQuestions: questions.length,
            questions
        });
    }catch(err){
        return res.status(500).json({
            success : false ,
            message : err.message
        });
    }
}

module.exports = { getQuestions};