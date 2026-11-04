import React from "react";
import { FiPlus, FiArrowRight, FiMic, FiCheckCircle, FiCpu, FiTarget } from "react-icons/fi";
import { Link } from "react-router-dom";

function Banner() {
    const quickRoles = [
        "Frontend Engineer",
        "Full Stack Developer",
        "Node.js Backend",
        "Behavioral / HR"
    ];

    return (
        <section
            className="position-relative overflow-hidden mb-4"
            style={{
                background: "linear-gradient(135deg, #072224 0%, #0B383C 52%, #0E5E63 100%)",
                borderRadius: "16px",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                boxShadow: "0 10px 28px -6px rgba(7, 34, 36, 0.25)",
                padding: "clamp(20px, 2.4vw, 28px) clamp(20px, 2.8vw, 32px)"
            }}
            aria-label="Interview Readiness Hero"
        >
            {/* Subtle Ambient Radial Lighting */}
            <div
                style={{
                    position: "absolute",
                    top: "-60px",
                    right: "-60px",
                    width: "300px",
                    height: "300px",
                    background: "radial-gradient(circle, rgba(45, 212, 191, 0.18) 0%, rgba(14, 94, 99, 0) 70%)",
                    borderRadius: "50%",
                    pointerEvents: "none"
                }}
            />

            <div className="row align-items-center g-3 g-lg-4 position-relative" style={{ zIndex: 1 }}>
                {/* Left Column: Heading, Value Prop, CTA & Quick Roles */}
                <div className="col-lg-7 col-md-7">
                    <div className="d-inline-flex align-items-center gap-1.5 px-3 py-1 rounded-pill mb-2"
                        style={{
                            background: "rgba(20, 184, 166, 0.16)",
                            border: "1px solid rgba(45, 212, 191, 0.28)",
                            color: "#2DD4BF",
                            fontSize: "11px",
                            fontWeight: "600",
                            letterSpacing: "0.3px"
                        }}
                    >
                        <i className="bi bi-stars"></i> Your AI INTERVIEW COACH
                    </div>

                    <h2
                        style={{
                            fontWeight: "700",
                            lineHeight: "1.24",
                            fontSize: "clamp(1.3rem, 2.3vw, 1.75rem)",
                            letterSpacing: "-0.02em",
                            color: "#FFFFFF",
                            margin: "0 0 6px 0"
                        }}
                    >
                        Practice Without Pressure.{" "}
                        <span style={{ color: "#5EEAD4" }}>Land Your Dream Offer.</span>
                    </h2>

                    <p
                        style={{
                            color: "#CBD5E1",
                            fontSize: "13px",
                            lineHeight: "1.55",
                            maxWidth: "490px",
                            margin: "0 0 18px 0"
                        }}
                    >
                        Simulate realistic mock rounds with live speech recognition, real-time timer,
                        rubric-based AI scoring, pinpointed weaknesses, and model answers.
                    </p>

                    {/* Actions Row */}
                    <div className="d-flex align-items-center gap-2 gap-sm-3 flex-wrap">
                        <Link to="/createinterview" className="text-decoration-none">
                            <button
                                type="button"
                                className="btn fw-semibold shadow-sm d-inline-flex align-items-center gap-2"
                                style={{
                                    background: "#FFFFFF",
                                    color: "#0F766E",
                                    borderRadius: "10px",
                                    fontSize: "13.5px",
                                    padding: "8px 18px",
                                    border: "none",
                                    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.12)",
                                    transition: "all 0.18s ease"
                                }}
                            >
                                <FiPlus size={16} style={{ color: "#0F9D9A" }} />
                                <span>Create Custom Interview</span>
                                <FiArrowRight size={14} />
                            </button>
                        </Link>
                    </div>

                    {/* Quick Preset Roles */}
                    <div className="d-flex align-items-center gap-1.5 mt-3 pt-2 flex-wrap">
                        {/* <span style={{ color: "#94A3B8", fontSize: "11.5px", fontWeight: "500" }}>
                            Quick roles:
                        </span> */}
                        {quickRoles.map((role) => (
                            <Link
                                key={role}
                                to={`/createinterview?role=${encodeURIComponent(role)}`}
                                className="badge text-white text-decoration-none rounded-pill"
                                style={{
                                    background: "rgba(255, 255, 255, 0.1)",
                                    border: "1px solid rgba(255, 255, 255, 0.16)",
                                    fontSize: "11px",
                                    fontWeight: "500",
                                    padding: "5px 10px",
                                    transition: "all 0.15s ease"

                                }}
                            >
                                + {role}

                            </Link>
                        ))}
                    </div>
                </div>

                {/* Right Column: Integrated AI Coach Status & Feature Panel */}
                <div className="col-lg-5 col-md-5 d-none d-md-block">
                    <div
                        className="rounded-3 p-3 text-start position-relative"
                        style={{
                            background: "rgba(0, 0, 0, 0.22)",
                            border: "1px solid rgba(255, 255, 255, 0.1)",
                            backdropFilter: "blur(10px)",
                            borderRadius: "14px"
                        }}
                    >
                        {/* Header Telemetry Row */}
                        <div className="d-flex align-items-center justify-content-between pb-2 mb-2 border-bottom border-white-10">
                            <div className="d-flex align-items-center gap-2">
                                <span
                                    className="d-inline-block rounded-circle"
                                    style={{
                                        width: "7px",
                                        height: "7px",
                                        background: "#34D399",
                                        boxShadow: "0 0 6px #34D399"
                                    }}
                                />
                                <span className="fw-semibold text-white" style={{ fontSize: "12px", letterSpacing: "0.2px" }}>
                                    Gemini 2.5 Coach
                                </span>
                            </div>
                            <span
                                className="badge px-2 py-0.5 rounded-pill"
                                style={{
                                    background: "rgba(52, 211, 153, 0.15)",
                                    color: "#34D399",
                                    border: "1px solid rgba(52, 211, 153, 0.3)",
                                    fontSize: "10px",
                                    fontWeight: "600"
                                }}
                            >
                                Engine Ready
                            </span>
                        </div>

                        {/* 3 Telemetry Feature Rows */}
                        <div className="d-flex flex-column gap-2 py-0.5">
                            <div className="d-flex align-items-center justify-content-between">
                                <div className="d-flex align-items-center gap-2">
                                    <div
                                        className="d-flex align-items-center justify-content-center rounded-2 flex-shrink-0"
                                        style={{ width: "22px", height: "22px", background: "rgba(20, 184, 166, 0.2)", color: "#2DD4BF" }}
                                    >
                                        <FiMic size={12} />
                                    </div>
                                    <span style={{ color: "#E2E8F0", fontSize: "12px" }}>
                                        Live Voice Transcription
                                    </span>
                                </div>
                                <small style={{ color: "#94A3B8", fontSize: "10.5px" }}>Real-time STT</small>
                            </div>

                            <div className="d-flex align-items-center justify-content-between">
                                <div className="d-flex align-items-center gap-2">
                                    <div
                                        className="d-flex align-items-center justify-content-center rounded-2 flex-shrink-0"
                                        style={{ width: "22px", height: "22px", background: "rgba(16, 185, 129, 0.2)", color: "#34D399" }}
                                    >
                                        <FiCheckCircle size={12} />
                                    </div>
                                    <span style={{ color: "#E2E8F0", fontSize: "12px" }}>
                                        Instant Rubric Scoring
                                    </span>
                                </div>
                                <small style={{ color: "#94A3B8", fontSize: "10.5px" }}>10-pt scale</small>
                            </div>

                            <div className="d-flex align-items-center justify-content-between">
                                <div className="d-flex align-items-center gap-2">
                                    <div
                                        className="d-flex align-items-center justify-content-center rounded-2 flex-shrink-0"
                                        style={{ width: "22px", height: "22px", background: "rgba(56, 189, 248, 0.2)", color: "#38BDF8" }}
                                    >
                                        <FiCpu size={12} />
                                    </div>
                                    <span style={{ color: "#E2E8F0", fontSize: "12px" }}>
                                        Tailored Questioning
                                    </span>
                                </div>
                                <small style={{ color: "#94A3B8", fontSize: "10.5px" }}>Tech + HR</small>
                            </div>
                        </div>

                        {/* Benchmark Score Target */}
                        <div className="pt-2 mt-2 border-top border-white-10 d-flex align-items-center justify-content-between">
                            <span className="d-inline-flex align-items-center gap-1.5" style={{ color: "#94A3B8", fontSize: "11px" }}>
                                <FiTarget size={12} style={{ color: "#2DD4BF" }} /> Target Benchmark
                            </span>
                            <span className="fw-semibold" style={{ color: "#5EEAD4", fontSize: "11px" }}>
                                8.5+ Average
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Banner;
