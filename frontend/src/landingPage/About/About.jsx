import React from 'react';
import Hero from './Hero';
import Trust from './trust';
import FeatureCard1 from './FeatureCard1';
import FeatureCard2 from './FeatureCard2';
import Workflow from './Workflow';
import Feedback from './Feedback';
import Start from './Start';


function About() {
    return ( 
        <>
            <Hero/>
            <Trust/>
            <FeatureCard1/>
            <FeatureCard2/>
            <Workflow/>
            <Feedback/>
            <Start/>
        </>
    );
}

export default About;