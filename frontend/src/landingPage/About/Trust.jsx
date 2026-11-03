import React from 'react';

function Trust() {
    const stats = [
        {
            value: "15,000+",
            label: "Mock Interviews",
            icon: "bi bi-people"
        },
        {
            value: "95%",
            label: "Improvement Rate",
            icon: "bi bi-graph-up-arrow"
        },
        {
            value: "24 / 7",
            label: "AI Availability",
            icon: "bi bi-clock-history"
        },
        {
            value: "50+",
            label: "Tech & HR Roles",
            icon: "bi bi-briefcase"
        }
    ];

    return (
        <div className='container my-4'>
            <div
                className='row g-4 rounded-4 p-4 align-items-center'
                style={{
                    background: "linear-gradient(135deg, #EEF8F8 0%, #E6F6F6 100%)",
                    border: "1px solid #D6EFEF"
                }}
            >
                {stats.map((item, index) => (
                    <div className='col-6 col-lg-3' key={index}>
                        <div className="d-flex align-items-center gap-3">
                            <div
                                style={{
                                    width: "48px",
                                    height: "48px",
                                    borderRadius: "12px",
                                    background: "#FFFFFF",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    color: "#0F9D9A",
                                    fontSize: "24px",
                                    flexShrink: 0,
                                    boxShadow: "0 2px 6px rgba(15, 157, 154, 0.15)"
                                }}
                            >
                                <i className={item.icon}></i>
                            </div>
                            <div>
                                <h4 className='mb-0 fw-bold' style={{ color: "#0F172A", fontSize: "1.3rem" }}>
                                    {item.value}
                                </h4>
                                <small className='text-secondary fw-medium'>
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
