const express = require("express");
const resultController = require("../controllers/resultController");
const verifyToken = require("../middleware/authMiddleware");

const resultRouter = express.Router();

/**
 * @route   GET /api/result/:interviewId
 * @desc    Get or generate evaluation result for an interview
 */
resultRouter.get("/:interviewId", verifyToken, resultController.getResult);
resultRouter.post("/:interviewId", verifyToken, resultController.getResult);

module.exports = resultRouter;
