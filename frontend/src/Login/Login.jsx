import React, { useState } from 'react';
import "./Login.css";
import { FiMail, FiLock, FiEye, FiEyeOff, FiArrowRight } from "react-icons/fi";
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import API from '../services/api';

function Login() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        setErrorMsg("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrorMsg("");

        try {
            const response = await API.post("/auth/login", {
                email: formData.email,
                password: formData.password,
            });

            localStorage.setItem("token", response.data.accessToken);
            localStorage.setItem("user", JSON.stringify(response.data.user));

            const username = response.data?.user?.username || "Candidate";
            toast.success(`Welcome back, ${username}!`);
            navigate("/dashboard");

        } catch (error) {
            console.error("Login Error:", error.response?.data || error.message);
            const msg = error.response?.data?.message || "Invalid email or password. Please try again.";
            setErrorMsg(msg);
            toast.error(msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='login'>
            <div className='login-card'>
                {/* Brand Header */}
                <div className="text-center mb-4">
                    <Link to="/" className="text-decoration-none d-inline-flex align-items-center gap-2 mb-2">
                        <span
                            style={{
                                width: "34px",
                                height: "34px",
                                background: "linear-gradient(135deg, #0F9D9A 0%, #3CC8C3 100%)",
                                borderRadius: "9px",
                                display: "inline-flex",
                                alignItems: "center",
                                justifyContent: "center",
                                color: "#fff",
                                fontSize: "16px",
                                boxShadow: "0 2px 8px rgba(15, 157, 154, 0.25)"
                            }}
                        >
                            ⚡
                        </span>
                        <h4 className="fw-bold mb-0" style={{ color: "#0F172A", fontSize: "1.3rem" }}>
                            PrepPilot <span style={{ color: "#0F9D9A" }}>AI</span>
                        </h4>
                    </Link>
                    <h3 className='fw-bold mt-2 mb-1' style={{ color: "#0F172A", fontSize: "22px" }}>
                        Welcome Back
                    </h3>
                    <small className='text-secondary' style={{ fontSize: "13px" }}>
                        Sign in to resume your mock interview preparation
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
                        <label htmlFor="login-email" className="form-label fw-semibold" style={{ fontSize: "13px", color: "#334155" }}>
                            Email Address
                        </label>
                        <div className='input-group'>
                            <span className='input-group-text bg-white text-muted border-end-0 ps-3 pe-2'>
                                <FiMail size={16} />
                            </span>
                            <input
                                id="login-email"
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="form-control py-2.5 ps-1 border-start-0 shadow-none"
                                placeholder="name@example.com"
                                required
                                autoComplete="email"
                                style={{ fontSize: "14px", borderColor: "#CBD5E1" }}
                            />
                        </div>
                    </div>

                    <div className='mb-3'>
                        <div className="d-flex justify-content-between align-items-center mb-1">
                            <label htmlFor="login-password" className="form-label fw-semibold mb-0" style={{ fontSize: "13px", color: "#334155" }}>
                                Password
                            </label>
                        </div>
                        <div className='input-group'>
                            <span className='input-group-text bg-white text-muted border-end-0 ps-3 pe-2'>
                                <FiLock size={16} />
                            </span>
                            <input
                                id="login-password"
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="form-control py-2.5 ps-1 border-start-0 border-end-0 shadow-none"
                                placeholder='Enter your password'
                                required
                                autoComplete="current-password"
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

                    <button
                        type='submit'
                        className="btn w-100 py-3 mt-3 text-white fw-semibold d-inline-flex align-items-center justify-content-center gap-2 shadow-sm"
                        style={{
                            background: loading ? "#80CBC4" : "linear-gradient(135deg, #0F9D9A, #3CC8C3)",
                            border: "none",
                            borderRadius: "12px",
                            fontSize: "15px"
                        }}
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                Signing in...
                            </>
                        ) : (
                            <>
                                <span>Sign In to Dashboard</span>
                                <FiArrowRight size={16} />
                            </>
                        )}
                    </button>

                    <div className="text-center mt-4" style={{ fontSize: "13px" }}>
                        <span className='text-secondary'>Don't have an account? </span>
                        <Link to="/signup" style={{ color: "#0F9D9A", fontWeight: "600", textDecoration: "none" }}>
                            Create one for free
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
