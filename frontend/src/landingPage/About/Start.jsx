import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';

function Start() {
    const token = localStorage.getItem("token");

    return (
        <section className='container my-5'>
            <div
                className='text-center p-4 p-md-5 rounded-4 shadow-sm'
                style={{
                    background: "linear-gradient(135deg, #0A2540 0%, #0F3A4C 60%, #0F9D9A 100%)",
                    color: "#FFFFFF",
                    borderRadius: "24px"
                }}
            >
                <div style={{ maxWidth: "600px", margin: "0 auto" }}>
                    <span
                        className="badge px-3 py-1.5 rounded-pill fw-semibold mb-3"
                        style={{
                            background: "rgba(255, 255, 255, 0.15)",
                            border: "1px solid rgba(255, 255, 255, 0.25)",
                            fontSize: "12px"
                        }}
                    >
                        🚀 START YOUR MOCK PRACTICE
                    </span>

                    <h2
                        className='fw-bold text-white mb-3'
                        style={{
                            fontSize: "clamp(1.6rem, 3.5vw, 2.3rem)",
                            lineHeight: "1.25",
                            letterSpacing: "-0.02em"
                        }}
                    >
                        Ready to Ace Your Next Interview?
                    </h2>

                    <p className='text-white-50 mb-4' style={{ fontSize: "15px", lineHeight: "1.6" }}>
                        Generate role-tailored questions, practice speaking naturally under real session timers,
                        and receive objective AI evaluation breakdowns.
                    </p>
                    
                    <div className="d-flex flex-column align-items-center gap-2">
                        <Link to={token ? "/createinterview" : "/signup"} style={{ textDecoration: "none" }}>
                            <button
                                type="button"
                                className="btn btn-lg fw-bold px-4 py-3 shadow-sm d-inline-flex align-items-center gap-2"
                                style={{
                                    background: "#FFFFFF",
                                    color: "#0F9D9A",
                                    border: "none",
                                    borderRadius: "12px",
                                    fontSize: "15px",
                                    textDecoration: "none"
                                }}
                            >
                                <span>Get Started for Free</span> <FiArrowRight size={17} />
                            </button>
                        </Link>
                        <small className='text-white-50 mt-1' style={{ fontSize: "12px" }}>
                            No credit card required • Create and practice in seconds
                        </small>
                    </div>
                </div>                
            </div>
        </section>
    );
}

export default Start;
