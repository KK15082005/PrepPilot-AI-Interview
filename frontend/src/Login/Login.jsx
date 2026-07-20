import React from 'react';
import "./Login.css";
import { MdEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import axios from "axios";
import { Link } from 'react-router-dom';
import { useState } from 'react';
import {useNavigate} from "react-router-dom";

function Login() {
    const navigate = useNavigate();
    const [formData , setFormData]=useState({
        email : "",
        password : "",
    });
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                "http://localhost:3000/api/auth/login",
                {
                    email: formData.email,
                    password: formData.password,
                }
            );
            alert("Login Successfull !");
            localStorage.setItem("token" , response.data.accessToken);
            localStorage.setItem("user" , JSON.stringify(response.data.user));
            navigate("/dashboard");

        } catch (error) {
            console.log(error.response?.data || error.message);
            alert(error.response?.data?.message || "Login Failed");
        }
    };
    return (
        <div className='login'>
            <div className='login-card'>
                <form onSubmit={handleSubmit}>
                    <h1 className='text-center'>PrepPilot <span style={{color :"#3CC8C3"}}>AI</span></h1>
                    <br/>
                    <h1 className='text-center '>Welcome back </h1>
                    <small className='text-secondary d-block text-center mb-3'>Login to continue</small>

                    <div className="mb-3 ">
                        <div className='input-group'>
                            <span className='input-group-text' style={{color : "#3CC8C3"}}><MdEmail/></span>
                            <input type="email" name = "email" value={formData.email} onChange={handleChange} className="form-control py-3" id="exampleFormControlInput1"  placeholder= "Enter Your email "/>
                        </div>
                    </div>
                    <div className='mb-3'>
                        <div className='input-group'>
                            <span className='input-group-text' style={{color : "#3CC8C3"}}><FaLock/></span>
                            <input type="password" name = "password" value={formData.password} onChange={handleChange} id="inputPassword5" className="form-control py-3" aria-describedby="passwordHelpBlock"placeholder='Enter your Password'/>
                        </div>
                    </div>

                    <button type='submit' className="btn w-100 py-3 mt-3" style={{background:"linear-gradient(135deg,#27b3ae,#3CC8C3)",border:"none",fontWeight:"600",borderRadius:"10px"}}>
                        Login
                    </button>

                    <div className="d-flex align-items-center my-4">

                        <hr className="flex-grow-1"/>
                        <span className="mx-3 text-secondary">
                            or continue with
                        </span>

                        <hr className="flex-grow-1"/>
                    </div>

                    <button className="btn btn-light border w-100 py-3 mb-2">
                        <img src="/google.jpg" width="22" className="me-2"/>Continue with Google
                    </button>

                    <button className="btn btn-light border w-100 py-3 mb-2">
                        <img src="/github.svg" width="22" className="me-2"/>Continue with Github
                    </button>
                    <br/>
                    <h6 className='text-secondary text-center mt-3'>Don't have an account? <span><Link to={"/signup"}>Sign Up</Link></span></h6>
                    
                </form>
            </div>
        </div>
    );
}

export default Login;