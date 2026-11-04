import React from 'react';
import Footer from '../footer';
import { Link } from 'react-router-dom';
import { FiCheck, FiX, FiHelpCircle } from 'react-icons/fi';

function Pricing() {
    const token = localStorage.getItem("token");

    const plans = [
        {
            name: "Free Community",
            price: "$0",
            period: "Forever free",
            desc: "Everything you need to practice and sharpen your interview responses.",
            popular: false,
            badge: "CURRENT PLAN",
            features: [
                "10 AI mock interview questions per session",
                "Technical, HR, Behavioral, and Mixed rounds",
                "Browser speech-to-text voice answering",
                "Text-to-speech audio question playback",
                "Instant AI answer scoring & detailed feedback",
                "Model ideal answers for every question",
                "Session performance history & reports",
            ],
            notIncluded: [
                "PDF report downloads",
                "Resume PDF upload & question parsing",
                "Custom company interview question banks",
            ],
            cta: token ? "Go to Dashboard" : "Get Started Free",
            link: token ? "/dashboard" : "/signup",
            buttonClass: "btn-outline-primary"
        },
        {
            name: "PrepPilot Pro",
            price: "$19",
            period: "per month",
            desc: "Advanced intelligence, resume parsing, and unlimited in-depth coaching.",
            popular: true,
            badge: "MOST POPULAR",
            features: [
                "Unlimited mock interview sessions",
                "Up to 30 questions per session (45 min simulation)",
                "Resume PDF upload & automated skill parsing",
                "Company-specific mock banks (FAANG, FinTech, Startups)",
                "Downloadable PDF performance reports",
                "Voice tone and confidence analytics",
                "Priority Gemini 3.5 AI inference speed",
                "Save and bookmark favorite questions",
            ],
            notIncluded: [],
            cta: "Upgrade to Pro",
            link: token ? "/dashboard" : "/signup",
            buttonClass: "btn-primary"
        }
    ];

    const faqs = [
        {
            q: "Is PrepPilot AI really free to use?",
            a: "Yes! Our Free Community tier provides full access to AI question generation, voice-assisted answering, and comprehensive AI scoring without requiring any credit card."
        },
        {
            q: "How does the AI evaluate my answers?",
            a: "We utilize Google's Gemini AI models. Your response is analyzed for technical terminology, accuracy, edge case consideration, and communication clarity against realistic industry hiring benchmarks."
        },
        {
            q: "Can I answer using my microphone or keyboard?",
            a: "Both! You can speak naturally into your microphone using browser speech recognition, or type your answer directly into the editor."
        },
        {
            q: "What types of interviews can I create?",
            a: "You can configure Technical interviews (Frontend, Backend, SDE, Data), HR behavioral rounds (culture fit, conflict resolution), or Mixed comprehensive interviews across Fresher to 5+ years experience levels."
        }
    ];

    return (
        <div style={{ background: "#F8FCFB", minHeight: "calc(100vh - 66px)" }}>
            {/* Header */}
            <div className="container text-center py-5">
                <span className="badge px-3 py-2 rounded-pill fw-semibold mb-3" style={{ background: "#E8FAF8", color: "#0F9D9A", border: "1px solid #C4F1ED" }}>
                    TRANSPARENT PRICING
                </span>
                <h1 className="fw-bold mb-3 display-5" style={{ color: "#0F172A" }}>
                    Invest in Your Career with Confidence
                </h1>
                <p className="text-secondary" style={{ maxWidth: "560px", margin: "0 auto", fontSize: "17px" }}>
                    Choose the plan that fits your job search timeline. Start practicing immediately with zero upfront cost.
                </p>

                {/* Plan Cards */}
                <div className="row g-4 justify-content-center mt-4">
                    {plans.map((p, idx) => (
                        <div className="col-lg-5 col-md-6" key={idx}>
                            <div
                                className={`card h-100 p-4 p-md-5 text-start border-0 shadow-sm position-relative ${
                                    p.popular ? "border border-2 border-primary" : ""
                                }`}
                                style={{
                                    borderRadius: "24px",
                                    background: "#FFFFFF",
                                    boxShadow: p.popular ? "0 20px 40px rgba(15, 157, 154, 0.15)" : undefined
                                }}
                            >
                                {p.popular && (
                                    <span
                                        className="position-absolute top-0 end-0 translate-middle-y me-4 badge px-3 py-2 rounded-pill fw-bold"
                                        style={{ background: "linear-gradient(135deg, #0F9D9A, #3CC8C3)", color: "#fff" }}
                                    >
                                        {p.badge}
                                    </span>
                                )}

                                <h4 className="fw-bold mb-1" style={{ color: "#0F172A" }}>{p.name}</h4>
                                <p className="text-secondary mb-4" style={{ fontSize: "14px" }}>{p.desc}</p>

                                <div className="d-flex align-items-baseline mb-4">
                                    <h1 className="fw-bold display-5 mb-0" style={{ color: "#0F172A" }}>{p.price}</h1>
                                    <span className="text-secondary ms-2" style={{ fontSize: "14px" }}>/ {p.period}</span>
                                </div>

                                <Link to={p.link} className="text-decoration-none w-100 mb-4">
                                    <button
                                        className={`btn w-100 py-3 fw-semibold ${
                                            p.popular ? "text-white shadow-sm" : "btn-outline-secondary"
                                        }`}
                                        style={{
                                            background: p.popular ? "linear-gradient(135deg, #0F9D9A, #3CC8C3)" : undefined,
                                            border: p.popular ? "none" : undefined,
                                            borderRadius: "12px",
                                            fontSize: "16px"
                                        }}
                                    >
                                        {p.cta}
                                    </button>
                                </Link>

                                <hr style={{ borderColor: "#E2E8F0" }} />

                                <h6 className="fw-bold mb-3" style={{ fontSize: "14px", color: "#0F172A" }}>Included Features:</h6>
                                <ul className="list-unstyled mb-0" style={{ fontSize: "14px" }}>
                                    {p.features.map((f, fIdx) => (
                                        <li key={fIdx} className="d-flex align-items-start gap-2 mb-2 text-secondary">
                                            <FiCheck className="text-success mt-1 flex-shrink-0" />
                                            <span>{f}</span>
                                        </li>
                                    ))}
                                    {p.notIncluded.map((f, fIdx) => (
                                        <li key={fIdx} className="d-flex align-items-start gap-2 mb-2 text-muted" style={{ opacity: 0.6 }}>
                                            <FiX className="text-muted mt-1 flex-shrink-0" />
                                            <span>{f}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>

                {/* FAQ Section */}
                <div className="mt-5 pt-5" style={{ maxWidth: "780px", margin: "0 auto" }}>
                    <div className="d-flex align-items-center justify-content-center gap-2 mb-2">
                        <FiHelpCircle className="text-primary" size={22} />
                        <h3 className="fw-bold mb-0" style={{ color: "#0F172A" }}>Frequently Asked Questions</h3>
                    </div>
                    <p className="text-secondary mb-4">Everything you need to know about PrepPilot AI.</p>

                    <div className="accordion text-start" id="pricingFaq">
                        {faqs.map((faq, i) => (
                            <div className="card border-0 mb-3 rounded-4 shadow-sm overflow-hidden" key={i}>
                                <div className="card-body p-4">
                                    <h5 className="fw-bold mb-2" style={{ color: "#0F172A", fontSize: "17px" }}>{faq.q}</h5>
                                    <p className="text-secondary mb-0" style={{ fontSize: "14px", lineHeight: "1.6" }}>{faq.a}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}

export default Pricing;
