import React from 'react';
import { Link } from 'react-router-dom';

function Start() {
    const token = localStorage.getItem("token");

    return (
        <section className='container my-5'>
            <div
                className='text-center p-5 rounded-4 shadow-sm'
                style={{
                    background: "linear-gradient(135deg, #103B49 0%, #0F9D9A 100%)",
                    color: "#FFFFFF",
                    borderRadius: "24px"
                }}
            >
                <div style={{ maxWidth: "620px", margin: "0 auto" }}>
                    <span className="badge bg-white text-dark px-3 py-2 rounded-pill fw-semibold mb-3">
                        🚀 START YOUR PREPARATION
                    </span>

                    <h2 className='fw-bold text-white mb-3 display-6' style={{ lineHeight: "1.25" }}>
                        Ready to Ace Your Next Interview?
                    </h2>

                    <p className='text-white-50 mb-4' style={{ fontSize: "16px", lineHeight: "1.6" }}>
                        Join thousands of aspiring software engineers and professionals practicing real-time mock interviews with PrepPilot AI.
                    </p>
                    
                    <div className="d-flex flex-column align-items-center gap-2">
                        <Link to={token ? "/createinterview" : "/signup"}>
                            <button
                                type="button"
                                className="btn btn-lg fw-bold px-5 py-3 shadow"
                                style={{
                                    background: "#FFFFFF",
                                    color: "#0F9D9A",
                                    border: "none",
                                    borderRadius: "12px",
                                    fontSize: "17px"
                                }}
                            >
                                Get Started for Free →
                            </button>
                        </Link>
                        <small className='text-white-50 mt-1'>
                            No credit card required • Instant access in 30 seconds
                        </small>
                    </div>
                </div>                
            </div>
        </section>
    );
}

export default Start;
