import API from "./api";

export async function getQuestions(interviewId) {
    const response = await API.get(`/question/${interviewId}`);
    return response.data.questions;
}
