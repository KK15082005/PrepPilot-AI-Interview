import React from 'react';

function Feedback() {
    return (
        <div className='container align-text-center'>
            <div className='row'>
                <div className='col-lg-6'>
                    <h1>Feedback that helps <br/> you become better.</h1>
                    <p className='text-secondary'>Our AI-Pilot doesn't just give you score , <br/> it helps you understand how to improve.</p>
                    <button type="button" className="btn btn-lg btn-primary me-3 mt-3" style={{fontWeight :"500",background : "linear-gradient(135deg , #0F9D9A 0%, #3CC8C3 100% ) ", border : "none"}}>
                        Try it Yourself <i className="bi bi-arrow-right"></i>
                    </button>
                </div>
                <div className='col-lg-6'>
                    <img src='/feedback.png' style={{maxWidth: " 100%" , maxHeight : "90%"}}/>
                </div>
            </div>

        </div>
    );
}

export default Feedback;