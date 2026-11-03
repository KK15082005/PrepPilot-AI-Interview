import React, { useState } from 'react';
import "./Login.css";
import { MdEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import API from '../services/api';

function Login() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
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
            navigate("/dashboard");

        } catch (error) {
            console.error("Login Error:", error.response?.data || error.message);
            setErrorMsg(error.response?.data?.message || "Invalid email or password. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='login'>
            <div className='login-card'>
                <div className="text-center mb-4">
                    <Link to="/" className="text-decoration-none">
                        <h4 className="fw-bold mb-1" style={{ color: "#0F172A" }}>
                            PrepPilot <span style={{ color: "#0F9D9A" }}>AI</span>
                        </h4>
                    </Link>
                    <h3 className='fw-bold mt-2 mb-1' style={{ color: "#0F172A", fontSize: "22px" }}>
                        Welcome Back
                    </h3>
                    <small className='text-secondary'>
                        Log in to resume your mock interview preparation
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
                        <label className="form-label fw-semibold" style={{ fontSize: "14px" }}>
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
                                placeholder="name@example.com"
                                required
                            />
                        </div>
                    </div>

                    <div className='mb-3'>
                        <label className="form-label fw-semibold" style={{ fontSize: "14px" }}>
                            Password
                        </label>
                        <div className='input-group'>
                            <span className='input-group-text bg-light text-secondary border-end-0'><FaLock /></span>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="form-control py-2 ps-2 border-start-0"
                                placeholder='Enter your password'
                                required
                            />
                        </div>
                    </div>

                    <button
                        type='submit'
                        className="btn w-100 py-3 mt-3 text-white fw-semibold d-flex align-items-center justify-content-center shadow-sm"
                        style={{ background: "linear-gradient(135deg,#0F9D9A,#3CC8C3)", border: "none", borderRadius: "10px" }}
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                Logging in...
                            </>
                        ) : "Sign In to Dashboard"}
                    </button>

                    <div className="text-center mt-4" style={{ fontSize: "14px" }}>
                        <span className='text-secondary'>Don't have an account? </span>
                        <Link to="/signup" style={{ color: "#0F9D9A", fontWeight: "600" }}>Create one for free</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
