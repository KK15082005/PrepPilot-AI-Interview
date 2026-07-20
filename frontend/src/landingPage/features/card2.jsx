import React from 'react';

function Card2() {
    return (
        <div className='container text-center mt-3'>
            <div className='row mb-3'>
                <div className='col d-flex align-items-center mt-3'>
                    <div className='card me-3' style={{width : "18rem " , border : "1px solid #1a8f8b" , boxShadow : "0 8px 20px rgba(105 , 213 , 233)"}}>
                        <div className='card-body'>
                            <i  className="bi bi-graph-up-arrow" style={{fontSize:"40px" , fontWeight : "400", color : "#3CC8C3"}}></i>
                            <h5 className='card-title'>Performace Dashboard</h5>
                            <h6 className='card-subtitle mb-2 text-body-secondary'>Track your progress with<br/>beautiful analytics and performace<br/> insights. </h6>
                        </div>
                    </div>

                    <div className='card me-3 ' style={{width : "18rem" , border : "1px solid #1a8f8b" , boxShadow : "0 8px 20px rgba(105 , 213 , 233)"}}>
                        <div className='card-body'>
                            <i className="bi bi-file-earmark-person" style={{fontSize:"40px" , fontWeight : "400", color : "#3CC8C3"}}></i>
                            <h5 className='card-title'>Personalised Learning <br/> Path</h5>
                            <h6 className='card-subtitle mb-2 text-body-secondary'>Get a customiszed<br/>improvement plan based<br/>on your performace and goals.</h6>
                        </div>
                    </div>

                    <div className='card me-3 ' style={{width : "18rem" , border : "1px solid #1a8f8b" , boxShadow : "0 8px 20px rgba(105 , 213 , 233)"}}>
                        <div className='card-body'>
                            <i className="bi bi-file-earmark-pdf" style={{fontSize:"40px" , fontWeight : "400", color : "#3CC8C3"}}></i>
                            <h5 className='card-title'>Resume Based Questioms</h5>
                            <h6 className='card-subtitle mb-2 text-body-secondary'>Get questions tailored to your<br/> resume , skills and target role.</h6>
                        </div>
                    </div>

                    <div className='card me-3 ' style={{width : "18rem" , border : "1px solid #1a8f8b" , boxShadow : "0 8px 20px rgba(105 , 213 , 233)"}}>
                        <div className='card-body'>
                            <i className="bi bi-infinity" style={{fontSize:"40px" , fontWeight : "400", color : "#3CC8C3"}}></i>
                            <h5 className='card-title'>Ultimate Practice Sessions</h5>
                            <h6 className='card-subtitle mb-2 text-body-secondary'>Practice as much as you want <br/> no limits , no extra cost.</h6>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Card2;