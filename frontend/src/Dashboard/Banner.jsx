import React from "react";
import { FiPlus } from "react-icons/fi";
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
            className="p-3 p-sm-4 p-md-5 rounded-4 position-relative overflow-hidden shadow-sm"
            style={{
                background: "linear-gradient(135deg, #0A2540 0%, #0F3A4C 60%, #0F9D9A 100%)",
                color: "#FFFFFF",
                borderRadius: "22px"
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

            <div className="row align-items-center g-3 g-md-4 position-relative" style={{ zIndex: 1 }}>
                <div className="col-lg-8 col-md-7">
                    <span
                        className="badge px-3 py-1 rounded-pill fw-semibold mb-2 mb-sm-3 d-inline-flex align-items-center gap-1"
                        style={{
                            background: "rgba(255, 255, 255, 0.15)",
                            backdropFilter: "blur(8px)",
                            border: "1px solid rgba(255, 255, 255, 0.25)",
                            color: "#FFFFFF",
                            fontSize: "11px"
                        }}
                    >
                        <i className="bi bi-stars text-warning"></i> GEMINI AI INTERVIEW COACH
                    </span>

                    <h2
                        style={{
                            fontWeight: "800",
                            lineHeight: "1.25",
                            fontSize: "clamp(1.35rem, 3.2vw, 2.1rem)",
                            letterSpacing: "-0.02em"
                        }}
                        className="mb-2"
                    >
                        Practice Without Pressure.<br className="d-none d-sm-inline" /> Land Your Dream Offer.
                    </h2>

                    <p
                        className="text-white-50 mt-1 mb-3 mb-sm-4"
                        style={{ maxWidth: "520px", fontSize: "13px", lineHeight: "1.6" }}
                    >
                        Conduct tailored mock interviews with speech recognition, real-time timer,
                        instant scoring, detailed weaknesses, and ideal model answers.
                    </p>

                    <div className="d-flex align-items-center gap-2 gap-sm-3 flex-wrap">
                        <Link to="/createinterview" className="text-decoration-none w-100 w-sm-auto">
                            <button
                                className="btn w-100 px-4 py-2 py-sm-3 fw-bold text-dark shadow-sm d-inline-flex align-items-center justify-content-center gap-2"
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
                    </div>

                    {/* Quick Start Role Pills (Visible & Scrollable on Mobile) */}
                    <div className="d-flex align-items-center gap-2 mt-3 pt-1 flex-nowrap overflow-x-auto pb-1" style={{ WebkitOverflowScrolling: "touch" }}>
                        <small className="text-white-50 text-nowrap" style={{ fontSize: "12px" }}>
                            Quick roles:
                        </small>
                        {quickRoles.map((role) => (
                            <Link
                                key={role}
                                to="/createinterview"
                                className="badge text-white text-decoration-none px-2.5 py-1.5 rounded-pill text-nowrap flex-shrink-0"
                                style={{
                                    background: "rgba(255, 255, 255, 0.12)",
                                    border: "1px solid rgba(255, 255, 255, 0.2)",
                                    fontSize: "11px",
                                    fontWeight: "500"
                                }}
                            >
                                {role}
                            </Link>
                        ))}
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
                                maxHeight: "160px",
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
