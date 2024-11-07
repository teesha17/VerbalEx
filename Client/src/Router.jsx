import { Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './Pages/LoginPage';
import RegisterPage from './Pages/RegisterPage';
import HomePage from './Pages/HomePage';
import LandingPage from './Pages/LandingPage';

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage/>} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/home" element={<HomePage />} />
    </Routes>
  );
}

export default AppRouter;

//landing page --> signup/signin button /
//contact for pricing --> register button
//open bharat ocr --> login button

