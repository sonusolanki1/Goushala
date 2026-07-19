import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Youtube } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { name: 'Instagram', icon: <Instagram className="w-5 h-5" />, href: 'https://instagram.com/krishnagovindsevasansthan', color: 'hover:text-brand-gold-500' },
    { name: 'Facebook', icon: <Facebook className="w-5 h-5" />, href: 'https://facebook.com/krishnagovindsevasansthan', color: 'hover:text-brand-gold-500' },
    { name: 'YouTube', icon: <Youtube className="w-5 h-5" />, href: 'https://youtube.com/krishnagovindsevasansthan', color: 'hover:text-brand-gold-500' }
  ];

  return (
    <footer id="contact" className="bg-zinc-950 text-slate-400 py-16 border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-12">

          {/* Brand/NGO Info & Social Icons */}
          <div className="md:col-span-5 space-y-5">
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
                <span className="font-serif font-bold text-lg text-white block">
                  Krishna Govind
                </span>
                <span className="text-[10px] uppercase tracking-wider text-brand-gold-500 block font-semibold -mt-1">
                  Seva Sansthan NGO
                </span>
              </div>
            </Link>
            <p className="text-sm text-slate-400 font-light leading-relaxed max-w-sm">
              We are a registered non-governmental organization (NGO) dedicated to cow welfare, medical relief, and ecological farming.
              Our sanctuary serves as a lifetime home for old, sick, and rescued cows.
            </p>

            {/* Social Media Link Buttons */}
            <div className="flex space-x-3 pt-2">
              {socialLinks.map((item, idx) => (
                <a
                  key={idx}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-2 rounded-xl bg-zinc-900 text-slate-400 border border-zinc-800 hover:bg-zinc-800 hover:scale-105 hover:border-zinc-700 transition-all duration-300 ${item.color}`}
                  title={`Follow us on ${item.name}`}
                >
                  {item.icon}
                </a>
              ))}
            </div>

            <div className="text-xs text-slate-500 space-y-1 pt-2 font-mono">
              <p>Registration No: IV-108/2024</p>
              <p>Gau Seva Charity Commission</p>
            </div>
          </div>

          {/* Quick links */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white font-serif">Quick Navigation</h4>
            <ul className="space-y-2 text-sm font-light">
              <li>
                <Link to="/" className="hover:text-brand-gold-500 transition-colors">Home Page</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-brand-gold-500 transition-colors">Our Story & NGO</Link>
              </li>
              <li>
                <Link to="/seva" className="hover:text-brand-gold-500 transition-colors">Gau Seva Plans</Link>
              </li>
              <li>
                <Link to="/updates" className="hover:text-brand-gold-500 transition-colors">Daily Vlogs</Link>
              </li>
              <li>
                <Link to="/donate" className="hover:text-brand-gold-500 transition-colors">Donate Online</Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white font-serif">NGO Office Address</h4>
            <p className="text-sm text-slate-400 font-light leading-relaxed">
              Krishna Govind Seva Sansthan Goushala,<br />
              Randhela, Salumber,<br />
              Rajasthan - 313027
            </p>
            <div className="space-y-1 text-xs text-slate-450 font-mono pt-1">
              <p>Email: info@krishnagovindsevasansthan.org</p>
              <p>Phone: +91 77421 151320</p>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-zinc-900 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 font-mono">
          <p>© {currentYear} Krishna Govind Seva Sansthan NGO. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 sm:mt-0">
            <a href="#" className="hover:text-slate-350 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-slate-350 transition-colors">Terms of Service</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
