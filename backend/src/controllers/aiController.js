const interviewModel = require("../model/interviewSchema");
const { generateQuestions } = require("../services/aiService");
const questionModel = require("../model/questionSchema");

async function startInterview(req, res) {
    try {
        const { interviewId } = req.body;
        const interview = await interviewModel.findOne({
            _id: interviewId,
            user: req.user._id
        });

        if (!interview) {
            return res.status(404).json({
                success: false,
                message: "Interview Not Found or unauthorized"
            });
        }

        const existingQuestions = await questionModel.find({ interviewId });

        if (existingQuestions.length > 0) {
            return res.status(200).json({
                success: true,
                message: "Questions already generated",
                questions: existingQuestions
            });
        }

        const questions = await generateQuestions(interview);

        const savedQuestions = await questionModel.insertMany(
            questions.map((q) => ({
                interviewId: interviewId,
                question: q.question,
                questionType: q.questionType,
                topic: q.topic
            }))
        );

        return res.status(200).json({
            success: true,
            message: "Questions Generated Successfully!",
            questions: savedQuestions
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
}

module.exports = { startInterview };
