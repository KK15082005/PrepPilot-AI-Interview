import React from 'react';
import "./hero.css";
function Hero() {
    return (
        <section className='container-fluid px-5 py-5' >
            <div className="row align-items-center">
                <div className='col-lg-5 '>
                    <h1 style={{ fontSize: "40px" , fontWeight : "600" , lineHeight :"1.1"}}>Practice Like <br/> It's Real.</h1>
                    <h1 style={{ fontSize: "50px" ,fontWeight : "700" , lineHeight :"1.1" ,color : "#3CC8C3"}}>Get Hired Like a Pro.</h1>
                    <p className='mb-7 mb-3' style={{color : "#475569" , fontSize : "20px " , lineHeight :1.4}}>
                        Practice realistic AI interview with voice or text , recieve 
                        intstant AI evaluation , detailed strengths , weakness , ideal 
                        answers , and personlised improvement recommendations
                        all in one platform.
                    </p>
                    <button type="button" className="btn btn-lg btn-primary me-3 mt-3" style={{fontWeight :"500",background : "linear-gradient(135deg , #0F9D9A 0%, #3CC8C3 100% ) ", border : "none"}}>
                        Start Free Interview <i className="bi bi-arrow-right"></i>
                    </button>
                    <button type="button" className="btn btn-lg btn-outline-info mt-3" style={{fontWeight :"500"}}><i className="bi bi-play-circle"></i>  Watch Demo</button>
                    <div className='d-flex gap-4 mt-3'>
                        <span style={{fontWeight : "500" , fontSize : "18px"}}><i className="bi bi-check-circle" style={{color: "#3CC8C3" , fontWeight : "700" , fontSize : "25px"}}> </i> No Credit Card </span>
                        <span style={{fontWeight : "500" , fontSize : "18px"}}><i className="bi bi-check-circle" style={{color: "#3CC8C3" , fontWeight : "700" , fontSize : "25px"}}></i> AI powered</span>
                        <span style={{fontWeight : "500" , fontSize : "18px"}}><i className="bi bi-check-circle" style={{color: "#3CC8C3" , fontWeight : "700" , fontSize : "25px"}}></i> Instant FeedBack</span>
                    </div>
                    <div className='d-flex mt-4'>
                            <img src='/user1.png' alt='USER1' className='trusted-img'/>
                            <img src='/user2.png' alt='USER2' className='trusted-img overlap'/>
                            <img src='/user3.png' alt='USER3' className='trusted-img overlap'/>
                        <div className='ms-3'>
                            <h6 className='mb-0 fw-bold' style={{color : "#3CC8C3"}} >Join 15,000+ learners</h6>
                            <small className='text-secondary'>who are growing every day</small>
                        </div>
                    </div>
                </div>
                <div className='col-lg-7 '>
                    <img src='/HomeHero.png' alt='Hero-img' className='img-fluid' style={{maxWidth : "90%"}} />
                </div>
            </div>
        </section>
    );
}

export default Hero;