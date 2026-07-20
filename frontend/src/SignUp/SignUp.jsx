import React from 'react';
import { useState } from 'react';
import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import axios from "axios";

function SignUp() {
    const [formData , setFormData]=useState({
        username :"",
        email : "",
        password : "",
        confirmPassword : ""
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
            alert("Registration Successful!");

            setFormData({
                username: "",
                email: "",
                password: "",
                confirmPassword: ""
            });

        } catch (error) {
            console.log(error.response?.data || error.message);
            alert(error.response?.data?.message || "Registration Failed");
        }
    };
    return (
        
        <div className="container-fluid ">
            <div className='row align-items-center  ' style={{minHeight:"100vh"}}>
                
                <div className="col-lg-6 mb-5 mt-0">
                    <img  src="/signup-img.png" alt="signup" style={{maxWidth :"100%", maxHeight:"100%"}} />
                </div>
                <div className="col-lg-6 mt-5">
                    <form onSubmit={handleSubmit} className="p-5 shadow-sm "style={{background:"#fff",borderRadius:"20px",border:"1px solid #E8F4F4",maxWidth:"560px"}}>
                        <h2 style={{fontWeight : "600"}}>Create Your <span style={{color :"#3CC8C3"}}>PrepPilot</span> Account</h2>
                        <small className='text-secondary'>Join thousands of learners and get interview ready</small>
                        <div className="mb-3 mt-3">
                            <label htmlFor="exampleFormControlInput1" className="form-label" style={{fontWeight : "500"}}>Full Name</label>
                            <div className='input-group'>
                                <span className='input-group-text' style={{color : "#3CC8C3"}}><FaUser/></span>
                                <input type="text" name = "username" value={formData.name} onChange={handleChange} className="form-control py-3" id="exampleFormControlInput1"  placeholder= "Enter Your Full name"/>
                            </div>
                            </div>
                            <div className="mb-3">
                            
                        </div>

                        <div className="mb-3 ">
                            <label htmlFor="exampleFormControlInput2" className="form-label" style={{fontWeight : "500"}}>Email Address</label>
                            <div className='input-group'>
                                <span className='input-group-text' style={{color : "#3CC8C3"}}><MdEmail/></span>
                                <input type="email" name = "email" value={formData.email} onChange={handleChange} className="form-control py-3" id="exampleFormControlInput2"  placeholder= "Enter Your email ('name@example.com')"/>
                            </div>
                            </div>
                            <div className="mb-3">
                        </div>

                        <label htmlFor="inputPassword5" className="form-label" style={{fontWeight : "500" , color : "#000000"}}>Password</label>
                        <div className='input-group'>
                            <span className='input-group-text' style={{color : "#3CC8C3"}}><FaLock/></span>
                            <input type="password" name = "password" value={FormData.password} onChange={handleChange}  id="inputPassword5" className="form-control py-3" aria-describedby="passwordHelpBlock"placeholder='Create a Password'/>
                        </div>
                        <div id="passwordHelpBlock" className="form-text">
                            Your password must be 8-20 characters long <br/>
                            Must contain letters ,numbers and one special character.
                        </div>
                        
                        <label htmlFor="inputPassword5" className="form-label mt-3" style={{fontWeight : "500" , color : "#000000"}}>Confirm Password</label>
                        <div className='input-group'>
                            <span className='input-group-text' style={{color : "#3CC8C3"}}><FaLock/></span>
                            <input type="password" name = "confirmPassword" value={formData.confirmPassword} onChange={handleChange}  id="inputPassword5" className="form-control py-3" aria-describedby="passwordHelpBlock"placeholder='Create a Password'/>
                        </div>
                        
                        

                        <div className="form-check mt-3">
                            <input className="form-check-input" type="checkbox" value="" id="checkDefault" />
                            <label className="form-check-label" htmlFor="checkDefault">
                                I agree to the <span style={{color :"#3CC8C3"}}> Terms of Service</span> and <span style={{color :"#3CC8C3"}}>Privacy Policy</span>
                            </label>
                        </div>
                        <button type='submit' className="btn w-100 py-3 mt-3" style={{background:"linear-gradient(135deg,#27b3ae,#3CC8C3)",border:"none",fontWeight:"600",borderRadius:"10px"}}>Create Account</button>
                    </form>

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
                </div>
            </div>
        </div>
    );
}

export default SignUp;