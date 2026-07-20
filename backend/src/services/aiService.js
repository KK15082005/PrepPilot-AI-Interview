const {GoogleGenerativeAI}= require("@google/generative-ai");
require("dotenv").config();

const pilotAI = new GoogleGenerativeAI(process.env.PREPPILOT_GEMINI_API_KEY) ;

async function generateQuestions(interview){
    const model = pilotAI.getGenerativeModel({
        model : "gemini-2.5-flash"
    });

    let numberOfQuestions = 10 ;
    if(interview.duration == 15){
        numberOfQuestions = 10;
    } 
    else if(interview.duration == 30){
        numberOfQuestions = 20;
    }
    else if(interview.duration == 45){
        numberOfQuestions = 30;
    }

    const prompt = `You are an experienced interviewer.Conduct a realistic interview.
    Role : ${interview.role}
    Experience : ${interview.experienceLevel} 
    InterviewType : ${interview.interviewType}  
    Difficulty : ${interview.difficulty}
    Duration :${interview.duration} minutes  

    Generate exactly ${numberOfQuestions} interview questions.

    RULES : 

    1. If Interview type is Technical ask Technical questions.

    2. If Interview type is HR Generate HR round questions.

    3. If Interview type is Mixed Generate Technical + HR round questions.

    4.  If Resume is available Generate resume based personlised questions.

    Return only JSON


    Example :[{
    "question" : "Explain JWT Authentication",
    "questionType" : "Technical",
    "topic" : "Authentication" ,
    "difficulty" : "Medium"
    }]
    `;

    const result = await model.generateContent(prompt);

    const response = result.response.text();

    let cleanedResponse = response
    .replace(/```json/g , "")
    .replace(/```/g,"")
    .trim();
    return JSON.parse(cleanedResponse);
}

async function evaluateAnswers(question , answer){
    const model = pilotAI.getGenerativeModel({
        model : "gemini-2.5-flash"
    });

    const prompt = `You are an expert interviewer.
    Evaluate the Candidates answer.
    Question: ${question}
    Candidate Answer : ${answer}
    Return ONLY JSON in this format :
    {
    "score" : 8 ,
    "feedback" : "Good answer......",
    "strengths" : ["Good Understanding" ,  "Correct terminogies used" , .....],
    "weaknesses" : ["Missed Important point" ,  "UnderConfident"],
    "accurateAnswer" : "The ideal answer for interview can be this give short + good for interview answer"
    }
    `;

    const result = await model.generateContent(prompt);
    const response = result.response.text();
    let cleanedResponse = response
    .replace(/```json/g, "")
    .replace(/```/g,"")
    .trim();
    console.log(cleanedResponse);
    return JSON.parse(cleanedResponse);
}

async function generateFinalFeedback (results){
    const model = pilotAI.getGenerativeModel({model : "gemini-2.5-flash"});
    const prompt =`
        You are an expert Interviewer.
        A candidate has completed an interview. 
        Average Score  : ${results.averageScore}/10 
        stengths : ${results.strengths.join(", ")}
        weakness : ${results.weakness.join(", ")}

    Return ONLY JSON in this format :
    {
    "overallFeedback" : "Good answer......",
    "recommendation" : ".....",
    "nextSteps" : ["...." ,  "...."]
    }
    RULES : 

    1. Address the user as "you" , "your "

    2. Avoid using "the candidate"

    3. Keep tone human friendly and encouraging don't be rude

    4. Explain What they did well

    5. Explain What they should improve.

    6. Give a real interview feedback.

    7. Summarise the interview and tell their weakness , mistakes and strengths

    `;
    const result = await model.generateContent(prompt);
    const response = result.response.text();
    let cleanedResponse = response
    .replace(/```json/g, "")
    .replace(/```/g,"")
    .trim();
    return JSON.parse(cleanedResponse);

}

module.exports = {generateQuestions , evaluateAnswers , generateFinalFeedback };