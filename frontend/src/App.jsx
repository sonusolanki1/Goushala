import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
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

// Import newly created pages
import CowsPage from './pages/CowsPage';
import GalleryPage from './pages/GalleryPage';
import EventsPage from './pages/EventsPage';
import NewsPage from './pages/NewsPage';
import VolunteersPage from './pages/VolunteersPage';
import MembershipPage from './pages/MembershipPage';
import AdoptionPage from './pages/AdoptionPage';
import FAQPage from './pages/FAQPage';
import PrivacyPage from './pages/PrivacyPage';
import TermsPage from './pages/TermsPage';
import NotFoundPage from './pages/NotFoundPage';

import { recordPageView } from './utils/analytics';

// Stunning preloader screen to load before the website opens
function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 500);
          return 100;
        }
        const increment = Math.floor(Math.random() * 15) + 5;
        return Math.min(prev + increment, 100);
      });
    }, 120);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.03 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-stone-950 text-white select-none overflow-hidden"
    >
      {/* Dynamic glow blobs */}
      <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-brand-gold-500/10 rounded-full blur-[100px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-600/5 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />

      <div className="relative z-10 flex flex-col items-center max-w-sm px-6 text-center">
        {/* Animated Sacred Mandala / Lotus Circular Graphic */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="relative w-24 h-24 mb-8 flex items-center justify-center"
        >
          {/* Rotating exterior ring */}
          <motion.svg
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-0 w-full h-full text-brand-gold-500/30"
            viewBox="0 0 100 100"
          >
            <circle cx="50" cy="50" r="44" stroke="currentColor" strokeWidth="1.5" strokeDasharray="6 8" fill="none" />
            <circle cx="50" cy="50" r="38" stroke="currentColor" strokeWidth="0.75" strokeDasharray="3 4" fill="none" />
          </motion.svg>
          
          {/* Pulsing glow ring */}
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute w-16 h-16 rounded-full border-2 border-brand-gold-500/40 bg-brand-gold-500/5 flex items-center justify-center shadow-lg shadow-brand-gold-500/10"
          />

          {/* Heart/Seva SVG Icon */}
          <motion.svg
            className="w-8 h-8 text-brand-gold-500 relative z-10"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            animate={{ scale: [0.95, 1.05, 0.95] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
          </motion.svg>
        </motion.div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-1 mb-6"
        >
          <h1 className="text-lg font-serif font-bold text-white tracking-wide">
            Krishna Govind Seva NGO
          </h1>
          <span className="text-[9px] text-brand-gold-400 font-mono tracking-widest uppercase block">
            Goushala & Sanctuary
          </span>
        </motion.div>

        {/* Sanskrit quote with translation */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ duration: 1.2, delay: 0.4 }}
          className="text-[11px] font-serif italic text-stone-300 mb-8 leading-relaxed"
        >
          "गावो विश्वस्य मातरः"<br />
          <span className="text-[8px] font-sans uppercase tracking-widest text-stone-400 font-semibold block mt-1">(Cows are the mothers of the universe)</span>
        </motion.p>

        {/* Loading Progress Bar */}
        <div className="w-48 bg-stone-900 h-[2px] rounded-full overflow-hidden relative mb-3">
          <motion.div 
            className="bg-gradient-to-r from-brand-gold-400 to-amber-500 h-full rounded-full" 
            style={{ width: `${progress}%` }}
            transition={{ ease: 'easeOut', duration: 0.1 }}
          />
        </div>

        {/* Status Percentage */}
        <motion.span className="text-[9px] font-mono text-zinc-500 font-bold uppercase tracking-wider">
          Connecting to Sanctuary System... {progress}%
        </motion.span>
      </div>
    </motion.div>
  );
}

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
  const [isPreloading, setIsPreloading] = useState(true);

  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <RouteTracker />
      
      <AnimatePresence mode="wait">
        {isPreloading && (
          <Preloader key="preloader" onComplete={() => setIsPreloading(false)} />
        )}
      </AnimatePresence>

      <Routes>
        {/* Home page route */}
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

        {/* New Public Pages */}
        <Route path="/cows" element={
          <PublicLayout>
            <CowsPage />
          </PublicLayout>
        } />

        <Route path="/gallery" element={
          <PublicLayout>
            <GalleryPage />
          </PublicLayout>
        } />

        <Route path="/events" element={
          <PublicLayout>
            <EventsPage />
          </PublicLayout>
        } />

        <Route path="/news" element={
          <PublicLayout>
            <NewsPage />
          </PublicLayout>
        } />

        <Route path="/volunteers" element={
          <PublicLayout>
            <VolunteersPage />
          </PublicLayout>
        } />

        <Route path="/membership" element={
          <PublicLayout>
            <MembershipPage />
          </PublicLayout>
        } />

        <Route path="/adoption" element={
          <PublicLayout>
            <AdoptionPage />
          </PublicLayout>
        } />

        <Route path="/faq" element={
          <PublicLayout>
            <FAQPage />
          </PublicLayout>
        } />

        <Route path="/privacy" element={
          <PublicLayout>
            <PrivacyPage />
          </PublicLayout>
        } />

        <Route path="/terms" element={
          <PublicLayout>
            <TermsPage />
          </PublicLayout>
        } />

        {/* Donation Redirection Callbacks */}
        <Route path="/donation-success" element={<Success />} />
        <Route path="/donation-cancel" element={<Cancel />} />

        {/* Hidden Admin Portal */}
        <Route path="/seva-trust/admin/login" element={<AdminLogin />} />
        <Route path="/seva-trust/admin/dashboard" element={<AdminDashboard />} />

        {/* Fallback to 404 Page */}
        <Route path="*" element={
          <PublicLayout>
            <NotFoundPage />
          </PublicLayout>
        } />
      </Routes>
    </Router>
  );
}
