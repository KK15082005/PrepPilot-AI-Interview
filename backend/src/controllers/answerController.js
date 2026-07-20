const answerModel = require("../model/answerSchema");
const questionModel = require("../model/questionSchema");

const {evaluateAnswers} = require("../services/aiService");

async function submitAnswer(req , res){
    try{
        const {
        interviewId,
        questionId,
        answer
        }=req.body;
        const question = await questionModel.findById(questionId);
        const aiEvaluation = await evaluateAnswers(question.question , answer);
        const userId = req.user._id ;
        const newAnswer = await answerModel.create ({
            interviewId,
            questionId,
            userId,
            answer,
            score : aiEvaluation.score ,
            feedback : aiEvaluation.feedaback ,
            strengths : aiEvaluation.strengths ,
            weakness : aiEvaluation.weakness ,
            accurateAnswer : aiEvaluation.accurateAnswer 
        });
        return res.status(200).json({
            success : true ,
            message : "Answer Evaluated SuccessFully!",
            answer : newAnswer
        });
    }catch(err){
        return res.status(500).json({
            success : false ,
            message :  err.message
        });
    }
}

async function getAllAnswers(req , res){
    try{
        const {interviewId} = req.params ;
        const answers = await answerModel.find({interviewId});
        return res.status(200).json({
            success : true ,
            message : "Answer Fetched SuccessFully !" ,
            totalAnswers : answers.length,
            answers
        })
    }catch(err){
        return res.status(500).json({
            success : false ,
            message : err.message
        })
    }
}

async function deleteAnswer(req , res){
    try{
        const {id} = req.params ;
        const deleteAnswer = await answerModel.findByIdAndDelete(id) ;
        if(!deleteAnswer){
            return res.status(404).json({
                success : false,
                message : "Answer not Found"
            });
        }
        return res.status(200).json({
            success : true ,
            message : "Answer Deleted SuccessFully!"
        });
    }catch(err){
        return res.status(500).json({
            success : false ,
            message : err.message
        });
    }
}
module.exports = {submitAnswer , getAllAnswers , deleteAnswer} ;