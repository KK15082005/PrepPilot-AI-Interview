import React from 'react';
import { FiCpu, FiMic, FiCheckSquare, FiBriefcase } from 'react-icons/fi';

function Trust() {
    const pillars = [
        {
            value: "Gemini AI",
            label: "Role-Specific Questions",
            icon: <FiCpu size={22} />
        },
        {
            value: "Speech Recognition",
            label: "Natural Voice Responses",
            icon: <FiMic size={22} />
        },
        {
            value: "Instant Feedback",
            label: "Scoring & Ideal Answers",
            icon: <FiCheckSquare size={22} />
        },
        {
            value: "Multi-Track",
            label: "Tech, HR & Behavioral",
            icon: <FiBriefcase size={22} />
        }
    ];

    return (
        <div className='container my-3 my-md-4'>
            <div
                className='row g-3 g-md-4 rounded-4 p-3 p-md-4 align-items-center'
                style={{
                    background: "linear-gradient(135deg, #F0FDFB 0%, #E6FAF8 100%)",
                    border: "1px solid #D6EFEF"
                }}
            >
                {pillars.map((item, index) => (
                    <div className='col-6 col-lg-3' key={index}>
                        <div className="d-flex align-items-center gap-2 gap-sm-3">
                            <div
                                style={{
                                    width: "42px",
                                    height: "42px",
                                    borderRadius: "11px",
                                    background: "#FFFFFF",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    color: "#0F9D9A",
                                    flexShrink: 0,
                                    boxShadow: "0 2px 6px rgba(15, 157, 154, 0.12)"
                                }}
                            >
                                {item.icon}
                            </div>
                            <div style={{ minWidth: 0 }}>
                                <h5 className='mb-0 fw-bold text-truncate' style={{ color: "#0F172A", fontSize: "clamp(13px, 1.8vw, 15px)" }}>
                                    {item.value}
                                </h5>
                                <small className='text-secondary d-block text-truncate' style={{ fontSize: "12px" }}>
                                    {item.label}
                                </small>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Trust;
