const express = require("express") ;
const resultController = require("../controllers/resultController");
const verifyToken = require("../middleware/authMiddleware");

const resultRouter = express.Router() ;
/**
 * /api/interview/getResult
 */
resultRouter.get("/:interviewId" , verifyToken , resultController.getResult) ;


module.exports = resultRouter ;