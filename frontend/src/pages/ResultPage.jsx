import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import {
    FiArrowLeft,
    FiDownload,
    FiCheckCircle,
    FiAlertCircle,
    FiAward,
    FiClock,
    FiLayers,
    FiChevronDown,
    FiChevronUp,
    FiRefreshCw,
    FiCopy
} from "react-icons/fi";
import API from "../services/api";

function ResultPage() {
    const { interviewId } = useParams();
    const navigate = useNavigate();

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [openQuestions, setOpenQuestions] = useState({});

    useEffect(() => {
        let isMounted = true;

        async function fetchResult() {
            setLoading(true);
            setError(null);

            try {
                const response = await API.get(`/result/${interviewId}`);
                if (isMounted) {
                    setData(response.data);
                    // Open the first 2 questions by default
                    if (response.data?.breakdown?.length) {
                        setOpenQuestions({ 0: true, 1: true });
                    }
                }
            } catch (err) {
                console.error("Failed to load interview result:", err);
                if (isMounted) {
                    const msg = err.response?.data?.message || "Unable to load results for this interview.";
                    setError(msg);
                    toast.error(msg);
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        }

        fetchResult();

        return () => {
            isMounted = false;
        };
    }, [interviewId]);

    const toggleQuestion = (index) => {
        setOpenQuestions((prev) => ({
            ...prev,
            [index]: !prev[index]
        }));
    };

    const handleSavePdf = () => {
        // Expand all questions so the full evaluation appears in the PDF
        const allOpen = {};
        if (breakdown && breakdown.length) {
            breakdown.forEach((_, idx) => {
                allOpen[idx] = true;
            });
            setOpenQuestions(allOpen);
        }
        toast.success("Preparing report... Save as PDF", { icon: "📄", duration: 2500 });
        setTimeout(() => {
            window.print();
        }, 350);
    };

    const handleCopySummary = () => {
        const text = `PrepPilot AI Report - ${interview?.role || "Mock Interview"}\nScore: ${avgScore}/10\nFeedback: ${result?.overallFeedback || "Completed"}`;
        navigator.clipboard.writeText(text);
        toast.success("Evaluation summary copied to clipboard!");
    };

    if (loading) {
        return (
            <div className="container text-center py-5" style={{ minHeight: "80vh", paddingTop: "120px" }}>
                <div
                    className="spinner-border"
                    style={{ width: "3.5rem", height: "3.5rem", color: "#27b3ae" }}
                    role="status"
                ></div>
                <h3 className="mt-4 fw-bold" style={{ color: "#183B56" }}>
                    Evaluating Your Interview Performance...
                </h3>
                <p className="text-secondary" style={{ maxWidth: "460px", margin: "10px auto 0" }}>
                    PrepPilot AI is computing your total scores, strengths, areas for improvement, and ideal answers.
                </p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container text-center py-5" style={{ minHeight: "70vh", paddingTop: "80px" }}>
                <div
                    style={{
                        width: "70px",
                        height: "70px",
                        background: "#FEE2E2",
                        color: "#DC2626",
                        borderRadius: "50%",
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "30px",
                        marginBottom: "20px"
                    }}
                >
                    <FiAlertCircle />
                </div>
                <h3 className="fw-bold" style={{ color: "#183B56" }}>
                    Evaluation Notice
                </h3>
                <p className="text-secondary mb-4" style={{ maxWidth: "480px", margin: "10px auto" }}>
                    {error}
                </p>
                <div className="d-flex justify-content-center gap-3">
                    <button
                        className="btn btn-outline-secondary px-4 py-2 rounded-3"
                        onClick={() => navigate("/dashboard")}
                    >
                        Back to Dashboard
                    </button>
                    <button
                        className="btn text-white px-4 py-2 rounded-3"
                        style={{ background: "#27b3ae", border: "none" }}
                        onClick={() => navigate(`/interview/${interviewId}`)}
                    >
                        Continue Interview
                    </button>
                </div>
            </div>
        );
    }

    const { result, interview, breakdown = [] } = data || {};
    const avgScore = result?.averageScore ?? 0;

    // Rating color
    let ratingBadgeClass = "bg-success";
    if (avgScore < 5) ratingBadgeClass = "bg-danger";
    else if (avgScore < 7) ratingBadgeClass = "bg-warning text-dark";

    return (
        <div style={{ background: "#FCFEFE", minHeight: "100vh", padding: "clamp(20px, 3.5vw, 40px) 16px 80px" }}>
            <style>{`
                @media print {
                    @page {
                        margin: 12mm 15mm;
                        size: A4 portrait;
                    }
                    html, body, #root {
                        overflow: visible !important;
                        overflow-x: visible !important;
                        height: auto !important;
                        min-height: auto !important;
                        display: block !important;
                        background: #FFFFFF !important;
                        color: #0F172A !important;
                    }
                    .no-print {
                        display: none !important;
                    }
                    * {
                        -webkit-print-color-adjust: exact !important;
                        print-color-adjust: exact !important;
                    }
                    .card {
                        page-break-inside: avoid !important;
                        break-inside: avoid !important;
                        box-shadow: none !important;
                        border: 1px solid #CBD5E1 !important;
                        margin-bottom: 16px !important;
                    }
                    .print-show-always {
                        display: block !important;
                    }
                }
            `}</style>
            <div className="container" style={{ maxWidth: "940px", padding: 0 }}>
                {/* Print Header */}
                <div className="d-none d-print-block mb-4 pb-2 border-bottom">
                    <img src="/logo.png" alt="PrepPilot AI" style={{ height: "40px", objectFit: "contain" }} />
                </div>

                {/* Top Navigation */}
                <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2 no-print">
                    <div className="d-flex align-items-center gap-3">
                        <Link to="/" className="text-decoration-none d-flex align-items-center">
                            <img src="/logo.png" alt="PrepPilot AI" style={{ height: "36px", objectFit: "contain" }} />
                        </Link>
                        <button
                            className="btn btn-sm btn-outline-secondary d-flex align-items-center gap-2 px-3 py-2 rounded-pill"
                            onClick={() => navigate("/dashboard")}
                        >
                            <FiArrowLeft /> Back to Dashboard
                        </button>
                    </div>

                    <div className="d-flex gap-2 flex-wrap">
                        <button
                            className="btn btn-sm btn-light border d-flex align-items-center gap-2 px-3 py-2 rounded-pill shadow-sm"
                            onClick={handleCopySummary}
                        >
                            <FiCopy /> Copy Summary
                        </button>
                        <button
                            className="btn btn-sm btn-light border d-flex align-items-center gap-2 px-3 py-2 rounded-pill shadow-sm"
                            onClick={handleSavePdf}
                        >
                            <FiDownload /> Save as PDF
                        </button>
                        <Link to="/createinterview" className="text-decoration-none">
                            <button
                                className="btn btn-sm text-white d-flex align-items-center gap-2 px-3 py-2 rounded-pill shadow-sm"
                                style={{ background: "linear-gradient(135deg,#0F9D9A,#3CC8C3)", border: "none" }}
                            >
                                <FiRefreshCw /> Practice Another
                            </button>
                        </Link>
                    </div>
                </div>

                {/* Main Score Hero Card */}
                <div
                    className="card border-0 shadow-sm p-4 mb-4 text-white"
                    style={{
                        borderRadius: "24px",
                        background: "linear-gradient(135deg, #103B49 0%, #0F9D9A 100%)",
                    }}
                >
                    <div className="row align-items-center g-4">
                        <div className="col-md-7">
                            <span className="badge bg-white text-dark px-3 py-2 rounded-pill mb-2 fw-semibold">
                                🎓 Interview Evaluation Report
                            </span>
                            <h2 className="fw-bold mt-2 mb-1">
                                {interview?.role || "Developer"} Mock Interview
                            </h2>
                            <p className="text-white-50 mb-3" style={{ fontSize: "15px" }}>
                                {interview?.title || "AI Evaluation"} • {interview?.experienceLevel || "Fresher"} • {interview?.difficulty || "Medium"} Difficulty
                            </p>

                            <div className="d-flex gap-3 flex-wrap">
                                <div className="d-flex align-items-center gap-2 text-white">
                                    <FiClock /> <span>{interview?.duration || 15} Mins</span>
                                </div>
                                <div className="d-flex align-items-center gap-2 text-white">
                                    <FiLayers /> <span>{result?.answeredQuestions || 0} / {result?.totalQuestions || breakdown.length} Questions Answered</span>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-5 text-md-end text-center">
                            <div
                                className="d-inline-flex flex-column align-items-center justify-content-center p-4 rounded-4"
                                style={{
                                    background: "rgba(255, 255, 255, 0.15)",
                                    backdropFilter: "blur(10px)",
                                    border: "1px solid rgba(255, 255, 255, 0.25)",
                                    minWidth: "170px"
                                }}
                            >
                                <small className="text-white-50 fw-semibold text-uppercase" style={{ letterSpacing: "1px" }}>
                                    Overall Score
                                </small>
                                <h1 className="display-4 fw-bold my-1 text-white">
                                    {avgScore}
                                    <span style={{ fontSize: "20px", opacity: 0.8 }}>/10</span>
                                </h1>
                                <span className={`badge ${ratingBadgeClass} px-3 py-1 rounded-pill mt-1 fw-bold`}>
                                    {result?.overallRating || "Evaluated"}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* AI Executive Summary Card */}
                <div
                    className="card border-0 shadow-sm p-4 mb-4"
                    style={{ borderRadius: "20px", background: "#FFFFFF", borderLeft: "5px solid #27b3ae" }}
                >
                    <div className="d-flex align-items-center gap-2 mb-3">
                        <span style={{ fontSize: "22px" }}>🌟</span>
                        <h4 className="fw-bold mb-0" style={{ color: "#183B56" }}>
                            AI Performance Summary
                        </h4>
                    </div>

                    <p className="text-secondary" style={{ fontSize: "15px", lineHeight: "1.7" }}>
                        {result?.overallFeedback || "You demonstrated solid technical and conceptual aptitude. Continue practicing to refine your delivery."}
                    </p>

                    {result?.recommendation && (
                        <div className="p-3 rounded-3 mt-3" style={{ background: "#F0FDFA", border: "1px solid #CCFBF1" }}>
                            <strong className="d-block mb-1" style={{ color: "#0F766E" }}>
                                💡 Primary Recommendation:
                            </strong>
                            <p className="mb-0 text-secondary" style={{ fontSize: "14px" }}>
                                {result.recommendation}
                            </p>
                        </div>
                    )}

                    {result?.nextSteps && result.nextSteps.length > 0 && (
                        <div className="mt-4">
                            <h6 className="fw-bold text-dark mb-2">🚀 Recommended Next Steps:</h6>
                            <ul className="list-unstyled mb-0">
                                {result.nextSteps.map((step, idx) => (
                                    <li key={idx} className="d-flex align-items-start gap-2 mb-2 text-secondary" style={{ fontSize: "14px" }}>
                                        <FiCheckCircle className="text-success mt-1 flex-shrink-0" />
                                        <span>{step}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>

                {/* Strengths & Weaknesses Comparison */}
                <div className="row g-4 mb-4">
                    {/* Strengths Card */}
                    <div className="col-md-6">
                        <div
                            className="card border-0 shadow-sm p-4 h-100"
                            style={{
                                borderRadius: "20px",
                                background: "#F0FDF4",
                                border: "1px solid #DCFCE7"
                            }}
                        >
                            <div className="d-flex align-items-center gap-2 mb-3 text-success">
                                <FiCheckCircle size={22} />
                                <h5 className="fw-bold mb-0">Observed Strengths</h5>
                            </div>

                            {result?.strengths && result.strengths.length > 0 ? (
                                <div className="d-flex flex-column gap-2">
                                    {result.strengths.map((s, idx) => (
                                        <div
                                            key={idx}
                                            className="p-2.5 px-3 rounded-3 bg-white border border-success-subtle d-flex align-items-start gap-2 shadow-sm"
                                            style={{
                                                fontSize: "13.5px",
                                                lineHeight: "1.5",
                                                color: "#065F46",
                                                whiteSpace: "normal",
                                                wordBreak: "break-word"
                                            }}
                                        >
                                            <span className="text-success flex-shrink-0 fw-bold" style={{ fontSize: "14px", marginTop: "1px" }}>✓</span>
                                            <span className="flex-grow-1">{s}</span>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-secondary mb-0" style={{ fontSize: "14px" }}>
                                    Consistent communication and structured approach maintained.
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Areas for Improvement */}
                    <div className="col-md-6">
                        <div
                            className="card border-0 shadow-sm p-4 h-100"
                            style={{
                                borderRadius: "20px",
                                background: "#FFFBEB",
                                border: "1px solid #FEF3C7"
                            }}
                        >
                            <div className="d-flex align-items-center gap-2 mb-3" style={{ color: "#D97706" }}>
                                <FiAlertCircle size={22} />
                                <h5 className="fw-bold mb-0">Areas to Improve</h5>
                            </div>

                            {result?.weakness && result.weakness.length > 0 ? (
                                <div className="d-flex flex-column gap-2">
                                    {result.weakness.map((w, idx) => (
                                        <div
                                            key={idx}
                                            className="p-2.5 px-3 rounded-3 bg-white border border-warning-subtle d-flex align-items-start gap-2 shadow-sm"
                                            style={{
                                                fontSize: "13.5px",
                                                lineHeight: "1.5",
                                                color: "#78350F",
                                                whiteSpace: "normal",
                                                wordBreak: "break-word"
                                            }}
                                        >
                                            <span className="flex-shrink-0" style={{ fontSize: "14px", marginTop: "1px" }}>🎯</span>
                                            <span className="flex-grow-1">{w}</span>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-secondary mb-0" style={{ fontSize: "14px" }}>
                                    Keep practicing deeper technical nuances and real-world system design scenarios.
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Question-by-Question Deep Dive Breakdown */}
                <div className="mb-4">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h4 className="fw-bold mb-0" style={{ color: "#183B56" }}>
                            Detailed Question Breakdown ({breakdown.length})
                        </h4>
                        <small className="text-secondary">
                            Review your answers, scores, and ideal answers
                        </small>
                    </div>

                    {breakdown.map((item, index) => {
                        const isOpen = Boolean(openQuestions[index]);
                        const qScore = item.score ?? 0;

                        return (
                            <div
                                key={index}
                                className="card border-0 shadow-sm mb-3 overflow-hidden"
                                style={{ borderRadius: "18px", background: "#FFFFFF" }}
                            >
                                {/* Question Accordion Header */}
                                <div
                                    className="p-3 p-sm-4 d-flex justify-content-between align-items-center"
                                    style={{ cursor: "pointer", background: isOpen ? "#F8FAFC" : "#FFFFFF" }}
                                    onClick={() => toggleQuestion(index)}
                                >
                                    <div className="me-2 me-sm-3" style={{ minWidth: 0 }}>
                                        <div className="d-flex align-items-center gap-1.5 gap-sm-2 mb-2 flex-wrap">
                                            <span className="badge bg-light text-dark border px-2 py-1" style={{ fontSize: "11px" }}>
                                                Question {index + 1}
                                            </span>
                                            <span className="badge bg-light text-secondary border px-2 py-1" style={{ fontSize: "11px" }}>
                                                {item.questionType || "General"}
                                            </span>
                                            <span className="badge bg-light text-secondary border px-2 py-1" style={{ fontSize: "11px" }}>
                                                {item.topic || "Core"}
                                            </span>
                                        </div>
                                        <h5 className="fw-bold mb-0" style={{ color: "#1E293B", fontSize: "clamp(15px, 2.5vw, 17px)", lineHeight: "1.4" }}>
                                            {item.question}
                                        </h5>
                                    </div>

                                    <div className="d-flex align-items-center gap-2 gap-sm-3 flex-shrink-0">
                                        <div className="text-end">
                                            <span className="fw-bold" style={{ fontSize: "clamp(15px, 2vw, 18px)", color: qScore >= 7 ? "#10B981" : qScore >= 5 ? "#F59E0B" : "#EF4444" }}>
                                                {item.isAnswered ? `${qScore} / 10` : "Skipped"}
                                            </span>
                                        </div>
                                        <button className="btn btn-sm btn-light border rounded-circle p-1.5 p-sm-2" style={{ width: "34px", height: "34px" }}>
                                            {isOpen ? <FiChevronUp /> : <FiChevronDown />}
                                        </button>
                                    </div>
                                </div>

                                {/* Accordion Content */}
                                <div className={`card-body p-4 pt-3 border-top ${isOpen ? "" : "d-none print-show-always"}`}>
                                    {/* Candidate's Answer */}
                                        <div className="mb-3">
                                            <strong className="d-block text-secondary mb-1" style={{ fontSize: "13px" }}>
                                                YOUR ANSWER:
                                            </strong>
                                            <div
                                                className="p-3 rounded-3"
                                                style={{
                                                    background: item.answer ? "#F8FAFC" : "#FFF1F2",
                                                    border: "1px solid #E2E8F0",
                                                    fontSize: "14px",
                                                    lineHeight: "1.6"
                                                }}
                                            >
                                                {item.answer ? (
                                                    item.answer
                                                ) : (
                                                    <span className="text-muted fst-italic">
                                                        No answer provided during this interview session.
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        {/* AI Evaluation & Feedback */}
                                        {item.feedback && (
                                            <div className="mb-3">
                                                <strong className="d-block text-secondary mb-1" style={{ fontSize: "13px" }}>
                                                    AI EVALUATION & FEEDBACK:
                                                </strong>
                                                <div
                                                    className="p-3 rounded-3"
                                                    style={{ background: "#F0FDFA", border: "1px solid #CCFBF1", fontSize: "14px" }}
                                                >
                                                    {item.feedback}
                                                </div>
                                            </div>
                                        )}

                                        {/* Strengths & Weaknesses for this question */}
                                        <div className="row g-2 mb-3">
                                            {item.strengths && item.strengths.length > 0 && (
                                                <div className="col-md-6">
                                                    <small className="text-success fw-bold d-block mb-1">
                                                        ✓ What went well:
                                                    </small>
                                                    <ul className="mb-0 ps-3 text-secondary" style={{ fontSize: "13px" }}>
                                                        {item.strengths.map((str, sIdx) => (
                                                            <li key={sIdx}>{str}</li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}

                                            {item.weakness && item.weakness.length > 0 && (
                                                <div className="col-md-6">
                                                    <small className="text-danger fw-bold d-block mb-1">
                                                        ⚠ Missed or to improve:
                                                    </small>
                                                    <ul className="mb-0 ps-3 text-secondary" style={{ fontSize: "13px" }}>
                                                        {item.weakness.map((w, wIdx) => (
                                                            <li key={wIdx}>{w}</li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}
                                        </div>

                                        {/* Ideal / Model Answer */}
                                        {item.accurateAnswer && (
                                            <div className="mt-3">
                                                <strong className="d-block text-secondary mb-1" style={{ fontSize: "13px" }}>
                                                    🎯 RECOMMENDED IDEAL ANSWER:
                                                </strong>
                                                <div
                                                    className="p-3 rounded-3"
                                                    style={{
                                                        background: "#EFF6FF",
                                                        border: "1px solid #DBEAFE",
                                                        fontSize: "14px",
                                                        lineHeight: "1.6",
                                                        color: "#1E3A8A"
                                                    }}
                                                >
                                                    {item.accurateAnswer}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                            </div>
                        );
                    })}
                </div>

                {/* Bottom Call to Action */}
                <div
                    className="card border-0 p-4 p-sm-5 text-center mt-5 no-print"
                    style={{
                        borderRadius: "24px",
                        background: "linear-gradient(135deg,#EEF8F8 0%,#F9FEFE 100%)",
                        border: "1px solid #E6F3F3"
                    }}
                >
                    <h3 className="fw-bold" style={{ color: "#183B56" }}>
                        Ready to Take Another Step?
                    </h3>
                    <p className="text-secondary" style={{ maxWidth: "480px", margin: "10px auto 25px" }}>
                        Practice another role or increase difficulty to boost your interview confidence and fluency.
                    </p>
                    <div className="d-flex justify-content-center gap-3 flex-wrap">
                        <Link to="/createinterview">
                            <button
                                className="btn px-4 py-3 fw-semibold text-white shadow-sm"
                                style={{ background: "linear-gradient(135deg,#0F9D9A,#3CC8C3)", border: "none", borderRadius: "12px" }}
                            >
                                Start Another AI Mock Interview
                            </button>
                        </Link>
                        <button
                            className="btn btn-outline-secondary px-4 py-3 fw-semibold rounded-3"
                            onClick={() => navigate("/dashboard")}
                        >
                            Return to Dashboard
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ResultPage;

