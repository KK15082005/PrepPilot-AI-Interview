import React from "react";
import { FiPlus, FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";

function Banner() {
    const quickRoles = [
        "Frontend Engineer",
        "Full Stack Developer",
        "Node.js Backend",
        "Behavioral / HR"
    ];

    return (
        <div
            className="p-4 p-md-5 rounded-4 position-relative overflow-hidden shadow-sm"
            style={{
                background: "linear-gradient(135deg, #0A2540 0%, #0F3A4C 60%, #0F9D9A 100%)",
                color: "#FFFFFF",
                borderRadius: "24px"
            }}
        >
            {/* Subtle background glow effect */}
            <div
                style={{
                    position: "absolute",
                    top: "-50px",
                    right: "-50px",
                    width: "300px",
                    height: "300px",
                    background: "radial-gradient(circle, rgba(60, 200, 195, 0.25) 0%, rgba(15, 157, 154, 0) 70%)",
                    borderRadius: "50%",
                    pointerEvents: "none"
                }}
            />

            <div className="row align-items-center g-4 position-relative" style={{ zIndex: 1 }}>
                <div className="col-lg-8 col-md-7">
                    <span
                        className="badge px-3 py-1 rounded-pill fw-semibold mb-3 d-inline-flex align-items-center gap-1"
                        style={{
                            background: "rgba(255, 255, 255, 0.15)",
                            backdropFilter: "blur(8px)",
                            border: "1px solid rgba(255, 255, 255, 0.25)",
                            color: "#FFFFFF",
                            fontSize: "12px"
                        }}
                    >
                        <i className="bi bi-stars text-warning"></i> GEMINI AI INTERVIEW COACH
                    </span>

                    <h2
                        style={{
                            fontWeight: "800",
                            lineHeight: "1.25",
                            fontSize: "clamp(1.5rem, 3.2vw, 2.2rem)",
                            letterSpacing: "-0.02em"
                        }}
                        className="mb-2"
                    >
                        Practice Without Pressure.<br className="d-none d-sm-inline" /> Land Your Dream Offer.
                    </h2>

                    <p
                        className="text-white-50 mt-2 mb-4"
                        style={{ maxWidth: "520px", fontSize: "14px", lineHeight: "1.6" }}
                    >
                        Conduct tailored technical and behavioral mock sessions with live audio speech recognition,
                        instant scoring, detailed weaknesses, and AI model answers.
                    </p>

                    <div className="d-flex align-items-center gap-3 flex-wrap">
                        <Link to="/createinterview" className="text-decoration-none">
                            <button
                                className="btn px-4 py-3 fw-bold text-dark shadow-sm d-inline-flex align-items-center gap-2"
                                style={{
                                    background: "#FFFFFF",
                                    borderRadius: "12px",
                                    fontSize: "14px",
                                    border: "none",
                                    transition: "all 0.2s ease"
                                }}
                            >
                                <FiPlus size={18} style={{ color: "#0F9D9A" }} /> Create Custom Interview
                            </button>
                        </Link>

                        <div className="d-none d-sm-flex align-items-center gap-2 text-white-50" style={{ fontSize: "13px" }}>
                            <span>Quick start:</span>
                            {quickRoles.slice(0, 2).map((role) => (
                                <Link
                                    key={role}
                                    to="/createinterview"
                                    className="badge text-white text-decoration-none px-2 py-1 rounded-pill"
                                    style={{
                                        background: "rgba(255, 255, 255, 0.12)",
                                        border: "1px solid rgba(255, 255, 255, 0.2)"
                                    }}
                                >
                                    {role}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="col-lg-4 col-md-5 text-center d-none d-md-block">
                    <div
                        className="p-3 rounded-4 d-inline-block"
                        style={{
                            background: "rgba(255, 255, 255, 0.08)",
                            backdropFilter: "blur(12px)",
                            border: "1px solid rgba(255, 255, 255, 0.15)",
                            boxShadow: "0 20px 40px rgba(0, 0, 0, 0.2)"
                        }}
                    >
                        <img
                            src="/target.jpg"
                            alt="Interview Target Goal"
                            className="img-fluid rounded-3"
                            style={{
                                maxHeight: "170px",
                                objectFit: "cover"
                            }}
                        />
                        <div className="mt-2 text-center">
                            <small className="text-white-50 fw-semibold" style={{ fontSize: "11px", letterSpacing: "0.5px" }}>
                                🎯 GOAL: 8.5+ AVERAGE SCORE
                            </small>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Banner;
