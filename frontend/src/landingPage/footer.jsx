import React from 'react';
import { Link } from 'react-router-dom';
import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';
import "./footer.css";

function Footer() {
    return (
        <footer className="footer py-5 mt-5 border-top" style={{ background: "#FFFFFF", borderColor: "#E2E8F0" }}>
            <div className="container">
                <div className="row g-4 justify-content-between">   
                    {/* Brand Column */}  
                    <div className="col-lg-4 col-md-6 mb-3 mb-md-0">
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
                            <h4 className="mb-0 fw-bold" style={{ color: "#0F172A", fontSize: "1.25rem" }}>
                                PrepPilot <span style={{ color: "#0F9D9A" }}>AI</span>
                            </h4>
                        </Link>

                        <p className="text-secondary" style={{ fontSize: "14px", lineHeight: "1.6", maxWidth: "340px" }}>
                            Intelligent mock interview platform helping engineers and candidates prepare effectively,
                            refine spoken responses, and identify growth areas with instant AI feedback.
                        </p>
                    </div>

                    {/* Product Links */}
                    <div className="col-lg-2 col-6">
                        <h6 className="fw-bold mb-3" style={{ color: "#0F172A", fontSize: "14px" }}>Product</h6>
                        <ul className="list-unstyled mb-0" style={{ fontSize: "14px" }}>
                            <li className="mb-2"><Link to="/feature" className="text-secondary text-decoration-none">Features</Link></li>
                            <li className="mb-2"><Link to="/workflow" className="text-secondary text-decoration-none">How It Works</Link></li>
                            <li className="mb-2"><Link to="/pricing" className="text-secondary text-decoration-none">Pricing</Link></li>
                            <li className="mb-2"><Link to="/resources" className="text-secondary text-decoration-none">Resources</Link></li>
                        </ul>
                    </div>

                    {/* Resources */}
                    <div className="col-lg-3 col-6">
                        <h6 className="fw-bold mb-3" style={{ color: "#0F172A", fontSize: "14px" }}>Practice Tracks</h6>
                        <ul className="list-unstyled mb-0" style={{ fontSize: "14px" }}>
                            <li className="mb-2"><Link to="/resources" className="text-secondary text-decoration-none">Technical Coding Mocks</Link></li>
                            <li className="mb-2"><Link to="/resources" className="text-secondary text-decoration-none">HR & Behavioral Rounds</Link></li>
                            <li className="mb-2"><Link to="/resources" className="text-secondary text-decoration-none">System Knowledge</Link></li>
                            <li className="mb-2"><Link to="/resources" className="text-secondary text-decoration-none">STAR Interview Method</Link></li>
                        </ul>
                    </div>

                    {/* Company */}
                    <div className="col-lg-2 col-md-6">
                        <h6 className="fw-bold mb-3" style={{ color: "#0F172A", fontSize: "14px" }}>Company</h6>
                        <ul className="list-unstyled mb-0" style={{ fontSize: "14px" }}>
                            <li className="mb-2"><Link to="/about" className="text-secondary text-decoration-none">About Us</Link></li>
                            <li className="mb-2"><Link to="/login" className="text-secondary text-decoration-none">Sign In</Link></li>
                            <li className="mb-2"><Link to="/signup" className="text-secondary text-decoration-none">Create Account</Link></li>
                        </ul>

                        <div className="d-flex gap-2 mt-3">
                            <a
                                href="https://github.com"
                                target="_blank"
                                rel="noreferrer"
                                className="btn btn-sm btn-light border rounded-circle p-2 text-secondary d-flex align-items-center justify-content-center"
                                style={{ width: "34px", height: "34px" }}
                                aria-label="GitHub Repository"
                            >
                                <FiGithub size={15} />
                            </a>
                            <a
                                href="https://linkedin.com"
                                target="_blank"
                                rel="noreferrer"
                                className="btn btn-sm btn-light border rounded-circle p-2 text-secondary d-flex align-items-center justify-content-center"
                                style={{ width: "34px", height: "34px" }}
                                aria-label="LinkedIn"
                            >
                                <FiLinkedin size={15} />
                            </a>
                            <a
                                href="mailto:support@preppilot.ai"
                                className="btn btn-sm btn-light border rounded-circle p-2 text-secondary d-flex align-items-center justify-content-center"
                                style={{ width: "34px", height: "34px" }}
                                aria-label="Email Support"
                            >
                                <FiMail size={15} />
                            </a>
                        </div>
                    </div>
                </div>

                <hr className="my-4" style={{ borderColor: "#E2E8F0" }} />

                <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 text-secondary" style={{ fontSize: "13px" }}>
                    <p className="mb-0">© {new Date().getFullYear()} PrepPilot AI. Built for candidates preparing for real-world interviews.</p>
                    <p className="mb-0 text-muted">Powered by Google Gemini AI & React</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
