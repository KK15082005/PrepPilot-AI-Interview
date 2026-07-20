import React from 'react';
import Navbar from '../landingPage/navbar';
import Footer from '../landingPage/footer';
import NotFound from '../NotFound';

function NotFoundPage() {
    return (
        <>
            <Navbar/>
            <NotFound/>
            <Footer/>
        </>
    );
}

export default NotFoundPage;