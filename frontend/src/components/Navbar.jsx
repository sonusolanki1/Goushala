import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Heart } from 'lucide-react';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Gau Seva Plans', href: '/seva' },
    { name: 'Daily Updates', href: '/updates' },
    { name: 'Contact', href: '/contact' }
  ];

  const isLinkActive = (href) => {
    if (href === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(href);
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-900/60 py-3.5 shadow-lg transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo Link to Home */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="bg-brand-gold-500/10 p-1.5 rounded-full border border-brand-gold-500/20 group-hover:scale-105 transition-all duration-300">
              <svg className="w-7 h-7 text-brand-gold-500 transition-transform duration-500 group-hover:rotate-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="12" r="10" strokeDasharray="3 2" className="animate-spin-slow opacity-60" />
                <path d="M12 17a5 5 0 0 0 5-5c0-3-2.5-4.5-5-6-2.5 1.5-5 3-5 6a5 5 0 0 0 5 5z" fill="currentColor" className="opacity-20" />
                <path d="M12 6c-1.5-2-3-2-3 0 0 2 2 3.5 3 4.5 1-1 3-2.5 3-4.5 0-2-1.5-2-3 0z" />
                <path d="M9 12.5c-.8 0-1.5-.5-1.5-1.2 0-1 .8-1.8 1.8-1.8.5 0 .9.2 1.2.5" />
                <path d="M15 12.5c.8 0 1.5-.5 1.5-1.2 0-1-.8-1.8-1.8-1.8-.5 0-.9.2-1.2.5" />
              </svg>
            </div>
            <div>
              <span className="font-serif font-bold text-lg md:text-xl block tracking-tight text-white">
                Krishna Govind
              </span>
              <span className="text-[10px] uppercase tracking-wider block font-semibold -mt-1 text-brand-gold-500">
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
                      ? 'text-brand-gold-500 font-semibold' 
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
            
            <Link
              to="/donate"
              className="flex items-center space-x-2 bg-brand-gold-500 hover:bg-brand-gold-600 text-white px-5 py-2.5 rounded-full font-semibold shadow-md hover:scale-102 transition-all duration-300 text-sm group"
            >
              <Heart className="w-4 h-4 fill-white group-hover:scale-110 transition-transform" />
              <span>Donate Online</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md text-white hover:text-brand-gold-500 focus:outline-none"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-zinc-950 border-t border-zinc-900 flex flex-col py-4 px-6 space-y-4 shadow-xl">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`font-medium text-base transition-colors ${
                isLinkActive(link.href) ? 'text-brand-gold-500 font-semibold' : 'text-slate-350 hover:text-white'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <Link
            to="/donate"
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex items-center justify-center space-x-2 bg-brand-gold-500 hover:bg-brand-gold-600 text-white px-5 py-3 rounded-full font-semibold shadow-md text-base"
          >
            <Heart className="w-5 h-5 fill-white" />
            <span>Donate Online</span>
          </Link>
        </div>
      )}
    </nav>
  );
}
