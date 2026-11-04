import React from 'react';
import Navbar from '../landingPage/Navbar';
import About from '../landingPage/About/About';
import Footer from '../landingPage/footer';

function LandingPage() {
    return (
        <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
            <Navbar />
            <main style={{ flex: 1 }}>
                <About />
            </main>
            <Footer />
        </div>
    );
}

export default LandingPage;
