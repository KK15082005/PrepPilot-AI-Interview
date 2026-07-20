import React from 'react';
import { Link } from 'react-router-dom';

function Start() {
    return (
        <div className='container'>
            <div className='start text-center mb-3'style={{background : "#eff8f8" , borderRadius : "5%"}}>
                <div className='col-9'>
                    <h4 style={{fontWeight : "500"}}>Ready to ace your next interview ? </h4>
                    <small className='text-secondary' style={{fontSize : "18px"}}>Start your journey with PrepPilot AI today...</small>
                    
                    <Link>
                        <button type="button" className="btn btn-lg btn-primary me-3 mt-3" style={{fontWeight :"500",background : "linear-gradient(135deg , #0F9D9A 0%, #3CC8C3 100% ) ", border : "none"}}>
                            Get Started for Free
                        </button>
                        <small className='text-secondary' style={{textDecoration : "none"}}>No Credit Card required</small>
                    </Link>
                </div>                
            </div>
        </div>
    );
}

export default Start;