const express = require("express") ;
const questionController = require("../controllers/questionController");
const verifyToken = require("../middleware/authMiddleware");

const questionRouter = express.Router() ;

questionRouter.get("/:interviewId" , questionController.getQuestions)

module.exports = questionRouter ;