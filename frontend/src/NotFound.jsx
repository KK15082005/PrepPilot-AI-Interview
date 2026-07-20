import React from 'react';

function NotFound() {
    return (
        <div className="Container p-5">
            <div className="row text-center">
                <h1 className="mt-5" style={{color : "#3CC8C3"}}>404 Not Found Error</h1>
                <p >Sorry ! The Page you are looking for does not exists.</p>
            </div>
        </div>
    );
}

export default NotFound;