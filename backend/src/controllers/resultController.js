const answerModel = require("../model/answerSchema") ;
const { generateFinalFeedback } = require("../services/aiService");

async function getResult(req , res){
    try{
        const {interviewId} = req.params ;
        const answer = await answerModel.find({interviewId});
        if(answer.length == 0){
            return res.status(404).json({
                success : false ,
                message : "Answer not Found"
            });
        }

        let totalScore = 0 ;
        let strengths = [];
        let weakness = []; 

        for(const ans of answer){
            totalScore += ans.score || 0;
            if (ans.strengths && Array.isArray(ans.strengths)) {
                strengths.push(...ans.strengths);
            }
            const ansWeakness = ans.weakness || ans.weaknesses;
            if (ansWeakness && Array.isArray(ansWeakness)) {
                weakness.push(...ansWeakness);
            }
        }
    
        const averageScore = Math.round((totalScore / answer.length) * 10) / 10;
        let overallRating = "" ;
        if(averageScore >= 9){
            overallRating = "Excellent" ;
        }
        else if(averageScore >= 7){
            overallRating = "Good" ;
        }
        else if(averageScore >= 5){
            overallRating = "Can do better" ;
        }
        else{
            overallRating = "Need to work hard a lot" ;
        }

        const finalResult = await generateFinalFeedback({
            averageScore ,
            strengths ,
            weakness
        });

        return res.status(200).json({
            success : true ,
            totalQuestions : answer.length,
            overallScore : totalScore ,
            averageScore ,
            overallRating ,
            overallFeedback : finalResult.overallFeedback ,
            recommendation : finalResult.recommendation ,
            nextSteps : finalResult.nextSteps || [] ,
            strengths ,
            weakness
        });
    }catch(err){
        return res.status(500).json({
            success : false ,
            message : err.message
        });
    }
}

module.exports = {getResult} ;
