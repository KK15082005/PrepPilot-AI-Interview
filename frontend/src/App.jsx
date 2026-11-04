import { Route, Routes, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './landingPage/Navbar';
import LandingPage from './pages/LandingPage';
import Features from './landingPage/features/features';
import WorkFlow from './landingPage/workFlow/workflowpage';
import Pricing from './landingPage/pricing/Pricing';
import Resoources from './landingPage/resources/resouces';
import AboutUs from './landingPage/aboutUs/AboutUs';
import SignUpPage from './pages/SignUpPage';
import NotFoundPage from './pages/NotFoundPage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import CreateInterview from './pages/CreateInterviewPage';
import Interview from './pages/Interview';
import ResultPage from './pages/ResultPage';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const location = useLocation();

  // Show public marketing navbar on marketing & auth pages; hide on candidate workspace screens
  const isWorkspaceRoute =
    location.pathname.startsWith('/dashboard') ||
    location.pathname.startsWith('/createinterview') ||
    location.pathname.startsWith('/interview');

  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3800,
          style: {
            background: "#0F172A",
            color: "#F8FAFC",
            fontSize: "14px",
            fontWeight: "500",
            borderRadius: "12px",
            padding: "12px 18px",
            boxShadow: "0 10px 25px -5px rgba(15, 23, 42, 0.25)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
          },
          success: {
            iconTheme: {
              primary: "#0F9D9A",
              secondary: "#FFFFFF",
            },
            style: {
              border: "1px solid rgba(15, 157, 154, 0.35)",
            },
          },
          error: {
            iconTheme: {
              primary: "#EF4444",
              secondary: "#FFFFFF",
            },
            style: {
              border: "1px solid rgba(239, 68, 68, 0.35)",
            },
          },
        }}
      />
      {!isWorkspaceRoute && <Navbar />}
      <Routes>
        {/* Public Routes */}
        <Route path='/' element={<LandingPage />} />
        <Route path='/feature' element={<Features />} />
        <Route path='/workflow' element={<WorkFlow />} />
        <Route path='/pricing' element={<Pricing />} />
        <Route path='/resources' element={<Resoources />} />
        <Route path='/about' element={<AboutUs />} />
        <Route path='/signup' element={<SignUpPage />} />
        <Route path='/login' element={<LoginPage />} />

        {/* Protected Routes (require authentication) */}
        <Route element={<ProtectedRoute />}>
          <Route path='/dashboard' element={<DashboardPage />} />
          <Route path='/createinterview' element={<CreateInterview />} />
          <Route path='/interview/:interviewId' element={<Interview />} />
          <Route path='/interview/:interviewId/result' element={<ResultPage />} />
        </Route>

        {/* 404 Not Found Route */}
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
