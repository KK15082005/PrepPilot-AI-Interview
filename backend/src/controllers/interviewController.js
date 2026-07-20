const interviewModel = require("../model/interviewSchema") ;

async function createInterview(req ,res){
    try{
        const {title , role , experienceLevel , interviewType , difficulty , duration  } = req.body ;

        const interview = await interviewModel.create({
            user : req.user._id,
            title,
            role,
            experienceLevel ,
            interviewType , 
            difficulty ,
            duration,            
        })

        res.status(201).json({
            success : true ,
            message : "Interview Created Successfully",interview
        });
    }catch(err){
        console.error(err);
        return res.status(500).json({
            success : false,
            message : err.message
        });
    }
}

async function getAllInterviews(req , res){
    try{
        const interviews = await interviewModel
            .find({ user: req.user._id })
            .sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            message: "Interviews fetched successfully",
            interviews
        });
    }catch(err){
        res.status(500).json({
            success : false ,
            message : err.message
        });
    }
}

async function getInterview (req , res) {
    try{
        const interview = await interviewModel.findOne({
            _id: req.params.id,
            user: req.user._id
        });
        if(!interview){
            return res.status(404).json({
                success : false ,
                message : "Interview Not Found"
            });
        }
        res.status(200).json({
            success : true,
            interview
        });
    }catch(err){
        res.status(500).json({
            success : false ,
            message : err.message
        });
    }
}

async function deleteInterview(req , res){
    try{
        const interview = await interviewModel.findOneAndDelete({
            _id: req.params.id,
            user: req.user._id
        });

        if(!interview){
            return res.status(404).json({
            success: false,
            message: "Interview Not Found"
            });
        }
        res.status(200).json({
            success : true ,
            message : "Interview Deleted Succesfully !"
        });
    }catch(err){
        res.status(500).json({
            success : false ,
            message : err.message
        })
    }
}
module.exports = {createInterview , getAllInterviews , getInterview , deleteInterview};