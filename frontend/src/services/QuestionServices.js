import axios from "axios";


const API = "http://localhost:3000/api/question";

export async function getQuestions(interviewId) {
    const token = localStorage.getItem("token");

    const response = await axios.get(
        `${API}/${interviewId}`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data.questions;
}
