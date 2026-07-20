import React from 'react';
import Card1 from './card1';
import Card2 from './card2';
import Navbar from '../navbar';
import Footer from '../footer';

function Features() {
    return ( 
        <>
            <Navbar/>
            <Card1/>
            <Card2/>
            <Footer/>
        </>
    );
}

export default Features;