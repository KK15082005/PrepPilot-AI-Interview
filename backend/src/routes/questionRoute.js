const express = require("express");
const questionController = require("../controllers/questionController");
const verifyToken = require("../middleware/authMiddleware");

const questionRouter = express.Router();

/**
 * @route   GET /api/question/:interviewId
 * @desc    Get all questions for an interview (authenticated)
 */
questionRouter.get("/:interviewId", verifyToken, questionController.getQuestions);

module.exports = questionRouter;
