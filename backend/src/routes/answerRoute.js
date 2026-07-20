const express = require("express") ;
const answerController = require("../controllers/answerController");
const verifyToken = require("../middleware/authMiddleware");

const answerRouter = express.Router() ;
/**
 * /api/interview/submit
 */
answerRouter.post("/submit" , verifyToken, answerController.submitAnswer) ;
answerRouter.get("/:interviewId" , verifyToken , answerController.getAllAnswers);
answerRouter.delete("/delete/:id" , verifyToken , answerController.deleteAnswer);

module.exports = answerRouter ;