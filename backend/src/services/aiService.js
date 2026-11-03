const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const pilotAI = new GoogleGenerativeAI(process.env.PREPPILOT_GEMINI_API_KEY);

function safeJsonParse(text) {
    let cleaned = text.replace(/```json/gi, "").replace(/```/g, "").trim();
    const firstBrace = cleaned.indexOf("{");
    const lastBrace = cleaned.lastIndexOf("}");
    const firstBracket = cleaned.indexOf("[");
    const lastBracket = cleaned.lastIndexOf("]");

    if (firstBracket !== -1 && (firstBrace === -1 || firstBracket < firstBrace)) {
        if (lastBracket !== -1) {
            cleaned = cleaned.substring(firstBracket, lastBracket + 1);
        }
    } else if (firstBrace !== -1 && lastBrace !== -1) {
        cleaned = cleaned.substring(firstBrace, lastBrace + 1);
    }
    return JSON.parse(cleaned);
}

// Call Gemini with automatic fallback across active models
async function callGemini(prompt) {
    const candidateModels = ["gemini-3.5-flash", "gemini-3.5-flash-lite", "gemini-3.8-flash"];
    let lastError = null;

    for (const modelName of candidateModels) {
        try {
            const model = pilotAI.getGenerativeModel({ model: modelName });
            const result = await model.generateContent(prompt);
            const response = result.response.text();
            return safeJsonParse(response);
        } catch (err) {
            console.warn(`Model ${modelName} error: ${err.message}. Trying next candidate...`);
            lastError = err;
        }
    }

    throw lastError || new Error("Failed to generate response from Gemini API.");
}

async function generateQuestions(interview) {
    let numberOfQuestions = 10;
    if (interview.duration == 15) {
        numberOfQuestions = 10;
    } else if (interview.duration == 30) {
        numberOfQuestions = 20;
    } else if (interview.duration == 45) {
        numberOfQuestions = 30;
    }

    const prompt = `You are an experienced technical interviewer. Conduct a realistic interview.
    Role: ${interview.role}
    Experience: ${interview.experienceLevel} 
    InterviewType: ${interview.interviewType}  
    Difficulty: ${interview.difficulty}
    Duration: ${interview.duration} minutes  

    Generate exactly ${numberOfQuestions} interview questions.

    RULES: 
    1. If Interview type is Technical ask Technical questions.
    2. If Interview type is HR Generate HR round questions.
    3. If Interview type is Mixed Generate Technical + HR round questions.
    4. Return ONLY a valid JSON array. Do not include markdown codeblocks or extra conversation.

    Example format:
    [
      {
        "question": "Explain JWT Authentication and how refresh tokens work.",
        "questionType": "Technical",
        "topic": "Authentication",
        "difficulty": "Medium"
      }
    ]
    `;

    return await callGemini(prompt);
}

async function evaluateAnswers(question, answer) {
    const prompt = `You are an expert interviewer.
    Evaluate the Candidate's answer thoroughly.
    Question: ${question}
    Candidate Answer: ${answer}

    Return ONLY a valid JSON object in this format:
    {
      "score": 8,
      "feedback": "Detailed feedback on what was good and what could be clearer...",
      "strengths": ["Good understanding of concepts", "Used proper technical keywords"],
      "weaknesses": ["Missed explaining edge cases", "Could provide a clearer example"],
      "accurateAnswer": "A concise, high-impact ideal answer that the candidate could study."
    }
    Score should be an integer between 1 and 10.
    `;

    return await callGemini(prompt);
}

async function generateFinalFeedback(results) {
    const prompt = `You are an expert Interviewer.
    A candidate has completed their interview session. 
    Average Score: ${results.averageScore}/10 
    Strengths observed: ${results.strengths?.length ? results.strengths.join(", ") : "Good overall effort"}
    Weaknesses / Areas to improve: ${results.weakness?.length ? results.weakness.join(", ") : "Refine technical depth and examples"}

    Return ONLY a valid JSON object in this format:
    {
      "overallFeedback": "Overall feedback paragraph speaking directly to the candidate...",
      "recommendation": "Main strategic recommendations for their upcoming real interviews...",
      "nextSteps": [
        "First actionable next step",
        "Second actionable next step",
        "Third actionable next step"
      ]
    }

    RULES: 
    1. Address the user directly as "you" and "your".
    2. Avoid third-person phrases like "the candidate".
    3. Keep the tone friendly, constructive, and encouraging.
    4. Highlight what they did well and specific ways to improve.
    `;

    return await callGemini(prompt);
}

module.exports = { generateQuestions, evaluateAnswers, generateFinalFeedback };
