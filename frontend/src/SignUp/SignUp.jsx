import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff, FiArrowRight } from "react-icons/fi";
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
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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
                <div className='row align-items-center justify-content-center g-4 g-lg-5'>
                    {/* Illustration Column (Hidden on mobile for better UX) */}
                    <div className="col-lg-6 d-none d-lg-block text-center">
                        <img
                            src="/signup-img.png"
                            alt="PrepPilot Registration Illustration"
                            style={{ maxWidth: "85%", height: "auto", filter: "drop-shadow(0 15px 30px rgba(15, 157, 154, 0.12))" }}
                        />
                        <div className="mt-4 text-center">
                            <h4 className="fw-bold" style={{ color: "#0F172A", fontSize: "1.25rem" }}>Practice Without Pressure</h4>
                            <p className="text-secondary" style={{ maxWidth: "380px", margin: "0 auto", fontSize: "14px", lineHeight: "1.6" }}>
                                Personalized questions, real-time speech analysis, and AI model answers to help you interview with confidence.
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
                                maxWidth: "500px",
                                margin: "0 auto"
                            }}
                        >
                            <div className="mb-4 text-center text-sm-start">
                                <Link to="/" className="text-decoration-none d-inline-flex align-items-center mb-2">
                                    <img
                                        src="/logo.png"
                                        alt="PrepPilot AI"
                                        style={{ height: "46px", width: "auto", maxWidth: "220px", objectFit: "contain" }}
                                    />
                                </Link>
                                <h3 className="fw-bold mt-2 mb-1" style={{ color: "#0F172A", fontSize: "22px" }}>
                                    Create Your Account
                                </h3>
                                <small className='text-secondary' style={{ fontSize: "13px" }}>
                                    Start practicing technical & behavioral mock sessions today.
                                </small>
                            </div>

                            {errorMsg && (
                                <div className="alert alert-danger py-2 px-3 mb-3 d-flex align-items-center gap-2 rounded-3" style={{ fontSize: "13px" }}>
                                    <i className="bi bi-exclamation-circle-fill flex-shrink-0 text-danger"></i>
                                    <span>{errorMsg}</span>
                                </div>
                            )}

                            <form onSubmit={handleSubmit} noValidate>
                                <div className="mb-3">
                                    <label htmlFor="signup-username" className="form-label fw-semibold" style={{ fontSize: "13px", color: "#334155" }}>
                                        Full Name or Username
                                    </label>
                                    <div className='input-group'>
                                        <span className='input-group-text bg-white text-muted border-end-0 ps-3 pe-2'>
                                            <FiUser size={16} />
                                        </span>
                                        <input
                                            type="text"
                                            name="username"
                                            value={formData.username}
                                            onChange={handleChange}
                                            className="form-control py-2.5 ps-1 border-start-0 shadow-none"
                                            id="signup-username"
                                            placeholder="e.g. Alex Morgan"
                                            required
                                            autoComplete="name"
                                            style={{ fontSize: "14px", borderColor: "#CBD5E1" }}
                                        />
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="signup-email" className="form-label fw-semibold" style={{ fontSize: "13px", color: "#334155" }}>
                                        Email Address
                                    </label>
                                    <div className='input-group'>
                                        <span className='input-group-text bg-white text-muted border-end-0 ps-3 pe-2'>
                                            <FiMail size={16} />
                                        </span>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="form-control py-2.5 ps-1 border-start-0 shadow-none"
                                            id="signup-email"
                                            placeholder="alex@example.com"
                                            required
                                            autoComplete="email"
                                            style={{ fontSize: "14px", borderColor: "#CBD5E1" }}
                                        />
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="signup-password" className="form-label fw-semibold" style={{ fontSize: "13px", color: "#334155" }}>
                                        Password (Min. 6 characters)
                                    </label>
                                    <div className='input-group'>
                                        <span className='input-group-text bg-white text-muted border-end-0 ps-3 pe-2'>
                                            <FiLock size={16} />
                                        </span>
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            name="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            id="signup-password"
                                            className="form-control py-2.5 ps-1 border-start-0 border-end-0 shadow-none"
                                            placeholder='At least 6 characters'
                                            required
                                            autoComplete="new-password"
                                            style={{ fontSize: "14px", borderColor: "#CBD5E1" }}
                                        />
                                        <button
                                            type="button"
                                            className="input-group-text bg-white text-muted border-start-0 pe-3 ps-2"
                                            onClick={() => setShowPassword(!showPassword)}
                                            aria-label={showPassword ? "Hide password" : "Show password"}
                                            style={{ cursor: "pointer", borderColor: "#CBD5E1" }}
                                        >
                                            {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                                        </button>
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="signup-confirmPassword" className="form-label fw-semibold" style={{ fontSize: "13px", color: "#334155" }}>
                                        Confirm Password
                                    </label>
                                    <div className='input-group'>
                                        <span className='input-group-text bg-white text-muted border-end-0 ps-3 pe-2'>
                                            <FiLock size={16} />
                                        </span>
                                        <input
                                            type={showConfirmPassword ? "text" : "password"}
                                            name="confirmPassword"
                                            value={formData.confirmPassword}
                                            onChange={handleChange}
                                            id="signup-confirmPassword"
                                            className="form-control py-2.5 ps-1 border-start-0 border-end-0 shadow-none"
                                            placeholder='Repeat your password'
                                            required
                                            autoComplete="new-password"
                                            style={{ fontSize: "14px", borderColor: "#CBD5E1" }}
                                        />
                                        <button
                                            type="button"
                                            className="input-group-text bg-white text-muted border-start-0 pe-3 ps-2"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
                                            style={{ cursor: "pointer", borderColor: "#CBD5E1" }}
                                        >
                                            {showConfirmPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                                        </button>
                                    </div>
                                </div>

                                <button
                                    type='submit'
                                    className="btn w-100 py-3 mt-3 text-white fw-semibold d-inline-flex align-items-center justify-content-center gap-2 shadow-sm"
                                    style={{
                                        background: loading ? "#80CBC4" : "linear-gradient(135deg,#0F9D9A,#3CC8C3)",
                                        border: "none",
                                        borderRadius: "12px",
                                        fontSize: "15px"
                                    }}
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <>
                                            <span className="spinner-border spinner-border-sm" role="status"></span>
                                            Creating Account...
                                        </>
                                    ) : (
                                        <>
                                            <span>Create Free Account</span>
                                            <FiArrowRight size={16} />
                                        </>
                                    )}
                                </button>

                                <div className="text-center mt-3" style={{ fontSize: "13px" }}>
                                    <span className='text-secondary'>Already have an account? </span>
                                    <Link to="/login" style={{ color: "#0F9D9A", fontWeight: "600", textDecoration: "none" }}>
                                        Sign in here
                                    </Link>
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
