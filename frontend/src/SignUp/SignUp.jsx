import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaUser, FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import toast from 'react-hot-toast';
import API from '../services/api';

function SignUp() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    });
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        setErrorMsg("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            const msg = "Passwords do not match";
            setErrorMsg(msg);
            toast.error(msg);
            return;
        }

        if (formData.password.length < 6) {
            const msg = "Password must be at least 6 characters long";
            setErrorMsg(msg);
            toast.error(msg);
            return;
        }

        setLoading(true);
        setErrorMsg("");

        try {
            await API.post("/auth/register", {
                username: formData.username,
                email: formData.email,
                password: formData.password,
            });

            toast.success("Account created successfully! Please sign in.");
            navigate("/login");

        } catch (error) {
            console.error("Registration error:", error.response?.data || error.message);
            const msg = error.response?.data?.message || "Registration failed. Please try again.";
            setErrorMsg(msg);
            toast.error(msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="container-fluid py-4"
            style={{
                minHeight: "100vh",
                background: "linear-gradient(135deg, #F8FCFC 0%, #EEF8F8 55%, #FCFEFE 100%)",
                display: "flex",
                alignItems: "center"
            }}
        >
            <div className="container" style={{ maxWidth: "1080px" }}>
                <div className='row align-items-center justify-content-center g-5'>
                    {/* Illustration Column (Hidden on mobile for better UX) */}
                    <div className="col-lg-6 d-none d-lg-block text-center">
                        <img
                            src="/signup-img.png"
                            alt="PrepPilot Registration Illustration"
                            style={{ maxWidth: "90%", height: "auto", filter: "drop-shadow(0 15px 30px rgba(15, 157, 154, 0.12))" }}
                        />
                        <div className="mt-4 text-center">
                            <h4 className="fw-bold" style={{ color: "#0F172A" }}>Practice Without Pressure</h4>
                            <p className="text-secondary" style={{ maxWidth: "380px", margin: "0 auto" }}>
                                Personalized questions, instant speech analysis, and model answers to help you interview with confidence.
                            </p>
                        </div>
                    </div>

                    {/* Form Column */}
                    <div className="col-lg-6 col-md-9 col-12">
                        <div
                            className="p-4 p-sm-5 shadow-sm bg-white"
                            style={{
                                borderRadius: "24px",
                                border: "1px solid #E2E8F0",
                                maxWidth: "520px",
                                margin: "0 auto"
                            }}
                        >
                            <div className="mb-4 text-center text-sm-start">
                                <Link to="/" className="text-decoration-none">
                                    <h4 className="fw-bold mb-1" style={{ color: "#0F172A" }}>
                                        PrepPilot <span style={{ color: "#0F9D9A" }}>AI</span>
                                    </h4>
                                </Link>
                                <h3 className="fw-bold mt-2 mb-1" style={{ color: "#0F172A", fontSize: "22px" }}>
                                    Create Your Account
                                </h3>
                                <small className='text-secondary'>
                                    Join thousands of learners and get interview ready today.
                                </small>
                            </div>

                            {errorMsg && (
                                <div className="alert alert-danger py-2 px-3 mb-3 d-flex align-items-center gap-2" style={{ fontSize: "14px" }}>
                                    <i className="bi bi-exclamation-circle-fill flex-shrink-0"></i>
                                    <span>{errorMsg}</span>
                                </div>
                            )}

                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="inputUsername" className="form-label fw-semibold" style={{ fontSize: "14px" }}>
                                        Full Name / Username
                                    </label>
                                    <div className='input-group'>
                                        <span className='input-group-text bg-light text-secondary border-end-0'><FaUser /></span>
                                        <input
                                            type="text"
                                            name="username"
                                            value={formData.username}
                                            onChange={handleChange}
                                            className="form-control py-2 ps-2 border-start-0"
                                            id="inputUsername"
                                            placeholder="e.g. Alex Morgan"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="inputEmail" className="form-label fw-semibold" style={{ fontSize: "14px" }}>
                                        Email Address
                                    </label>
                                    <div className='input-group'>
                                        <span className='input-group-text bg-light text-secondary border-end-0'><MdEmail /></span>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="form-control py-2 ps-2 border-start-0"
                                            id="inputEmail"
                                            placeholder="alex@example.com"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="inputPassword" className="form-label fw-semibold" style={{ fontSize: "14px" }}>
                                        Password
                                    </label>
                                    <div className='input-group'>
                                        <span className='input-group-text bg-light text-secondary border-end-0'><FaLock /></span>
                                        <input
                                            type="password"
                                            name="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            id="inputPassword"
                                            className="form-control py-2 ps-2 border-start-0"
                                            placeholder='At least 6 characters'
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="inputConfirmPassword" className="form-label fw-semibold" style={{ fontSize: "14px" }}>
                                        Confirm Password
                                    </label>
                                    <div className='input-group'>
                                        <span className='input-group-text bg-light text-secondary border-end-0'><FaLock /></span>
                                        <input
                                            type="password"
                                            name="confirmPassword"
                                            value={formData.confirmPassword}
                                            onChange={handleChange}
                                            id="inputConfirmPassword"
                                            className="form-control py-2 ps-2 border-start-0"
                                            placeholder='Repeat your password'
                                            required
                                        />
                                    </div>
                                </div>

                                <button
                                    type='submit'
                                    className="btn w-100 py-3 mt-3 text-white fw-semibold d-flex align-items-center justify-content-center gap-2 shadow-sm"
                                    style={{ background: "linear-gradient(135deg,#0F9D9A,#3CC8C3)", border: "none", borderRadius: "10px" }}
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <>
                                            <span className="spinner-border spinner-border-sm" role="status"></span>
                                            Creating Account...
                                        </>
                                    ) : (
                                        "Create Free Account"
                                    )}
                                </button>

                                <div className="text-center mt-3" style={{ fontSize: "14px" }}>
                                    <span className='text-secondary'>Already have an account? </span>
                                    <Link to="/login" style={{ color: "#0F9D9A", fontWeight: "600" }}>Login here</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignUp;
