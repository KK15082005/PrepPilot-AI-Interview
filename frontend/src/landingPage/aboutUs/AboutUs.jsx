import React from 'react';
import Navbar from '../Navbar';
import Footer from '../footer';
import { Link } from 'react-router-dom';
import { FiTarget, FiZap, FiHeart, FiCode } from 'react-icons/fi';

function AboutUs() {
    const values = [
        {
            icon: <FiTarget size={26} />,
            title: "Simulate Real Pressure",
            desc: "Technical interviews are hard not because people don't know the answer, but because communicating under pressure is a muscle that must be trained."
        },
        {
            icon: <FiZap size={26} />,
            title: "Actionable, Not Vague",
            desc: "Instead of generic grades, we pinpoint the exact terminology and architectural nuances needed to elevate your responses to senior-level."
        },
        {
            icon: <FiHeart size={26} />,
            title: "Accessible to Every Candidate",
            desc: "High-quality mock interview coaches often cost $100+/hour. PrepPilot AI provides top-tier AI coaching accessible to anyone with a browser."
        },
        {
            icon: <FiCode size={26} />,
            title: "Engineered with Modern Tech",
            desc: "Built using React 19, Node.js, MongoDB Atlas, and state-of-the-art Google Gemini 3.5 AI inference."
        }
    ];

    return (
        <div style={{ background: "#F8FCFB", minHeight: "100vh" }}>
            <Navbar />

            {/* Hero Section */}
            <section className="container py-5 text-center">
                <span className="badge px-3 py-2 rounded-pill fw-semibold mb-3" style={{ background: "#E8FAF8", color: "#0F9D9A", border: "1px solid #C4F1ED" }}>
                    OUR MISSION
                </span>
                <h1 className="fw-bold mb-3 display-5" style={{ color: "#0F172A", maxWidth: "780px", margin: "0 auto 1.5rem" }}>
                    Bridging the Gap Between Knowing the Code and Cracking the Interview
                </h1>
                <p className="text-secondary mb-5" style={{ maxWidth: "620px", margin: "0 auto", fontSize: "17px", lineHeight: "1.7" }}>
                    PrepPilot AI was founded to empower students, career switchers, and software engineers 
                    to overcome interview anxiety through realistic, voice-enabled mock simulations and instant feedback.
                </p>

                {/* Values Grid */}
                <div className="row g-4 justify-content-center text-start mt-2">
                    {values.map((v, idx) => (
                        <div className="col-md-6 col-lg-3" key={idx}>
                            <div
                                className="card h-100 p-4 border-0 shadow-sm"
                                style={{ borderRadius: "20px", background: "#FFFFFF", border: "1px solid #EAF3F3" }}
                            >
                                <div
                                    style={{
                                        width: "50px",
                                        height: "50px",
                                        borderRadius: "14px",
                                        background: "#E6F8F7",
                                        color: "#0F9D9A",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        marginBottom: "18px"
                                    }}
                                >
                                    {v.icon}
                                </div>
                                <h5 className="fw-bold mb-2" style={{ color: "#0F172A", fontSize: "17px" }}>{v.title}</h5>
                                <p className="text-secondary mb-0" style={{ fontSize: "14px", lineHeight: "1.6" }}>{v.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Story / Architecture Highlight */}
                <div
                    className="card border-0 p-4 p-md-5 mt-5 text-start shadow-sm"
                    style={{
                        borderRadius: "24px",
                        background: "linear-gradient(135deg, #EEF8F8 0%, #FFFFFF 100%)",
                        border: "1px solid #D6EFEF",
                        maxWidth: "920px",
                        margin: "3rem auto 0"
                    }}
                >
                    <div className="row align-items-center g-4">
                        <div className="col-md-8">
                            <span className="badge bg-white text-primary border border-primary-subtle px-3 py-1 rounded-pill mb-2 fw-semibold">
                                HOW IT WAS BUILT
                            </span>
                            <h3 className="fw-bold mb-3" style={{ color: "#0F172A" }}>
                                Full-Stack Architecture Powered by AI
                            </h3>
                            <p className="text-secondary mb-3" style={{ fontSize: "15px", lineHeight: "1.7" }}>
                                PrepPilot AI combines a responsive React single-page frontend with an Express/Node.js REST API, 
                                secure JWT authorization cookies, MongoDB data schemas for questions and answers, and Google's 
                                latest Gemini Generative AI engine.
                            </p>
                            <div className="d-flex gap-2 flex-wrap">
                                <span className="badge bg-white text-dark border px-3 py-2 rounded-pill">React 19</span>
                                <span className="badge bg-white text-dark border px-3 py-2 rounded-pill">Node.js / Express</span>
                                <span className="badge bg-white text-dark border px-3 py-2 rounded-pill">MongoDB Atlas</span>
                                <span className="badge bg-white text-dark border px-3 py-2 rounded-pill">Google Gemini AI</span>
                                <span className="badge bg-white text-dark border px-3 py-2 rounded-pill">Web Speech API</span>
                            </div>
                        </div>

                        <div className="col-md-4 text-center">
                            <Link to="/signup">
                                <button
                                    className="btn px-4 py-3 text-white fw-bold shadow-sm"
                                    style={{
                                        background: "linear-gradient(135deg, #0F9D9A, #3CC8C3)",
                                        border: "none",
                                        borderRadius: "12px",
                                        fontSize: "16px"
                                    }}
                                >
                                    Try PrepPilot Free →
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}

export default AboutUs;
