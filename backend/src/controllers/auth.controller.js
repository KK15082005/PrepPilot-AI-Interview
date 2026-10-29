const userModel = require("../model/userSchema");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const JWT_SECRET = process.env.JWT_SECRET;
const bcrypt = require("bcryptjs");

async function register(req, res) {
    try {
        const { username, email, password } = req.body;

        const isAlreadyRegistered = await userModel.findOne({
            $or: [{ username }, { email }]
        });

        if (isAlreadyRegistered) {
            return res.status(409).json({
                message: "Username or Email already Registered"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await userModel.create({
            username,
            email,
            password: hashedPassword,
        });

        const accessToken = jwt.sign(
            { id: user._id },
            JWT_SECRET,
            { expiresIn: "15m" }
        );
        const refreshToken = jwt.sign(
            { id: user._id },
            JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });

        return res.status(201).json({
            message: "User Registered Successfully!",
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
            },
            accessToken
        });

    } catch (err) {
        console.error("Register Error:", err.message);
        return res.status(500).json({
            message: err.message
        });
    }
}

async function getMe(req, res) {
    try {
        const token = req.headers.authorization?.split(" ")[1] || req.cookies?.accessToken;
        if (!token) {
            return res.status(401).json({
                message: "Token Not Found"
            });
        }

        const decoded = jwt.verify(token, JWT_SECRET);
        const user = await userModel.findById(decoded.id).select("-password");
        if (!user) {
            return res.status(404).json({
                message: "User Not Found"
            });
        }

        return res.status(200).json({
            message: "User fetched Successfully",
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });
    } catch (err) {
        return res.status(401).json({
            message: "Invalid or expired token"
        });
    }
}

async function refreshToken(req, res) {
    try {
        const token = req.cookies?.refreshToken;
        if (!token) {
            return res.status(401).json({
                message: "RefreshToken not Found"
            });
        }

        const decoded = jwt.verify(token, JWT_SECRET);
        const user = await userModel.findById(decoded.id);
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        const accessToken = jwt.sign(
            { id: decoded.id },
            JWT_SECRET,
            { expiresIn: "15m" }
        );

        return res.status(201).json({
            message: "AccessToken refreshed Successfully",
            accessToken
        });
    } catch (err) {
        return res.status(401).json({
            message: "Invalid or expired refresh token"
        });
    }
}

async function login(req, res) {
    try {
        const { email, password } = req.body;

        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({
                message: "User Not Found"
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid Credentials"
            });
        }

        const accessToken = jwt.sign(
            { id: user._id },
            JWT_SECRET,
            { expiresIn: "15m" }
        );

        const refreshToken = jwt.sign(
            { id: user._id },
            JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        return res.status(200).json({
            message: "Login Successful",
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            },
            accessToken
        });

    } catch (err) {
        console.error("Login Error:", err.message);
        return res.status(500).json({
            message: err.message
        });
    }
}

async function logout(req, res) {
    try {
        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict"
        });

        return res.status(200).json({
            success: true,
            message: "Logged out successfully"
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
}

module.exports = { register, getMe, refreshToken, login, logout };
