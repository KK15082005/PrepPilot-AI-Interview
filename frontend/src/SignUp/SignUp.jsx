import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaUser, FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import axios from "axios";

function SignUp() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        try {
            const response = await axios.post(
                "http://localhost:3000/api/auth/register",
                {
                    username: formData.username,
                    email: formData.email,
                    password: formData.password,
                }
            );

            console.log(response.data);
            alert("Registration Successful! Please login to continue.");

            setFormData({
                username: "",
                email: "",
                password: "",
                confirmPassword: ""
            });

            navigate("/login");

        } catch (error) {
            console.error(error.response?.data || error.message);
            alert(error.response?.data?.message || "Registration Failed");
        }
    };

    return (
        <div className="container-fluid">
            <div className='row align-items-center' style={{ minHeight: "100vh" }}>
                <div className="col-lg-6 mb-5 mt-0 text-center">
                    <img src="/signup-img.png" alt="signup" style={{ maxWidth: "100%", maxHeight: "100%" }} />
                </div>
                <div className="col-lg-6 mt-4">
                    <form onSubmit={handleSubmit} className="p-5 shadow-sm" style={{ background: "#fff", borderRadius: "20px", border: "1px solid #E8F4F4", maxWidth: "560px", margin: "0 auto" }}>
                        <h2 style={{ fontWeight: "600" }}>Create Your <span style={{ color: "#3CC8C3" }}>PrepPilot</span> Account</h2>
                        <small className='text-secondary'>Join thousands of learners and get interview ready</small>

                        <div className="mb-3 mt-4">
                            <label htmlFor="inputUsername" className="form-label" style={{ fontWeight: "500" }}>Username / Full Name</label>
                            <div className='input-group'>
                                <span className='input-group-text' style={{ color: "#3CC8C3" }}><FaUser /></span>
                                <input
                                    type="text"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    className="form-control py-3"
                                    id="inputUsername"
                                    placeholder="Enter your username or full name"
                                    required
                                />
                            </div>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="inputEmail" className="form-label" style={{ fontWeight: "500" }}>Email Address</label>
                            <div className='input-group'>
                                <span className='input-group-text' style={{ color: "#3CC8C3" }}><MdEmail /></span>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="form-control py-3"
                                    id="inputEmail"
                                    placeholder="Enter your email (name@example.com)"
                                    required
                                />
                            </div>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="inputPassword" className="form-label" style={{ fontWeight: "500", color: "#000000" }}>Password</label>
                            <div className='input-group'>
                                <span className='input-group-text' style={{ color: "#3CC8C3" }}><FaLock /></span>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    id="inputPassword"
                                    className="form-control py-3"
                                    aria-describedby="passwordHelpBlock"
                                    placeholder='Create a Password'
                                    required
                                />
                            </div>
                            <div id="passwordHelpBlock" className="form-text">
                                Your password must be at least 6 characters long.
                            </div>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="inputConfirmPassword" className="form-label" style={{ fontWeight: "500", color: "#000000" }}>Confirm Password</label>
                            <div className='input-group'>
                                <span className='input-group-text' style={{ color: "#3CC8C3" }}><FaLock /></span>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    id="inputConfirmPassword"
                                    className="form-control py-3"
                                    placeholder='Confirm your Password'
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-check mt-3">
                            <input className="form-check-input" type="checkbox" id="checkDefault" required />
                            <label className="form-check-label" htmlFor="checkDefault">
                                I agree to the <span style={{ color: "#3CC8C3" }}> Terms of Service</span> and <span style={{ color: "#3CC8C3" }}>Privacy Policy</span>
                            </label>
                        </div>

                        <button
                            type='submit'
                            className="btn w-100 py-3 mt-4 text-white"
                            style={{ background: "linear-gradient(135deg,#27b3ae,#3CC8C3)", border: "none", fontWeight: "600", borderRadius: "10px" }}
                        >
                            Create Account
                        </button>

                        <h6 className='text-secondary text-center mt-3'>
                            Already have an account? <span><Link to="/login" style={{ color: "#27b3ae", textDecoration: "none", fontWeight: "600" }}>Login</Link></span>
                        </h6>
                    </form>

                    <div className="d-flex align-items-center my-4" style={{ maxWidth: "560px", margin: "0 auto" }}>
                        <hr className="flex-grow-1" />
                        <span className="mx-3 text-secondary">or continue with</span>
                        <hr className="flex-grow-1" />
                    </div>

                    <div style={{ maxWidth: "560px", margin: "0 auto" }}>
                        <button className="btn btn-light border w-100 py-3 mb-2 d-flex align-items-center justify-content-center">
                            <img src="/google.jpg" width="22" className="me-2" alt="Google" />Continue with Google
                        </button>
                        <button className="btn btn-light border w-100 py-3 mb-2 d-flex align-items-center justify-content-center">
                            <img src="/github.svg" width="22" className="me-2" alt="GitHub" />Continue with Github
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignUp;
