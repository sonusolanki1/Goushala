import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Heart } from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Our Mission', href: '/about' },
    { name: 'Gau Seva Options', href: '/seva' },
    { name: 'Daily Updates', href: '/updates' },
    { name: 'Contact Us', href: '/contact' },
  ];

  // Determine if the route matches (active state styling)
  const isLinkActive = (path) => {
    return location.pathname === path;
  };

  // Determine if Navbar is floating on white background vs transparent background
  // Home page starts with dark video backdrop, so when not scrolled, we want light text.
  // Other pages (about, contact, seva, donate) have light backgrounds, so we want dark text from the start!
  const isDarkTextNeeded = isScrolled || location.pathname !== '/';

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? 'glass-nav py-3 shadow-md' : 
      isDarkTextNeeded ? 'bg-white/95 border-b border-slate-100 py-4 shadow-sm' : 'bg-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo Link to Home */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="bg-amber-100 p-2 rounded-full border border-amber-300 group-hover:scale-105 transition-transform duration-300">
              <svg className="w-6 h-6 text-brand-gold-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H7c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.04-.42 1.99-1.07 2.75z"/>
              </svg>
            </div>
            <div>
              <span className={`font-serif font-bold text-lg md:text-xl block tracking-tight ${
                isDarkTextNeeded ? 'text-brand-green-700' : 'text-white'
              }`}>
                Krishna Govind
              </span>
              <span className={`text-[10px] uppercase tracking-wider block font-semibold -mt-1 ${
                isDarkTextNeeded ? 'text-amber-700' : 'text-amber-200'
              }`}>
                Seva Sansthan NGO
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => {
              const active = isLinkActive(link.href);
              return (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`text-sm font-medium transition-colors ${
                    active 
                      ? 'text-brand-gold-600 font-semibold' 
                      : isDarkTextNeeded 
                        ? 'text-slate-650 hover:text-brand-gold-500' 
                        : 'text-white/90 hover:text-white'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
            
            <Link
              to="/donate"
              className="flex items-center space-x-2 bg-gradient-to-r from-brand-gold-500 to-amber-600 text-white px-5 py-2.5 rounded-full font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 text-sm group"
            >
              <Heart className="w-4 h-4 fill-white group-hover:scale-110 transition-transform" />
              <span>Donate Online</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2 rounded-md ${
                isDarkTextNeeded ? 'text-slate-800' : 'text-white'
              }`}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden glass-nav absolute top-full left-0 w-full shadow-lg border-t border-slate-100 flex flex-col py-4 px-6 space-y-4">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`font-medium text-base transition-colors ${
                isLinkActive(link.href) ? 'text-brand-gold-600 font-semibold' : 'text-slate-700 hover:text-brand-gold-600'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <Link
            to="/donate"
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex items-center justify-center space-x-2 bg-gradient-to-r from-brand-gold-500 to-amber-600 text-white px-5 py-3 rounded-full font-semibold shadow-md text-base"
          >
            <Heart className="w-5 h-5 fill-white" />
            <span>Donate Online</span>
          </Link>
        </div>
      )}
    </nav>
  );
}
