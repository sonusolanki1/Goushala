import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Heart, ChevronDown, Camera, Calendar, BookOpen, Users, Award, HelpCircle, FileText } from 'lucide-react';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsDropdownOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    { name: 'Gau Seva Plans', href: '/seva' },
    { name: 'Our Cows', href: '/cows' },
    { name: 'Daily Log', href: '/updates' }
  ];

  const moreLinks = [
    { name: 'Media Gallery', href: '/gallery', desc: 'Photos & vlogs of shelter life', icon: <Camera className="w-4 h-4 text-brand-gold-500" /> },
    { name: 'Events & Festivals', href: '/events', desc: 'Gau Puja & volunteer camps', icon: <Calendar className="w-4 h-4 text-brand-gold-500" /> },
    { name: 'News & Research', href: '/news', desc: 'Blogs on cow protection science', icon: <BookOpen className="w-4 h-4 text-brand-gold-500" /> },
    { name: 'Volunteering', href: '/volunteers', desc: 'Register for selfless service', icon: <Users className="w-4 h-4 text-brand-gold-500" /> },
    { name: 'Memberships', href: '/membership', desc: 'Annual & lifetime programs', icon: <Award className="w-4 h-4 text-brand-gold-500" /> },
    { name: 'Adoption Guide', href: '/adoption', desc: 'Sponsor a cow virtually', icon: <Heart className="w-4 h-4 text-brand-gold-500" /> },
    { name: 'Help & FAQ', href: '/faq', desc: 'Answers to donation queries', icon: <HelpCircle className="w-4 h-4 text-brand-gold-500" /> }
  ];

  const isLinkActive = (href) => {
    if (href === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(href);
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled
        ? 'bg-white border-b border-stone-200/80 py-3 shadow-sm'
        : 'bg-white border-b border-transparent py-4'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">

          {/* Logo */}
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
              <span className="font-serif font-bold text-base md:text-lg block tracking-tight text-zinc-900">
                Krishna Govind
              </span>
              <span className="text-[9px] uppercase tracking-wider block font-bold -mt-1 text-brand-gold-500 font-sans">
                Seva Sansthan NGO
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center space-x-7">
            {navLinks.map((link) => {
              const active = isLinkActive(link.href);
              return (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`text-xs font-semibold uppercase tracking-wider transition-colors py-1 ${active
                    ? 'text-brand-gold-500 font-bold border-b border-brand-gold-500'
                    : 'text-zinc-600 hover:text-zinc-950'
                    }`}
                >
                  {link.name}
                </Link>
              );
            })}

            {/* More Dropdown Trigger */}
            {/* <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                onMouseEnter={() => setIsDropdownOpen(true)}
                className="flex items-center space-x-1 text-xs font-semibold uppercase tracking-wider text-zinc-650 hover:text-zinc-950 transition-colors py-1 cursor-pointer"
              >
                <span>Explore</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    onMouseLeave={() => setIsDropdownOpen(false)}
                    className="absolute right-0 mt-3 w-80 bg-white border border-stone-200 shadow-2xl rounded-2xl p-4 grid grid-cols-1 gap-2 z-50"
                  >
                    {moreLinks.map((link) => (
                      <Link
                        key={link.name}
                        to={link.href}
                        className="flex items-start space-x-3 p-2.5 rounded-xl hover:bg-stone-50 transition-colors"
                      >
                        <div className="bg-stone-50 border border-stone-200 p-2 rounded-lg shrink-0 mt-0.5">
                          {link.icon}
                        </div>
                        <div>
                          <span className="block text-xs font-bold text-zinc-900">{link.name}</span>
                          <span className="block text-[10px] text-zinc-450 mt-0.5">{link.desc}</span>
                        </div>
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div> */}

            <Link
              to="/donate"
              className="flex items-center space-x-2 bg-zinc-950 hover:bg-brand-gold-600 text-white px-5 py-2.5 rounded-full font-bold shadow-sm transition-all duration-300 text-xs group"
            >
              <Heart className="w-3.5 h-3.5 fill-white group-hover:scale-110 transition-transform" />
              <span>Donate Online</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-xl text-zinc-800 hover:text-brand-gold-500 focus:outline-none hover:bg-stone-100 transition-colors cursor-pointer"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden absolute top-full left-0 w-full bg-white border-t border-stone-200/80 shadow-xl z-50 overflow-hidden"
          >
            <div className="py-4 px-6 space-y-4 max-h-[80vh] overflow-y-auto">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block font-semibold text-sm transition-colors ${isLinkActive(link.href) ? 'text-brand-gold-500 font-bold' : 'text-zinc-650 hover:text-zinc-900'
                    }`}
                >
                  {link.name}
                </Link>
              ))}

              <hr className="border-stone-100" />

              <span className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider block">More Modules</span>
              <div className="grid grid-cols-2 gap-3 pb-2">
                {moreLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center space-x-2 p-2 rounded-xl border border-stone-150 bg-stone-50/50 hover:bg-stone-100/80 transition-all text-[11px] font-semibold text-zinc-850"
                  >
                    {link.icon}
                    <span>{link.name}</span>
                  </Link>
                ))}
              </div>

              <Link
                to="/donate"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-center space-x-2 bg-brand-gold-500 hover:bg-brand-gold-600 text-white px-5 py-3.5 rounded-full font-bold shadow-md text-xs w-full"
              >
                <Heart className="w-4 h-4 fill-white" />
                <span>Donate Online</span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
