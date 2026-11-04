import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiPlayCircle, FiCheckCircle } from 'react-icons/fi';
import "./Hero.css";

function Hero() {
    const token = localStorage.getItem("token");

    return (
        <section className='container px-3 px-md-4 py-4 py-md-5'>
            <div className="row align-items-center g-4 g-lg-5">
                <div className='col-lg-6 text-center text-lg-start'>
                    <div
                        className="d-inline-flex align-items-center gap-2 px-3 py-1.5 rounded-pill mb-3"
                        style={{ background: "#E6F8F7", border: "1px solid #C4F1ED" }}
                    >
                        <span style={{ color: "#0F9D9A", fontWeight: "700", fontSize: "12px", letterSpacing: "0.5px" }}>
                            ⚡ NEXT-GEN AI INTERVIEW COACH
                        </span>
                    </div>

                    <h1
                        className="fw-bold mb-3"
                        style={{
                            fontSize: "clamp(2rem, 4.2vw, 3.2rem)",
                            lineHeight: "1.18",
                            color: "#0F172A",
                            letterSpacing: "-0.03em"
                        }}
                    >
                        Practice Like It's Real. <br className="d-none d-sm-inline" />
                        <span style={{ color: "#0F9D9A" }}>Get Hired Like a Pro.</span>
                    </h1>

                    <p
                        className='text-secondary mb-4'
                        style={{
                            fontSize: "clamp(15px, 2vw, 17px)",
                            lineHeight: "1.6",
                            maxWidth: "520px",
                            margin: "0 auto 1.5rem"
                        }}
                    >
                        Simulate realistic technical and behavioral interviews with speech recognition or typed responses. 
                        Receive instant AI scoring, pinpointed strengths, missed points, and model answers tailored to your target role.
                    </p>

                    <div className='d-flex gap-2 gap-sm-3 justify-content-center justify-content-lg-start flex-wrap'>
                        <Link to={token ? "/createinterview" : "/signup"} style={{ textDecoration: "none" }}>
                            <button
                                type="button"
                                className="btn btn-hero-primary shadow-sm fw-semibold px-4 py-3 d-inline-flex align-items-center gap-2"
                                style={{
                                    borderRadius: "12px",
                                    fontSize: "15px",
                                    textDecoration: "none"
                                }}
                            >
                                <span>Start Free Interview</span> <FiArrowRight size={17} />
                            </button>
                        </Link>
                        <Link to="/workflow" style={{ textDecoration: "none" }}>
                            <button
                                type="button"
                                className="btn btn-hero-secondary fw-semibold px-4 py-3 d-inline-flex align-items-center gap-2"
                                style={{
                                    borderRadius: "12px",
                                    fontSize: "15px",
                                    textDecoration: "none"
                                }}
                            >
                                <FiPlayCircle size={17} style={{ color: "#0F9D9A" }} />
                                <span>See How It Works</span>
                            </button>
                        </Link>
                    </div>

                    <div className='d-flex justify-content-center justify-content-lg-start gap-3 gap-sm-4 mt-4 flex-wrap text-secondary' style={{ fontSize: "13px" }}>
                        <span className="d-flex align-items-center gap-1.5">
                            <FiCheckCircle className="text-success" /> No Credit Card Required
                        </span>
                        <span className="d-flex align-items-center gap-1.5">
                            <FiCheckCircle className="text-success" /> Powered by Gemini AI
                        </span>
                        <span className="d-flex align-items-center gap-1.5">
                            <FiCheckCircle className="text-success" /> Instant Scoring & Critique
                        </span>
                    </div>

                    <div className='d-flex align-items-center justify-content-center justify-content-lg-start mt-4 pt-2'>
                        <div className="d-flex">
                            <img src='/user1.png' alt='Active candidate user avatar 1' className='trusted-img' />
                            <img src='/user2.png' alt='Active candidate user avatar 2' className='trusted-img overlap' />
                            <img src='/user3.png' alt='Active candidate user avatar 3' className='trusted-img overlap' />
                        </div>
                        <div className='ms-3 text-start'>
                            <h6 className='mb-0 fw-bold' style={{ color: "#0F9D9A", fontSize: "14px" }}>
                                Personalized Preparation
                            </h6>
                            <small className="text-muted" style={{ fontSize: "12px" }}>
                                Realistic speech recognition & structured feedback
                            </small>
                        </div>
                    </div>
                </div>

                <div className='col-lg-6 text-center'>
                    <div className="position-relative d-inline-block">
                        <img
                            src='/HomeHero.png'
                            alt='PrepPilot AI Mock Interview Interface Preview'
                            className='img-fluid'
                            style={{
                                maxWidth: "100%",
                                height: "auto",
                                filter: "drop-shadow(0 20px 40px rgba(15, 157, 154, 0.12))",
                                borderRadius: "16px"
                            }}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Hero;
