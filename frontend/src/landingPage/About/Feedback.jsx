import React from 'react';
import { Link } from 'react-router-dom';

function Feedback() {
    const token = localStorage.getItem("token");

    return (
        <section className='container my-5 py-4'>
            <div
                className='row align-items-center g-5 rounded-4 p-4 p-lg-5'
                style={{
                    background: "linear-gradient(135deg, #F0FDFB 0%, #E6FAF8 100%)",
                    border: "1px solid #D6EFEF"
                }}
            >
                <div className='col-lg-6 text-center text-lg-start'>
                    <span
                        className="d-inline-flex px-3 py-1 rounded-pill mb-3 fw-semibold"
                        style={{
                            border: "1px solid #C4F1ED",
                            fontSize: "13px",
                            background: "#FFFFFF",
                            color: "#0F9D9A",
                        }}
                    >
                        ACTIONABLE CRITIQUE
                    </span>

                    <h2 className="fw-bold mb-3 display-6" style={{ color: "#0F172A", lineHeight: "1.25" }}>
                        Feedback That Actually Helps You Get Better.
                    </h2>

                    <p className='text-secondary mb-4' style={{ fontSize: "16px", lineHeight: "1.7" }}>
                        Most mock interviews only give you a grade. PrepPilot AI breaks down exactly 
                        what terminologies you nailed, what edge cases you missed, and provides a polished 
                        ideal answer so you know exactly how to answer next time.
                    </p>

                    <Link to={token ? "/createinterview" : "/signup"}>
                        <button
                            type="button"
                            className="btn btn-lg text-white fw-semibold px-4 py-3 d-inline-flex align-items-center gap-2 shadow-sm"
                            style={{
                                background: "linear-gradient(135deg, #0F9D9A 0%, #3CC8C3 100%)",
                                border: "none",
                                borderRadius: "12px",
                                fontSize: "16px"
                            }}
                        >
                            Try It Yourself <i className="bi bi-arrow-right"></i>
                        </button>
                    </Link>
                </div>

                <div className='col-lg-6 text-center'>
                    <img
                        src='/feedback.png'
                        alt='AI Feedback Breakdown Preview'
                        className="img-fluid rounded-4 shadow-sm"
                        style={{
                            maxHeight: "380px",
                            width: "auto",
                            border: "1px solid rgba(15, 157, 154, 0.15)"
                        }}
                    />
                </div>
            </div>
        </section>
    );
}

export default Feedback;
