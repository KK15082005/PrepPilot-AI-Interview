const express = require("express");
const authController = require("../controllers/auth.controller"); 
const authRouter = express.Router();

/**
 * post api/auth/register
 */
authRouter.post("/register" , authController.register );

/**
 * api/auth/get-me
 */
authRouter.get("/get-me" , authController.getMe);

/**
 * api/auth/login
 */
authRouter.post("/login" , authController.login);


/**
 * api/auth/refresh-token
 */
authRouter.get("/refresh-token" , authController.refreshToken);

module.exports = authRouter;