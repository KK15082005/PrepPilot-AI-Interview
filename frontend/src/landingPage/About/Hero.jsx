import React from 'react';
import { Link } from 'react-router-dom';
import "./hero.css";

function Hero() {
    const token = localStorage.getItem("token");

    return (
        <section className='container px-3 px-md-4 py-5'>
            <div className="row align-items-center g-5">
                <div className='col-lg-6 text-center text-lg-start'>
                    <div className="d-inline-flex align-items-center gap-2 px-3 py-1 rounded-pill mb-3" style={{ background: "#E8FAF8", border: "1px solid #C4F1ED" }}>
                        <span style={{ color: "#0F9D9A", fontWeight: "700", fontSize: "13px" }}>✨ NEXT-GEN AI INTERVIEW COACH</span>
                    </div>

                    <h1 className="fw-extrabold display-5 mb-3" style={{ lineHeight: "1.15", color: "#0F172A" }}>
                        Practice Like It's Real. <br className="d-none d-sm-inline" />
                        <span style={{ color: "#0F9D9A" }}>Get Hired Like a Pro.</span>
                    </h1>

                    <p className='text-secondary mb-4' style={{ fontSize: "17px", lineHeight: "1.6", maxWidth: "540px", margin: "0 auto 1.5rem" }}>
                        Simulate realistic AI interviews with natural voice or typed responses. 
                        Receive instant AI scoring, pinpointed strengths, missed points, and ideal answers 
                        tailored to your exact target role.
                    </p>

                    <div className='d-flex gap-3 justify-content-center justify-content-lg-start flex-wrap'>
                        <Link to={token ? "/createinterview" : "/signup"}>
                            <button
                                type="button"
                                className="btn btn-lg text-white shadow-sm fw-semibold px-4 py-3 d-flex align-items-center gap-2"
                                style={{ background: "linear-gradient(135deg, #0F9D9A 0%, #3CC8C3 100%)", border: "none", borderRadius: "12px", fontSize: "16px" }}
                            >
                                Start Free Interview <i className="bi bi-arrow-right"></i>
                            </button>
                        </Link>
                        <Link to="/workflow">
                            <button
                                type="button"
                                className="btn btn-lg btn-outline-secondary fw-semibold px-4 py-3 d-flex align-items-center gap-2"
                                style={{ borderRadius: "12px", fontSize: "16px" }}
                            >
                                <i className="bi bi-play-circle text-primary"></i> See How It Works
                            </button>
                        </Link>
                    </div>

                    <div className='d-flex justify-content-center justify-content-lg-start gap-4 mt-4 flex-wrap text-secondary' style={{ fontSize: "14px" }}>
                        <span className="d-flex align-items-center gap-1">
                            <i className="bi bi-check-circle-fill text-success"></i> No Credit Card
                        </span>
                        <span className="d-flex align-items-center gap-1">
                            <i className="bi bi-check-circle-fill text-success"></i> Powered by Gemini AI
                        </span>
                        <span className="d-flex align-items-center gap-1">
                            <i className="bi bi-check-circle-fill text-success"></i> Instant Feedback
                        </span>
                    </div>

                    <div className='d-flex align-items-center justify-content-center justify-content-lg-start mt-4 pt-2'>
                        <div className="d-flex">
                            <img src='/user1.png' alt='User 1' className='trusted-img' />
                            <img src='/user2.png' alt='User 2' className='trusted-img overlap' />
                            <img src='/user3.png' alt='User 3' className='trusted-img overlap' />
                        </div>
                        <div className='ms-3 text-start'>
                            <h6 className='mb-0 fw-bold' style={{ color: "#0F9D9A" }}>Join 15,000+ candidates</h6>
                            <small className="text-muted">practicing with PrepPilot AI every month</small>
                        </div>
                    </div>
                </div>

                <div className='col-lg-6 text-center'>
                    <div className="position-relative d-inline-block">
                        <img
                            src='/HomeHero.png'
                            alt='PrepPilot AI Mock Interview Mockup'
                            className='img-fluid'
                            style={{
                                maxWidth: "100%",
                                height: "auto",
                                filter: "drop-shadow(0 20px 40px rgba(15, 157, 154, 0.15))"
                            }}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Hero;
