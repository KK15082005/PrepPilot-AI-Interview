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

        res.cookie("refreshToken" , refreshToken,{
            httpOnly:true , 
            secure : false ,
            sameSite : "strict" ,
            maxAge : 7 * 24 * 60 * 60 * 1000 // 7days
        })

        return res.status(201).json({
            message: "User Registered Successfully!",
            user: {
                id : user._id,
                username: user.username,
                email: user.email,
            },
            accessToken
        });

    } catch (err) {
        console.error(err);   
        return res.status(500).json({
            message: err.message
        });
    }
}
async function getMe(req , res){
    //logic 1 which user requesting -Identify
    const token = req.headers.authorization?.split(" ")[1];
    if(!token){
        return res.status(401).json({
            message : "Token Not Found"
        })
    }

    //token found - read it

    const decoded = jwt.verify(token , JWT_SECRET);
    const user = await userModel.findById(decoded.id);
    res.status(200).json({
        message : "User fetched SucessFully",
        user:{
            username : user.username ,
            email : user.email
        }
    })
    //logic 2 
}

async function refreshToken(req , res){
    const refreshToken  = req.cookies.refreshToken;

    if(!refreshToken){
        return res.status(401).json({
            message : "RefreshToken not Found"
        })
    }
    const decoded = jwt.verify(refreshToken , JWT_SECRET);
    const accessToken = jwt.sign({
        id : decoded.id ,
    },JWT_SECRET,{
        expiresIn:"15m"
    })
    res.status(201).json({
        message : "AccessToken refreshed Successfully",
        accessToken
    })
}

async function login(req, res) {
    try {
        const { email, password } = req.body;

        console.log(req.body);
        console.log(email);
        console.log(password);

        // Check if user exists
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(404).json({
                message: "User Not Found"
            });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid Credentials"
            });
        }

        // Generate Access Token
        const accessToken = jwt.sign(
            { id: user._id },
            JWT_SECRET,
            { expiresIn: "15m" }
        );

        // Generate Refresh Token
        const refreshToken = jwt.sign(
            { id: user._id },
            JWT_SECRET,
            { expiresIn: "7d" }
        );

        // Store Refresh Token in Cookie
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: false,
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
        console.error(err);
        return res.status(500).json({
            message: err.message
        });
    }
}
module.exports = {register , getMe , refreshToken , login} ;