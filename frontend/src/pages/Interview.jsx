import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getQuestions } from "../services/QuestionServices";
import axios from "axios";

function Interview() {
    const { interviewId } = useParams();
    const navigate = useNavigate();

    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [loading, setLoading] = useState(true);
    const [answer, setAnswer] = useState("");
    const [answersMap, setAnswersMap] = useState({});
    const [submittedMap, setSubmittedMap] = useState({});
    const [isListening, setIsListening] = useState(false);
    const [isEvaluating, setIsEvaluating] = useState(false);
    const [statusMessage, setStatusMessage] = useState(null);

    const recognitionRef = useRef(null);

    // Fetch questions on mount
    useEffect(() => {
        async function fetchQuestions() {
            try {
                const data = await getQuestions(interviewId);
                setQuestions(data || []);
            } catch (err) {
                console.error("Failed to fetch questions:", err);
            } finally {
                setLoading(false);
            }
        }

        fetchQuestions();
    }, [interviewId]);

    // 🔊 Read question aloud whenever current question changes
    useEffect(() => {
        if (questions.length === 0) return;

        speakQuestion(questions[currentQuestion].question);

        return () => {
            window.speechSynthesis.cancel();
        };
    }, [questions, currentQuestion]);

    // Cleanup speech recognition and synthesis on unmount
    useEffect(() => {
        return () => {
            window.speechSynthesis.cancel();
            if (recognitionRef.current) {
                recognitionRef.current.stop();
            }
        };
    }, []);

    const speakQuestion = (text) => {
        if (!text) return;
        window.speechSynthesis.cancel();
        const speech = new SpeechSynthesisUtterance(text);
        speech.rate = 1;
        speech.pitch = 1;
        speech.volume = 1;
        window.speechSynthesis.speak(speech);
    };

    // Toggle speech-to-text recording
    const toggleListening = () => {
        if (isListening) {
            if (recognitionRef.current) {
                recognitionRef.current.stop();
            }
            setIsListening(false);
            return;
        }

        const SpeechRecognition =
            window.SpeechRecognition || window.webkitSpeechRecognition;

        if (!SpeechRecognition) {
            alert("Speech Recognition is not supported in this browser. Please use Chrome or Edge, or type your answer.");
            return;
        }

        try {
            window.speechSynthesis.cancel();

            const recognition = new SpeechRecognition();
            recognition.lang = "en-US";
            recognition.continuous = true;
            recognition.interimResults = false;

            recognition.onstart = () => {
                setIsListening(true);
            };

            recognition.onresult = (event) => {
                let transcript = "";
                for (let i = event.resultIndex; i < event.results.length; i++) {
                    transcript += event.results[i][0].transcript;
                }

                if (transcript.trim()) {
                    setAnswer((prev) => {
                        const updated = prev ? `${prev} ${transcript.trim()}` : transcript.trim();
                        setAnswersMap((map) => ({
                            ...map,
                            [currentQuestion]: updated,
                        }));
                        return updated;
                    });
                }
            };

            recognition.onerror = (event) => {
                console.error("Speech Recognition Error:", event.error);
                setIsListening(false);
            };

            recognition.onend = () => {
                setIsListening(false);
            };

            recognitionRef.current = recognition;
            recognition.start();
        } catch (err) {
            console.error("Speech recognition start failed:", err);
            setIsListening(false);
        }
    };

    const handleAnswerChange = (e) => {
        const text = e.target.value;
        setAnswer(text);
        setAnswersMap((prev) => ({
            ...prev,
            [currentQuestion]: text,
        }));
    };

    // Dedicated Answer Submission Handler
    const handleSubmitAnswer = async () => {
        if (!answer || !answer.trim()) {
            setStatusMessage({
                type: "warning",
                text: "Please provide an answer (by typing or speaking) before submitting.",
            });
            return;
        }

        if (isListening && recognitionRef.current) {
            recognitionRef.current.stop();
            setIsListening(false);
        }

        setIsEvaluating(true);
        setStatusMessage(null);

        try {
            const token = localStorage.getItem("token");
            const currentQ = questions[currentQuestion];

            const response = await axios.post(
                "http://localhost:3000/api/answer/submit",
                {
                    interviewId,
                    questionId: currentQ._id,
                    answer: answer.trim(),
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const evaluatedAnswer = response.data?.answer;

            setSubmittedMap((prev) => ({
                ...prev,
                [currentQuestion]: evaluatedAnswer || true,
            }));

            setStatusMessage({
                type: "success",
                text: evaluatedAnswer?.score !== undefined
                    ? `Answer Evaluated! Score: ${evaluatedAnswer.score}/10`
                    : "Answer Submitted and Evaluated Successfully!",
            });
        } catch (err) {
            console.error("Answer submission error:", err);
            setStatusMessage({
                type: "danger",
                text: err.response?.data?.message || "Failed to submit answer. Please try again.",
            });
        } finally {
            setIsEvaluating(false);
        }
    };

    const goToPrevious = () => {
        if (currentQuestion > 0) {
            window.speechSynthesis.cancel();
            if (isListening && recognitionRef.current) {
                recognitionRef.current.stop();
                setIsListening(false);
            }
            const prevIndex = currentQuestion - 1;
            setCurrentQuestion(prevIndex);
            setAnswer(answersMap[prevIndex] || "");
            setStatusMessage(null);
        }
    };

    const goToNext = () => {
        if (currentQuestion < questions.length - 1) {
            window.speechSynthesis.cancel();
            if (isListening && recognitionRef.current) {
                recognitionRef.current.stop();
                setIsListening(false);
            }
            const nextIndex = currentQuestion + 1;
            setCurrentQuestion(nextIndex);
            setAnswer(answersMap[nextIndex] || "");
            setStatusMessage(null);
        }
    };

    if (loading) {
        return (
            <div className="container text-center mt-5 py-5">
                <div className="spinner-border text-info" role="status"></div>
                <h4 className="mt-3 text-secondary">Loading Interview Questions...</h4>
            </div>
        );
    }

    if (questions.length === 0) {
        return (
            <div className="container text-center mt-5 py-5">
                <h3 className="text-secondary">No Questions Found</h3>
                <button className="btn btn-primary mt-3" onClick={() => navigate("/dashboard")}>
                    Back to Dashboard
                </button>
            </div>
        );
    }

    const current = questions[currentQuestion];
    const isCurrentSubmitted = Boolean(submittedMap[currentQuestion]);

    return (
        <div className="container mt-4 mb-5" style={{ maxWidth: "860px" }}>
            {/* Header */}
            <div className="d-flex justify-content-between align-items-center mb-3">
                <div>
                    <h3 className="fw-bold mb-1" style={{ color: "#183B56" }}>
                        🎤 AI Mock Interview
                    </h3>
                    <span className="text-secondary">
                        Question {currentQuestion + 1} of {questions.length}
                    </span>
                </div>
                <div>
                    {isCurrentSubmitted && (
                        <span className="badge bg-success-subtle text-success border border-success px-3 py-2 rounded-pill">
                            ✓ Answer Evaluated
                        </span>
                    )}
                </div>
            </div>

            {/* Question Card */}
            <div
                className="card border-0 shadow-sm p-4 mb-4"
                style={{
                    borderRadius: "18px",
                    background: "#FFFFFF",
                    borderLeft: "5px solid #27b3ae",
                }}
            >
                <div className="d-flex justify-content-between align-items-start gap-3">
                    <h4 className="fw-bold mb-3" style={{ color: "#1E293B", lineHeight: "1.4" }}>
                        {current.question}
                    </h4>
                    <button
                        className="btn btn-sm btn-outline-secondary d-flex align-items-center gap-1 text-nowrap"
                        onClick={() => speakQuestion(current.question)}
                        title="Replay Audio"
                    >
                        <i className="bi bi-volume-up-fill"></i> Replay Audio
                    </button>
                </div>

                <div className="d-flex gap-2 flex-wrap mt-2">
                    <span className="badge bg-light text-dark border px-3 py-2">
                        <strong>Type:</strong> {current.questionType || "General"}
                    </span>
                    <span className="badge bg-light text-dark border px-3 py-2">
                        <strong>Topic:</strong> {current.topic || "Core"}
                    </span>
                </div>
            </div>

            {/* Answer Section */}
            <div className="card border-0 shadow-sm p-4" style={{ borderRadius: "18px" }}>
                <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3">
                    <h5 className="fw-bold mb-0">Your Answer</h5>

                    {/* Speech to Text Toggle Button */}
                    <div className="d-flex align-items-center gap-2">
                        <button
                            type="button"
                            className={`btn btn-sm ${isListening ? "btn-danger" : "btn-outline-primary"} px-3 py-2 rounded-pill d-flex align-items-center gap-2`}
                            onClick={toggleListening}
                            disabled={isEvaluating}
                        >
                            <i className={`bi ${isListening ? "bi-mic-mute-fill" : "bi-mic-fill"}`}></i>
                            {isListening ? "Stop Recording" : "Speak Answer"}
                        </button>
                        {isListening && (
                            <span className="badge bg-danger text-white px-2 py-1 rounded-pill animate-pulse">
                                ● Listening...
                            </span>
                        )}
                    </div>
                </div>

                <textarea
                    className="form-control"
                    rows="7"
                    placeholder="Type your answer here or click 'Speak Answer' to speak using your microphone..."
                    value={answer}
                    onChange={handleAnswerChange}
                    disabled={isEvaluating}
                    style={{
                        borderRadius: "12px",
                        fontSize: "15px",
                        lineHeight: "1.6",
                    }}
                />

                <small className="text-secondary mt-2">
                    💡 Tip: You can speak, pause, edit your text, and click <strong>Submit Answer</strong> when you're ready for AI evaluation.
                </small>

                {/* Status / Alert Banner */}
                {statusMessage && (
                    <div className={`alert alert-${statusMessage.type} mt-3 mb-0 d-flex align-items-center justify-content-between`} role="alert">
                        <div>{statusMessage.text}</div>
                        <button
                            type="button"
                            className="btn-close ms-2"
                            onClick={() => setStatusMessage(null)}
                        ></button>
                    </div>
                )}

                {/* Submit Answer Button */}
                <div className="mt-3 d-flex justify-content-end">
                    <button
                        type="button"
                        className="btn px-4 py-2 fw-semibold text-white d-flex align-items-center gap-2"
                        style={{
                            background: isEvaluating
                                ? "#80CBC4"
                                : "linear-gradient(135deg, #0F9D9A, #3CC8C3)",
                            border: "none",
                            borderRadius: "10px",
                            boxShadow: "0 4px 14px rgba(15,157,154,0.25)",
                        }}
                        onClick={handleSubmitAnswer}
                        disabled={isEvaluating || !answer.trim()}
                    >
                        {isEvaluating ? (
                            <>
                                <span
                                    className="spinner-border spinner-border-sm"
                                    role="status"
                                    aria-hidden="true"
                                ></span>
                                Evaluating Answer...
                            </>
                        ) : isCurrentSubmitted ? (
                            <>
                                <i className="bi bi-arrow-repeat"></i> Re-Submit Answer
                            </>
                        ) : (
                            <>
                                <i className="bi bi-send-fill"></i> Submit Answer
                            </>
                        )}
                    </button>
                </div>
            </div>

            {/* Navigation Buttons */}
            <div className="mt-4 d-flex justify-content-between align-items-center">
                <button
                    className="btn btn-outline-secondary px-4 py-2 rounded-3"
                    disabled={currentQuestion === 0 || isEvaluating}
                    onClick={goToPrevious}
                >
                    <i className="bi bi-arrow-left me-1"></i> Previous
                </button>

                {currentQuestion === questions.length - 1 ? (
                    <button
                        className="btn btn-success px-4 py-2 rounded-3 fw-semibold"
                        disabled={isEvaluating}
                        onClick={() => {
                            window.speechSynthesis.cancel();
                            alert("Interview Completed! Great job practicing!");
                        }}
                    >
                        <i className="bi bi-check2-circle me-1"></i> Finish Interview
                    </button>
                ) : (
                    <button
                        className="btn btn-primary px-4 py-2 rounded-3 fw-semibold"
                        disabled={isEvaluating}
                        onClick={goToNext}
                        style={{
                            background: "#0F9D9A",
                            borderColor: "#0F9D9A",
                        }}
                    >
                        Next Question <i className="bi bi-arrow-right ms-1"></i>
                    </button>
                )}
            </div>
        </div>
    );
}

export default Interview;