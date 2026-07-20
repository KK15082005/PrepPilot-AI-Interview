import { useState } from 'react'
import {Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Features from './landingPage/features/features';
import WorkFlow from './landingPage/workFlow/workflowpage';
import Pricing from './landingPage/pricing/Pricing';
import Resoources from './landingPage/resources/resouces';
import AboutUs from './landingPage/aboutUs/AboutUs';
import SignUpPage from './pages/SignUpPage';
import NotFoundPage from './pages/NotFoundPage';
import LoginPage from './pages/LoginPage' ;
import DashboardPage from './pages/DashboardPage';
import CreateInterview from './pages/CreateInterviewPage';
import Interview from './pages/Interview';



function App(){
  return (
    <Routes>
      <Route path='/' element={<LandingPage/>}/>
      <Route path='/feature' element={<Features/>}/>
      <Route path='/workflow' element={<WorkFlow/>}/>
      <Route path='/pricing' element={<Pricing/>}/>
      <Route path='resources' element={<Resoources/>}/>
      <Route path='/about' element={<AboutUs/>}/>
      <Route path='/signup' element={<SignUpPage/>}/>
      <Route path='/login' element={<LoginPage/>}/>
      <Route path='/dashboard' element={<DashboardPage/>}/>
      <Route path='/createinterview' element={<CreateInterview/>}/>
      <Route path="/interview/:interviewId" element={<Interview/>}/>
      <Route path='*' element={<NotFoundPage/>}/>
    </Routes>
    
  );
}
export default App
