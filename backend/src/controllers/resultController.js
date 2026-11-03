const resultModel = require("../model/resultSchema");
const answerModel = require("../model/answerSchema");
const interviewModel = require("../model/interviewSchema");
const questionModel = require("../model/questionSchema");
const { generateFinalFeedback } = require("../services/aiService");

async function getResult(req, res) {
    try {
        const { interviewId } = req.params;
        const userId = req.user._id;

        // Verify interview ownership
        const interview = await interviewModel.findOne({
            _id: interviewId,
            user: userId
        });

        if (!interview) {
            return res.status(404).json({
                success: false,
                message: "Interview not found or unauthorized"
            });
        }

        // Fetch questions and answers
        const questions = await questionModel.find({ interviewId });
        const answers = await answerModel.find({ interviewId, userId });

        // Helper to construct question-by-question breakdown
        const buildBreakdown = (qList, aList) => {
            const answerMap = new Map();
            aList.forEach((a) => {
                answerMap.set(String(a.questionId), a);
            });

            return qList.map((q) => {
                const a = answerMap.get(String(q._id));
                return {
                    questionId: q._id,
                    question: q.question,
                    questionType: q.questionType,
                    topic: q.topic,
                    answer: a ? a.answer : "",
                    isAnswered: Boolean(a),
                    score: a ? a.score : 0,
                    feedback: a ? a.feedback : "Not answered yet.",
                    strengths: a ? (a.strengths || []) : [],
                    weakness: a ? (a.weakness || a.weaknesses || []) : [],
                    accurateAnswer: a ? a.accurateAnswer : ""
                };
            });
        };

        // Check if result is already saved in the database
        let existingResult = await resultModel.findOne({ interviewId, userId });

        if (existingResult) {
            const breakdown = buildBreakdown(questions, answers);
            return res.status(200).json({
                success: true,
                result: existingResult,
                interview,
                breakdown
            });
        }

        // No saved result yet: compute from answers
        if (answers.length === 0) {
            return res.status(400).json({
                success: false,
                message: "No answers found. Please answer at least one question before generating results."
            });
        }

        let totalScore = 0;
        let strengths = [];
        let weakness = [];

        for (const ans of answers) {
            totalScore += ans.score || 0;
            if (ans.strengths && Array.isArray(ans.strengths)) {
                strengths.push(...ans.strengths);
            }
            const ansWeakness = ans.weakness || ans.weaknesses;
            if (ansWeakness && Array.isArray(ansWeakness)) {
                weakness.push(...ansWeakness);
            }
        }

        const averageScore = Math.round((totalScore / answers.length) * 10) / 10;
        let overallRating = "";
        if (averageScore >= 9) {
            overallRating = "Excellent";
        } else if (averageScore >= 7) {
            overallRating = "Good";
        } else if (averageScore >= 5) {
            overallRating = "Can do better";
        } else {
            overallRating = "Needs Practice";
        }

        // Call Gemini AI for final holistic feedback
        let finalFeedback = {
            overallFeedback: "You demonstrated solid effort during this interview. Keep practicing to build confidence and polish technical details.",
            recommendation: "Focus on articulating key technical terminologies and providing concrete examples.",
            nextSteps: [
                "Review ideal answers provided in the breakdown below.",
                "Practice answers out loud to improve fluency.",
                "Schedule a follow-up mock interview on weaker topics."
            ]
        };

        try {
            const aiFeedback = await generateFinalFeedback({
                averageScore,
                strengths: Array.from(new Set(strengths)),
                weakness: Array.from(new Set(weakness))
            });

            if (aiFeedback) {
                finalFeedback = {
                    overallFeedback: aiFeedback.overallFeedback || finalFeedback.overallFeedback,
                    recommendation: aiFeedback.recommendation || finalFeedback.recommendation,
                    nextSteps: (aiFeedback.nextSteps && aiFeedback.nextSteps.length > 0)
                        ? aiFeedback.nextSteps
                        : finalFeedback.nextSteps
                };
            }
        } catch (aiErr) {
            console.error("AI final feedback error (using fallback):", aiErr.message);
        }

        // Persist the result in DB
        const savedResult = await resultModel.create({
            interviewId,
            userId,
            totalQuestions: questions.length,
            answeredQuestions: answers.length,
            overallScore: totalScore,
            averageScore,
            overallRating,
            overallFeedback: finalFeedback.overallFeedback,
            recommendation: finalFeedback.recommendation,
            nextSteps: finalFeedback.nextSteps,
            strengths: Array.from(new Set(strengths)),
            weakness: Array.from(new Set(weakness))
        });

        // Mark interview status as Completed
        interview.status = "Completed";
        await interview.save();

        const breakdown = buildBreakdown(questions, answers);

        return res.status(200).json({
            success: true,
            result: savedResult,
            interview,
            breakdown
        });

    } catch (err) {
        console.error("Get Result Controller Error:", err);
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
}

module.exports = { getResult };
