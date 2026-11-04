import React from 'react';
import Footer from '../footer';
import { Link } from 'react-router-dom';
import { FiBookOpen, FiCheckSquare, FiAward, FiMessageSquare } from 'react-icons/fi';

function Resoources() {
    const resources = [
        {
            icon: <FiCheckSquare size={24} />,
            badge: "FRAMEWORK",
            title: "The STAR Method for Behavioral Interviews",
            desc: "How to structure answers to 'Tell me about a time when...' using Situation, Task, Action, and Result for maximum impact.",
            tips: ["Focus 70% of time on Actions you personally took", "Quantify Results with percentages, time saved, or revenue", "Keep the story under 2 minutes"]
        },
        {
            icon: <FiBookOpen size={24} />,
            badge: "TECHNICAL",
            title: "Frontend & Full-Stack Core Concepts Cheatsheet",
            desc: "Key topics frequently tested across technical interview loops from Fresher to Senior levels.",
            tips: ["Closures, Event Loop, and Asynchronous JS", "React Reconciliation, Virtual DOM, and Hook dependencies", "RESTful API design, HTTP status codes, and JWT auth flow"]
        },
        {
            icon: <FiAward size={24} />,
            badge: "STRATEGY",
            title: "How to Answer 'Tell Me About Yourself'",
            desc: "The 3-part formula to open any interview strongly and set the tone for the entire session.",
            tips: ["Present: Your current role and key accomplishments", "Past: The journey and notable projects that brought you here", "Future: Why this specific role and team excites you"]
        },
        {
            icon: <FiMessageSquare size={24} />,
            badge: "COMMUNICATION",
            title: "Thinking Out Loud During Live Interviews",
            desc: "Interviewers care more about your problem-solving process than memorized syntax. Master verbal thinking.",
            tips: ["Clarify requirements and edge cases first", "State your initial brute-force idea before optimizing", "Communicate trade-offs openly with the interviewer"]
        }
    ];

    return (
        <div style={{ background: "#F8FCFB", minHeight: "calc(100vh - 66px)" }}>
            {/* Header */}
            <div className="container py-5 text-center">
                <span className="badge px-3 py-2 rounded-pill fw-semibold mb-3" style={{ background: "#E8FAF8", color: "#0F9D9A", border: "1px solid #C4F1ED" }}>
                    CANDIDATE RESOURCE HUB
                </span>
                <h1 className="fw-bold mb-3 display-5" style={{ color: "#0F172A" }}>
                    Proven Strategies to Ace Your Interviews
                </h1>
                <p className="text-secondary mb-5" style={{ maxWidth: "600px", margin: "0 auto", fontSize: "17px" }}>
                    Curated guides, frameworks, and actionable tips to help you articulate technical depth and communicate with executive presence.
                </p>

                {/* Resource Cards */}
                <div className="row g-4 justify-content-center text-start">
                    {resources.map((item, idx) => (
                        <div className="col-lg-6" key={idx}>
                            <div
                                className="card h-100 p-4 border-0 shadow-sm"
                                style={{ borderRadius: "20px", background: "#FFFFFF", border: "1px solid #EAF3F3" }}
                            >
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                    <div
                                        style={{
                                            width: "48px",
                                            height: "48px",
                                            borderRadius: "12px",
                                            background: "#E6F8F7",
                                            color: "#0F9D9A",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center"
                                        }}
                                    >
                                        {item.icon}
                                    </div>
                                    <span className="badge bg-light text-secondary border px-3 py-1 rounded-pill" style={{ fontSize: "11px", letterSpacing: "0.5px" }}>
                                        {item.badge}
                                    </span>
                                </div>

                                <h4 className="fw-bold mb-2" style={{ color: "#0F172A", fontSize: "18px" }}>
                                    {item.title}
                                </h4>
                                <p className="text-secondary mb-3" style={{ fontSize: "14px", lineHeight: "1.6" }}>
                                    {item.desc}
                                </p>

                                <div className="p-3 rounded-3 mt-auto" style={{ background: "#F8FAFC", border: "1px solid #E2E8F0" }}>
                                    <small className="fw-bold text-dark d-block mb-1">Key Takeaways:</small>
                                    <ul className="list-unstyled mb-0" style={{ fontSize: "13px" }}>
                                        {item.tips.map((tip, tIdx) => (
                                            <li key={tIdx} className="d-flex align-items-start gap-2 mb-1 text-secondary">
                                                <span className="text-primary fw-bold">•</span>
                                                <span>{tip}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* CTA Callout */}
                <div
                    className="p-5 mt-5 rounded-4 text-center shadow-sm"
                    style={{
                        background: "linear-gradient(135deg, #103B49 0%, #0F9D9A 100%)",
                        color: "#FFFFFF",
                        borderRadius: "24px",
                        maxWidth: "840px",
                        margin: "3rem auto 0"
                    }}
                >
                    <h3 className="fw-bold mb-2">Put These Frameworks into Practice</h3>
                    <p className="text-white-50 mb-4" style={{ maxWidth: "500px", margin: "0 auto 1.5rem" }}>
                        Reading theory is only 20% of the battle. Experience a real AI interview session right now.
                    </p>
                    <Link to="/createinterview">
                        <button
                            className="btn btn-lg fw-bold px-4 py-3"
                            style={{ background: "#FFFFFF", color: "#0F9D9A", border: "none", borderRadius: "12px", fontSize: "16px" }}
                        >
                            Start a Mock Session Now →
                        </button>
                    </Link>
                </div>
            </div>

            <Footer />
        </div>
    );
}

export default Resoources;
