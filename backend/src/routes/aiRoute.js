const express = require("express");
const aiController = require("../controllers/aiController");
const authMiddleware = require("../middleware/authMiddleware");

const aiRouter = express.Router();

/**
 * /api/interview/start-interview
 */
aiRouter.post("/start-interview" , authMiddleware , aiController.startInterview);

module.exports = aiRouter ;
