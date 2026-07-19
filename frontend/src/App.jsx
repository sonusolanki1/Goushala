import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import AboutPage from './pages/AboutPage';
import SevaPage from './pages/SevaPage';
import ContactPage from './pages/ContactPage';
import DonatePage from './pages/DonatePage';
import UpdatesPage from './pages/UpdatesPage';
import Success from './pages/Success';
import Cancel from './pages/Cancel';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import { recordPageView } from './utils/analytics';

// Auto-track path changes inside React Router
function RouteTracker() {
  const location = useLocation();
  useEffect(() => {
    recordPageView(location.pathname);
    // Auto-scroll to top on route change
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location]);
  return null;
}

// Wrapper for public website pages to share the Navbar & Footer layout
function PublicLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col justify-between">
      <Navbar />
      {/* Top spacing to offset the fixed nav header on non-home pages */}
      <div className="flex-1 flex flex-col pt-[72px] md:pt-[84px] first:pt-0">
        {children}
      </div>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <RouteTracker />
      <Routes>
        {/* We override home page routing because it does not need top padding (hero covers full screen) */}
        <Route path="/" element={
          <div className="min-h-screen flex flex-col justify-between">
            <Navbar />
            <Home />
            <Footer />
          </div>
        } />

        <Route path="/about" element={
          <PublicLayout>
            <AboutPage />
          </PublicLayout>
        } />

        <Route path="/seva" element={
          <PublicLayout>
            <SevaPage />
          </PublicLayout>
        } />

        <Route path="/contact" element={
          <PublicLayout>
            <ContactPage />
          </PublicLayout>
        } />

        <Route path="/updates" element={
          <PublicLayout>
            <UpdatesPage />
          </PublicLayout>
        } />

        <Route path="/donate" element={
          <PublicLayout>
            <DonatePage />
          </PublicLayout>
        } />

        {/* Donation Redirection Callbacks */}
        <Route path="/donation-success" element={<Success />} />
        <Route path="/donation-cancel" element={<Cancel />} />

        {/* Hidden Admin Portal */}
        <Route path="/seva-trust/admin/login" element={<AdminLogin />} />
        <Route path="/seva-trust/admin/dashboard" element={<AdminDashboard />} />

        {/* Fallback to Home */}
        <Route path="*" element={
          <div className="min-h-screen flex flex-col justify-between">
            <Navbar />
            <Home />
            <Footer />
          </div>
        } />
      </Routes>
    </Router>
  );
}
