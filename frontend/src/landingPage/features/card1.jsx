import React from 'react';

function Card1() {
    return ( 
        <div className='container text-center mt-3'>
            <small className='mt-3' style={{  border : "1px solid #1a8f8b", borderRadius : "999px",padding : "3px 10px",  fontSize : "15px" , fontWeight :"600" ,background : "#DDF4F6", color :"#1a8f8b"}}>Powerful Features</small>
            <h3 className='mt-2' style={{fontSize : "20px" , fontWeight :"600"}}>Everything You need to Ace Your Interview</h3>
            <div className='row '>
                <div className='col d-flex align-items-center mt-3'>
                    <div className='card me-3' style={{width : "18rem " , border : "1px solid #1a8f8b" , boxShadow : "0 8px 20px rgba(105 , 213 , 233)"}}>
                        <div className='card-body'>
                            <i className="bi bi-stars" style={{fontSize:"40px" , fontWeight : "400", color : "#3CC8C3"}}></i>
                            <h5 className='card-title'>AI Interview Simulation</h5>
                            <h6 className='card-subtitle mb-2 text-body-secondary'>Realistic AI-Powered interviews <br/>tailored to your role and <br/> experience.</h6>
                        </div>
                    </div>

                    <div className='card me-3 ' style={{width : "18rem" , border : "1px solid #1a8f8b" , boxShadow : "0 8px 20px rgba(105 , 213 , 233)"}}>
                        <div className='card-body'>
                            <i className="bi bi-mic" style={{fontSize:"40px" , fontWeight : "400", color : "#3CC8C3"}}></i>
                            <h5 className='card-title'>Voice & Text Answering</h5>
                            <h6 className='card-subtitle mb-2 text-body-secondary'>Answer By speaking or typing <br/>Our AI-Pilot understands and <br/> evaluates your responses.</h6>
                        </div>
                    </div>

                    <div className='card me-3 ' style={{width : "18rem" , border : "1px solid #1a8f8b" , boxShadow : "0 8px 20px rgba(105 , 213 , 233)"}}>
                        <div className='card-body'>
                            <i className="bi bi-clock" style={{fontSize:"40px" , fontWeight : "400", color : "#3CC8C3"}}></i>
                            <h5 className='card-title'>AI Evaluation Engine</h5>
                            <h6 className='card-subtitle mb-2 text-body-secondary'>Advances AI model evaluats<br/> your answers fairly and provide <br/> accurate scores.</h6>
                        </div>
                    </div>

                    <div className='card me-3 ' style={{width : "18rem" , border : "1px solid #1a8f8b" , boxShadow : "0 8px 20px rgba(105 , 213 , 233)"}}>
                        <div className='card-body'>
                            <i className="bi bi-file-earmark-text" style={{fontSize:"40px" , fontWeight : "400", color : "#3CC8C3"}}></i>
                            <h5 className='card-title'>Detailed Feedback</h5>
                            <h6 className='card-subtitle mb-2 text-body-secondary'>Get in-depth feedback with<br/>strengths , weaknesses and<br/> improvement tips.</h6>
                        </div>
                    </div>
                </div>
            </div>
        </div>
     );
}

export default Card1;