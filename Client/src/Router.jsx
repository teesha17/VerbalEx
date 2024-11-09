import { Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './Pages/Login/LoginPage';
import RegisterPage from './Pages/Register/RegisterPage';
import LandingPage from './Pages/Home/LandingPage';
import PanCard from './Pages/Dashboard/PanCard';
import OCRApp from './Pages/Dashboard/FileUpload';
import Dashboard from './Pages/Dashboard/Dashboard';
import AadhaarOCR from './Pages/Dashboard/fRONTAdhar';

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage/>} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/pancard" element={<PanCard />} />
      <Route path="/vehicle" element={<OCRApp />} />
      <Route path="/adhar" element={<AadhaarOCR />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}

export default AppRouter;

//landing page --> signup/signin button /
//contact for pricing --> register button
//open bharat ocr --> login button

