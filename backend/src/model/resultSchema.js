const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema({
    interviewId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "interview",
        required: true,
        unique: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    totalQuestions: {
        type: Number,
        default: 0
    },
    answeredQuestions: {
        type: Number,
        default: 0
    },
    overallScore: {
        type: Number,
        default: 0
    },
    averageScore: {
        type: Number,
        default: 0
    },
    overallRating: {
        type: String,
        default: ""
    },
    overallFeedback: {
        type: String,
        default: ""
    },
    recommendation: {
        type: String,
        default: ""
    },
    nextSteps: {
        type: [String],
        default: []
    },
    strengths: {
        type: [String],
        default: []
    },
    weakness: {
        type: [String],
        default: []
    }
}, { timestamps: true });

const resultModel = mongoose.model("result", resultSchema);

module.exports = resultModel;

