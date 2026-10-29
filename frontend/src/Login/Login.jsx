import React, { useState } from 'react';
import "./Login.css";
import { MdEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import API from '../services/api';

function Login() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

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
            alert(error.response?.data?.message || "Login Failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='login'>
            <div className='login-card'>
                <form onSubmit={handleSubmit}>
                    <h1 className='text-center'>PrepPilot <span style={{ color: "#3CC8C3" }}>AI</span></h1>
                    <br />
                    <h2 className='text-center fw-bold'>Welcome back</h2>
                    <small className='text-secondary d-block text-center mb-4'>Login to continue your interview prep</small>

                    <div className="mb-3">
                        <div className='input-group'>
                            <span className='input-group-text' style={{ color: "#3CC8C3" }}><MdEmail /></span>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="form-control py-3"
                                placeholder="Enter Your email"
                                required
                            />
                        </div>
                    </div>

                    <div className='mb-3'>
                        <div className='input-group'>
                            <span className='input-group-text' style={{ color: "#3CC8C3" }}><FaLock /></span>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="form-control py-3"
                                placeholder='Enter your Password'
                                required
                            />
                        </div>
                    </div>

                    <button
                        type='submit'
                        className="btn w-100 py-3 mt-3 text-white fw-semibold d-flex align-items-center justify-content-center"
                        style={{ background: "linear-gradient(135deg,#27b3ae,#3CC8C3)", border: "none", borderRadius: "10px" }}
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                Logging in...
                            </>
                        ) : "Login"}
                    </button>

                    <div className="d-flex align-items-center my-4">
                        <hr className="flex-grow-1" />
                        <span className="mx-3 text-secondary">or continue with</span>
                        <hr className="flex-grow-1" />
                    </div>

                    <button type="button" className="btn btn-light border w-100 py-3 mb-2">
                        <img src="/google.jpg" width="22" className="me-2" alt="Google" />Continue with Google
                    </button>

                    <button type="button" className="btn btn-light border w-100 py-3 mb-2">
                        <img src="/github.svg" width="22" className="me-2" alt="GitHub" />Continue with Github
                    </button>

                    <br />
                    <h6 className='text-secondary text-center mt-3'>
                        Don't have an account? <span><Link to={"/signup"} style={{ color: "#27b3ae", fontWeight: "600" }}>Sign Up</Link></span>
                    </h6>
                </form>
            </div>
        </div>
    );
}

export default Login;
