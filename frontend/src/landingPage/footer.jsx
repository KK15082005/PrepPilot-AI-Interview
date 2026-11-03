import React from 'react';
import { Link } from 'react-router-dom';
import "./footer.css";

function Footer() {
    return (
        <footer className="footer py-5 mt-5 border-top" style={{ background: "#FFFFFF", borderColor: "#E2E8F0" }}>
            <div className="container">
                <div className="row g-4">   
                    {/* Brand Column */}  
                    <div className="col-lg-4 col-md-6 mb-4">
                        <Link to="/" className="d-flex align-items-center gap-2 text-decoration-none mb-3">
                            <span
                                style={{
                                    width: "32px",
                                    height: "32px",
                                    background: "linear-gradient(135deg, #0F9D9A, #3CC8C3)",
                                    borderRadius: "8px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    color: "#fff",
                                    fontSize: "16px",
                                }}
                            >
                                ⚡
                            </span>
                            <h4 className="mb-0 fw-bold" style={{ color: "#0F172A" }}>
                                PrepPilot <span style={{ color: "#0F9D9A" }}>AI</span>
                            </h4>
                        </Link>

                        <p className="text-secondary" style={{ fontSize: "14px", lineHeight: "1.6", maxWidth: "320px" }}>
                            The AI mock interview platform that helps job seekers prepare smarter, 
                            build confidence, and land their dream jobs with real-time AI critique.
                        </p>
                    </div>

                    {/* Product Links */}
                    <div className="col-lg-2 col-6 mb-4">
                        <h6 className="fw-bold mb-3" style={{ color: "#0F172A" }}>Product</h6>
                        <ul className="list-unstyled" style={{ fontSize: "14px" }}>
                            <li className="mb-2"><Link to="/feature" className="text-secondary text-decoration-none">Features</Link></li>
                            <li className="mb-2"><Link to="/workflow" className="text-secondary text-decoration-none">How It Works</Link></li>
                            <li className="mb-2"><Link to="/pricing" className="text-secondary text-decoration-none">Pricing</Link></li>
                            <li className="mb-2"><Link to="/resources" className="text-secondary text-decoration-none">Resources</Link></li>
                        </ul>
                    </div>

                    {/* Resources */}
                    <div className="col-lg-3 col-6 mb-4">
                        <h6 className="fw-bold mb-3" style={{ color: "#0F172A" }}>Preparation</h6>
                        <ul className="list-unstyled" style={{ fontSize: "14px" }}>
                            <li className="mb-2"><Link to="/resources" className="text-secondary text-decoration-none">Technical Mock Interviews</Link></li>
                            <li className="mb-2"><Link to="/resources" className="text-secondary text-decoration-none">HR Behavioral Rounds</Link></li>
                            <li className="mb-2"><Link to="/resources" className="text-secondary text-decoration-none">STAR Method Guide</Link></li>
                            <li className="mb-2"><Link to="/resources" className="text-secondary text-decoration-none">Interview Tips & Cheatsheets</Link></li>
                        </ul>
                    </div>

                    {/* Company */}
                    <div className="col-lg-3 col-md-6 mb-4">
                        <h6 className="fw-bold mb-3" style={{ color: "#0F172A" }}>Company</h6>
                        <ul className="list-unstyled" style={{ fontSize: "14px" }}>
                            <li className="mb-2"><Link to="/about" className="text-secondary text-decoration-none">About PrepPilot</Link></li>
                            <li className="mb-2"><a href="https://github.com" target="_blank" rel="noreferrer" className="text-secondary text-decoration-none">GitHub Repository</a></li>
                            <li className="mb-2"><Link to="/about" className="text-secondary text-decoration-none">Contact & Support</Link></li>
                        </ul>

                        <div className="d-flex gap-3 mt-3">
                            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="btn btn-sm btn-light border rounded-circle p-2 text-secondary">
                                <i className="bi bi-linkedin"></i>
                            </a>
                            <a href="https://github.com" target="_blank" rel="noreferrer" className="btn btn-sm btn-light border rounded-circle p-2 text-secondary">
                                <i className="bi bi-github"></i>
                            </a>
                            <a href="mailto:support@preppilot.ai" className="btn btn-sm btn-light border rounded-circle p-2 text-secondary">
                                <i className="bi bi-envelope"></i>
                            </a>
                        </div>
                    </div>
                </div>

                <hr style={{ borderColor: "#E2E8F0" }} />

                <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 text-secondary" style={{ fontSize: "13px" }}>
                    <p className="mb-0">© {new Date().getFullYear()} PrepPilot AI. Built with ❤️ for developers worldwide.</p>
                    <p className="mb-0">Powered by Google Gemini AI & React</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
