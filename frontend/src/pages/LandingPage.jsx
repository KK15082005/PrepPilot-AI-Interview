import React from 'react';
import About from '../landingPage/About/About';
import Footer from '../landingPage/footer';

function LandingPage() {
    return (
        <div style={{ minHeight: "calc(100vh - 66px)", display: "flex", flexDirection: "column" }}>
            <main style={{ flex: 1 }}>
                <About />
            </main>
            <Footer />
        </div>
    );
}

export default LandingPage;
