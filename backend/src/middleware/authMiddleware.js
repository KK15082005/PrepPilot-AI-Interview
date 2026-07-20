const jwt = require("jsonwebtoken") ;
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET ;

const verifyToken = (req , res , next)=>{
    try{
        const token = req.headers.authorization?.split(" ")[1] || req.cookies.accessToken ;

        if(!token){
            return res.status(401).json({
                message : "Token Not Found"
            });
        }

        const decoded = jwt.verify(token , JWT_SECRET);
        req.user = {
            _id : decoded.id
        }
        next();
    }catch(err){
        console.error(err) ;
        console.log("JWT Secret:", JWT_SECRET);
        return res.status(401).json({
            message : "INVALID TOKEN"
        })
    }
}

module.exports = verifyToken ;