import React from 'react';
 
function Trust() {
    return ( 
        <div className='container '>
            <div className='row  rounded p-4' style={{background : "#DDF4F6"}}>
                <div className='col d-flex align-items-center' >
                    <i class="bi bi-people" style={{fontSize : "48px" , color : "#3CC8C3"}}></i>
                    <div >
                        <h4 className='mb-0 m-3' >  15,000+</h4>
                        <small className='text-secondary m-3'>  Mock Interviews</small>
                    </div>
                </div>
                <div className='col d-flex align-items-center' >
                    <i class="bi bi-graph-up-arrow" style={{fontSize : "48px" , color : "#3CC8C3"}}></i>
                    <div>
                        <h4 className='mb-0 m-3'> 95%</h4>
                        <small className='text-secondary m-3'>Improvement Rate</small>
                    </div>
                </div>
                <div className='col d-flex align-items-center'>
                    <i class="bi bi-clock-history " style={{fontSize : "48px" , color : "#3CC8C3"}}></i>
                    <div>
                        <h4 className='mb-0 m-3'> 24X7</h4>
                         <small className='text-secondary m-3'>AI Availability</small>
                    </div>
                </div>
                <div className='col d-flex align-items-center'>
                    <i class="bi bi-briefcase" style={{fontSize : "48px" , color : "#3CC8C3"}}></i>
                    <div>
                        <h4 className='mb-0 m-3'> 50+</h4>
                        <small className='text-secondary m-3'>Interview Roles</small>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Trust;