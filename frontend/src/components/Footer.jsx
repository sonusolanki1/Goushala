import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Youtube, ShieldAlert, Award, Heart } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { name: 'Instagram', icon: <Instagram className="w-4 h-4" />, href: 'https://instagram.com/krishnagovindsevasansthan', color: 'hover:text-brand-gold-500 hover:border-brand-gold-500' },
    { name: 'Facebook', icon: <Facebook className="w-4 h-4" />, href: 'https://facebook.com/krishnagovindsevasansthan', color: 'hover:text-brand-gold-500 hover:border-brand-gold-500' },
    { name: 'YouTube', icon: <Youtube className="w-4 h-4" />, href: 'https://youtube.com/krishnagovindsevasansthan', color: 'hover:text-brand-gold-500 hover:border-brand-gold-500' }
  ];

  return (
    <footer id="contact" className="bg-zinc-950 text-slate-400 py-16 border-t border-zinc-900 font-sans">
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
                <span className="text-[10px] uppercase tracking-wider text-brand-gold-500 block font-semibold -mt-1 font-sans">
                  Seva Sansthan NGO
                </span>
              </div>
            </Link>
            <p className="text-xs text-slate-400 font-light leading-relaxed max-w-sm">
              We are a registered non-governmental organization (NGO) dedicated to cow protection, medical relief, and organic farming. Our shelter in Vrindavan serves as a lifetime home for rescued, sick, and senior cattle.
            </p>

            {/* Social Media Link Buttons */}
            <div className="flex space-x-2.5 pt-2">
              {socialLinks.map((item, idx) => (
                <a
                  key={idx}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-2 rounded-xl bg-zinc-900/60 text-slate-400 border border-zinc-900 hover:bg-zinc-900 hover:scale-105 transition-all duration-300 ${item.color}`}
                  title={`Follow us on ${item.name}`}
                >
                  {item.icon}
                </a>
              ))}
            </div>

            <div className="text-[10px] text-slate-500 space-y-1 pt-2 font-mono">
              <p>Registration No: IV-108/2024</p>
              <p>Certified 80G Tax-Exempt Gau Charity</p>
            </div>
          </div>

          {/* Quick links Column 1 */}
          <div className="md:col-span-2 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white font-sans">Primary Pages</h4>
            <ul className="space-y-2 text-xs font-light">
              <li>
                <Link to="/" className="hover:text-brand-gold-500 transition-colors">Home Page</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-brand-gold-500 transition-colors">About Story</Link>
              </li>
              <li>
                <Link to="/seva" className="hover:text-brand-gold-500 transition-colors">Gau Seva Plans</Link>
              </li>
              <li>
                <Link to="/cows" className="hover:text-brand-gold-500 transition-colors">Cows Directory</Link>
              </li>
              <li>
                <Link to="/updates" className="hover:text-brand-gold-500 transition-colors">Daily Log</Link>
              </li>
            </ul>
          </div>

          {/* Quick links Column 2 */}
          <div className="md:col-span-2 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white font-sans">Explore More</h4>
            <ul className="space-y-2 text-xs font-light">
              <li>
                <Link to="/gallery" className="hover:text-brand-gold-500 transition-colors">Photo Gallery</Link>
              </li>
              <li>
                <Link to="/events" className="hover:text-brand-gold-500 transition-colors">Events & Festivals</Link>
              </li>
              <li>
                <Link to="/news" className="hover:text-brand-gold-500 transition-colors">News & Blogs</Link>
              </li>
              <li>
                <Link to="/volunteers" className="hover:text-brand-gold-500 transition-colors">Volunteering</Link>
              </li>
              <li>
                <Link to="/membership" className="hover:text-brand-gold-500 transition-colors">Memberships</Link>
              </li>
              <li>
                <Link to="/adoption" className="hover:text-brand-gold-500 transition-colors">Adoption Guide</Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-brand-gold-500 transition-colors">Help Desk & FAQ</Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white font-sans">NGO Office Address</h4>
            <p className="text-xs text-slate-400 font-light leading-relaxed">
              Krishna Govind Seva Sansthan Goushala,<br />
              Randhela, Salumber,<br />
              Rajasthan - 313027
            </p>
            <div className="space-y-1 text-[11px] text-slate-500 font-mono pt-1">
              <p>Email: info@krishnagovindsevasansthan.org</p>
              <p>Phone: +91 77421 15132</p>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-zinc-900 pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 font-mono">
          <p>© {currentYear} Krishna Govind Seva Sansthan NGO. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 sm:mt-0">
            <Link to="/privacy" className="hover:text-slate-300 transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-slate-300 transition-colors">Terms of Service</Link>
            <Link to="/seva-trust/admin/login" className="hover:text-slate-300 transition-colors flex items-center space-x-1">
              <span>Admin Log</span>
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
