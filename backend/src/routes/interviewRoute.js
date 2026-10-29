const express = require("express");
const interviewController = require("../controllers/interviewController");
const verifyToken = require("../middleware/authMiddleware");

const interviewRouter = express.Router();

/**
 * @route   POST /api/interview/create-interview
 * @desc    Create a new interview
 */
interviewRouter.post("/create-interview", verifyToken, interviewController.createInterview);
interviewRouter.post("/", verifyToken, interviewController.createInterview);

/**
 * @route   GET /api/interview/
 * @desc    Get all interviews for the authenticated user
 */
interviewRouter.get("/", verifyToken, interviewController.getAllInterviews);

/**
 * @route   GET /api/interview/:id
 * @desc    Get a single interview by ID
 */
interviewRouter.get("/:id", verifyToken, interviewController.getInterview);

/**
 * @route   DELETE /api/interview/:id
 * @desc    Delete an interview by ID
 */
interviewRouter.delete("/:id", verifyToken, interviewController.deleteInterview);

module.exports = interviewRouter;
