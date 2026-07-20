import React from 'react';
import "./workflow.css"

function Workflow() {
    return ( 
        <section className='how-work py-5'>
            <div className='container text-center mt-3'>
                <small className='mt-3' style={{  border : "1px solid #1a8f8b", borderRadius : "999px",padding : "3px 10px",  fontSize : "15px" , fontWeight :"600" ,background : "#DDF4F6", color :"#1a8f8b"}}>How it works ? </small>
                <h3 className='mt-2' style={{fontSize : "20px" , fontWeight :"600"}}>Simple Steps to your Dream job</h3>
                <div className='row text-center mt-5'>
                    <div className='col-md-3 '>
                        <div className='step-circle' >1</div>
                        <i className="bi bi-briefcase"></i>
                        <h5>Choose Role</h5>
                        <p>Select Role and <br/> customise interview preferences.</p>
                    </div>

                    <div className='col-md-3'>
                        <div className='step-circle' >2</div>
                        <i className="bi bi-mic"></i>
                        <h5>Practice with AI</h5>
                        <p>Practice a real-time interview <br/>via voice or text.</p>
                    </div>

                    <div className='col-md-3'>
                        <div className='step-circle' >3</div>
                        <i class="bi bi-bar-chart"></i>
                        <h5>Recieve AI Evaluation</h5>
                        <p>Get instant AI evaluation , score and detailed Feedback.</p>
                    </div>

                    <div className='col-md-3'>
                        <div className='step-circle' >4</div>
                        <i className="bi bi-bullseye"></i>
                        <h5>Improve & repeat</h5>
                        <p>Follow recommendations and <br/>improve with continuos practice.</p>
                    </div>
                </div>
            </div>
        </section>
     );
}

export default Workflow;