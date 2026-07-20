import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getQuestions } from "../services/QuestionServices";
import axios from "axios";

function Interview() {

    const { interviewId } = useParams();

    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [loading, setLoading] = useState(true);
    const [answer, setAnswer] = useState("");
    const [isListening, setIsListening] = useState(false);

    useEffect(() => {

        async function fetchQuestions() {

            try {

                const data = await getQuestions(interviewId);

                setQuestions(data);

            } catch (err) {

                console.log(err);

            } finally {

                setLoading(false);

            }

        }

        fetchQuestions();

    }, [interviewId]);

    // 🔊 Speak question whenever current question changes
    useEffect(() => {

        if (questions.length === 0) return;

        const speech = new SpeechSynthesisUtterance(
            questions[currentQuestion].question
        );

        speech.rate = 1;
        speech.pitch = 1;
        speech.volume = 1;

        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(speech);

    }, [questions, currentQuestion]);

    const startListening = () => {

    const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
        alert("Speech Recognition is not supported in this browser.");
        return;
    }

    const recognition = new SpeechRecognition();

    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    setIsListening(true);

    recognition.onstart = () => {
        console.log("Recognition Started");
    };

    recognition.onresult = async (event) => {

        const transcript = event.results[0][0].transcript;

        console.log("Transcript:", transcript);

        setAnswer(transcript);

        try {

            const token = localStorage.getItem("token");

            await axios.post(
                "http://localhost:3000/api/answer/submit",
                {
                    interviewId,
                    questionId: questions[currentQuestion]._id,
                    answer: transcript
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            console.log("Answer Submitted Successfully");

        } catch (err) {

            console.log(err);

        }

    };

    recognition.onerror = (event) => {

        console.log("Speech Error:", event.error);

    };

    recognition.onend = () => {

        console.log("Recognition Ended");

        setIsListening(false);

    };
    window.speechSynthesis.cancel();

    recognition.start();

};

    if (loading) {
        return <h2 className="text-center mt-5">Loading Questions...</h2>;
    }

    if (questions.length === 0) {
        return <h2 className="text-center mt-5">No Questions Found</h2>;
    }

    const current = questions[currentQuestion];

    return (

        <div className="container mt-5">

            <h2 className="mb-4">
                🎤 AI Interview
            </h2>

            <h5>
                Question {currentQuestion + 1} / {questions.length}
            </h5>

            <div
                className="card mt-3 p-4 shadow"
            >

                <h4>{current.question}</h4>

                <p className="mt-3">
                    <strong>Type :</strong> {current.questionType}
                </p>

                <p>
                    <strong>Topic :</strong> {current.topic}
                </p>

            </div>

            <div className="mt-4">

                <button
                    className="btn btn-success"
                    onClick={startListening}
                >
                    {isListening ? "🎙 Listening..." : "🎤 Start Answer"}
                </button>

            </div>

            <div className="card mt-4 p-3">

                <h5>Your Answer</h5>

                <textarea
                    className="form-control mt-2"
                    rows="6"
                    placeholder="Speak using the microphone or type your answer here..."
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                />

            </div>

            <div className="mt-4 d-flex gap-3">

                <button
                    className="btn btn-secondary"

                    disabled={currentQuestion === 0}

                    onClick={() => {
                        setAnswer("");
                        setCurrentQuestion(currentQuestion - 1);
                    }}

                >
                    Previous
                </button>

                {currentQuestion === questions.length - 1 ? (

                <button
                    className="btn btn-success"
                    onClick={() => {
                        alert("Interview Completed!");
                        // Later we'll navigate to the results page
                    }}
                >
                    Finish Interview
                </button>

            ) : (

                <button
                    className="btn btn-primary"
                    onClick={() => {
                        setAnswer("");
                        setCurrentQuestion(currentQuestion + 1);
                    }}
                >
                    Next Question
                </button>

            )}

            </div>

        </div>

    );

}

export default Interview;