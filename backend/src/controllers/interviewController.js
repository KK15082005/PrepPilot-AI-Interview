const interviewModel = require("../model/interviewSchema");
const resultModel = require("../model/resultSchema");
const questionModel = require("../model/questionSchema");
const answerModel = require("../model/answerSchema");

async function createInterview(req, res) {
    try {
        const { title, role, experienceLevel, interviewType, difficulty, duration } = req.body;

        const interview = await interviewModel.create({
            user: req.user._id,
            title,
            role,
            experienceLevel,
            interviewType,
            difficulty,
            duration: Number(duration) || 15,
        });

        res.status(201).json({
            success: true,
            message: "Interview Created Successfully",
            interview
        });
    } catch (err) {
        console.error("Create Interview Error:", err);
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
}

async function getAllInterviews(req, res) {
    try {
        const interviews = await interviewModel
            .find({ user: req.user._id })
            .sort({ createdAt: -1 });

        // Fetch user results to attach score and resultId
        const results = await resultModel.find({ userId: req.user._id });
        const resultMap = new Map();
        results.forEach((r) => {
            resultMap.set(String(r.interviewId), r);
        });

        const enrichedInterviews = interviews.map((item) => {
            const r = resultMap.get(String(item._id));
            return {
                ...item.toObject(),
                score: r ? `${r.averageScore}` : "-",
                resultId: r ? r._id : null
            };
        });

        res.status(200).json({
            success: true,
            message: "Interviews fetched successfully",
            interviews: enrichedInterviews
        });
    } catch (err) {
        console.error("Get All Interviews Error:", err);
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
}

async function getInterview(req, res) {
    try {
        const interview = await interviewModel.findOne({
            _id: req.params.id,
            user: req.user._id
        });

        if (!interview) {
            return res.status(404).json({
                success: false,
                message: "Interview Not Found"
            });
        }

        const result = await resultModel.findOne({
            interviewId: req.params.id,
            userId: req.user._id
        });

        res.status(200).json({
            success: true,
            interview: {
                ...interview.toObject(),
                score: result ? `${result.averageScore}` : "-",
                resultId: result ? result._id : null
            }
        });
    } catch (err) {
        console.error("Get Interview Error:", err);
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
}

async function deleteInterview(req, res) {
    try {
        const interview = await interviewModel.findOneAndDelete({
            _id: req.params.id,
            user: req.user._id
        });

        if (!interview) {
            return res.status(404).json({
                success: false,
                message: "Interview Not Found"
            });
        }

        // Clean up associated questions, answers, and results
        await questionModel.deleteMany({ interviewId: req.params.id });
        await answerModel.deleteMany({ interviewId: req.params.id });
        await resultModel.deleteMany({ interviewId: req.params.id });

        res.status(200).json({
            success: true,
            message: "Interview Deleted Successfully!"
        });
    } catch (err) {
        console.error("Delete Interview Error:", err);
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
}

async function getDashboardStats(req, res) {
    try {
        const userId = req.user._id;

        const interviews = await interviewModel.find({ user: userId });
        const results = await resultModel.find({ userId: userId });

        const totalInterviews = interviews.length;
        const completedInterviews = interviews.filter((i) => i.status === "Completed").length;

        // Calculate average score across all completed interviews
        let averageScore = "-";
        if (results.length > 0) {
            const sumScores = results.reduce((acc, curr) => acc + (curr.averageScore || 0), 0);
            averageScore = (sumScores / results.length).toFixed(1) + " / 10";
        }

        // Calculate hours/minutes practiced
        let totalMinutes = 0;
        interviews.forEach((i) => {
            if (i.status === "Completed" || i.status === "Ongoing") {
                totalMinutes += i.duration || 15;
            }
        });

        let hoursPracticed = "0 hrs";
        if (totalMinutes > 0) {
            if (totalMinutes < 60) {
                hoursPracticed = `${totalMinutes} mins`;
            } else {
                hoursPracticed = `${(totalMinutes / 60).toFixed(1)} hrs`;
            }
        }

        // Completion / success rate
        let successRate = "0%";
        if (totalInterviews > 0) {
            successRate = `${Math.round((completedInterviews / totalInterviews) * 100)}%`;
        }

        return res.status(200).json({
            success: true,
            stats: {
                totalInterviews,
                completedInterviews,
                averageScore,
                hoursPracticed,
                successRate
            }
        });
    } catch (err) {
        console.error("Get Dashboard Stats Error:", err);
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
}

module.exports = {
    createInterview,
    getAllInterviews,
    getInterview,
    deleteInterview,
    getDashboardStats
};
