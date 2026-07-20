const express = require("express") ;
const interviewController = require("../controllers/interviewController");
const verifyToken = require("../middleware/authMiddleware");

const interviewRouter = express.Router() ;
/**
 * /api/interview/create-interview
 */
interviewRouter.post("/create-interview" , verifyToken, interviewController.createInterview) ;

module.exports = interviewRouter ;