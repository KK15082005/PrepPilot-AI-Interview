import React from 'react';
import "./workflow.css";

function Workflow() {
    const steps = [
        {
            num: 1,
            icon: "bi bi-briefcase",
            title: "Configure Role",
            desc: "Choose your target role (Frontend, Backend, SDE, HR), experience level, and preferred duration."
        },
        {
            num: 2,
            icon: "bi bi-mic",
            title: "Practice with AI",
            desc: "Listen to realistic voice prompts, then speak into your mic or type out your answers naturally."
        },
        {
            num: 3,
            icon: "bi bi-cpu",
            title: "Instant AI Evaluation",
            desc: "Gemini AI analyzes each response, scoring content accuracy, depth, and communication style."
        },
        {
            num: 4,
            icon: "bi bi-award",
            title: "Learn & Level Up",
            desc: "Review your detailed strengths, missed points, and model answers to continuously refine your skills."
        }
    ];

    return ( 
        <section className='how-work py-5 my-4'>
            <div className='container text-center'>
                <span
                    className="d-inline-flex px-3 py-1 rounded-pill mb-2 fw-semibold"
                    style={{
                        border: "1px solid #C4F1ED",
                        fontSize: "13px",
                        background: "#E8FAF8",
                        color: "#0F9D9A",
                    }}
                >
                    HOW IT WORKS
                </span>

                <h2 className='fw-bold mb-2' style={{ fontSize: "2rem", color: "#0F172A" }}>
                    Four Simple Steps to Interview Mastery
                </h2>
                <p className="text-secondary mb-5" style={{ maxWidth: "520px", margin: "0 auto 3rem" }}>
                    A proven, frictionless simulation flow designed to build muscle memory before the real thing.
                </p>

                <div className='row g-4 text-center'>
                    {steps.map((step) => (
                        <div className='col-12 col-sm-6 col-lg-3' key={step.num}>
                            <div className="p-4 h-100 rounded-4" style={{ background: "#FFFFFF", border: "1px solid #EAF3F3", boxShadow: "0 4px 15px rgba(15, 23, 42, 0.03)" }}>
                                <div className='step-circle'>{step.num}</div>
                                <i className={step.icon} style={{ fontSize: "36px", color: "#0F9D9A", display: "inline-block", marginBottom: "12px" }}></i>
                                <h5 className="fw-bold mb-2" style={{ color: "#0F172A", fontSize: "17px" }}>{step.title}</h5>
                                <p className="text-secondary mb-0" style={{ fontSize: "14px", lineHeight: "1.6" }}>{step.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Workflow;
