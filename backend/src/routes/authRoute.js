const express = require("express");
const authController = require("../controllers/auth.controller"); 
const authRouter = express.Router();

/**
 * POST /api/auth/register
 */
authRouter.post("/register", authController.register);

/**
 * GET /api/auth/get-me
 */
authRouter.get("/get-me", authController.getMe);

/**
 * POST /api/auth/login
 */
authRouter.post("/login", authController.login);

/**
 * GET /api/auth/refresh-token
 */
authRouter.get("/refresh-token", authController.refreshToken);

/**
 * POST /api/auth/logout
 */
authRouter.post("/logout", authController.logout);

module.exports = authRouter;
