import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Youtube } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { name: 'Instagram', icon: <Instagram className="w-5 h-5" />, href: 'https://instagram.com/krishnagovindsevasansthan', color: 'hover:text-pink-500' },
    { name: 'Facebook', icon: <Facebook className="w-5 h-5" />, href: 'https://facebook.com/krishnagovindsevasansthan', color: 'hover:text-blue-500' },
    { name: 'YouTube', icon: <Youtube className="w-5 h-5" />, href: 'https://youtube.com/krishnagovindsevasansthan', color: 'hover:text-red-500' }
  ];

  return (
    <footer id="contact" className="bg-slate-900 text-slate-350 py-16 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-12">
          
          {/* Brand/Trust Info & Social Icons */}
          <div className="md:col-span-5 space-y-5">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="bg-brand-gold-500/10 p-2 rounded-full border border-brand-gold-500/20">
                <svg className="w-6 h-6 text-brand-gold-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H7c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.04-.42 1.99-1.07 2.75z"/>
                </svg>
              </div>
              <div>
                <span className="font-serif font-bold text-lg text-white block">
                  Krishna Govind
                </span>
                <span className="text-[10px] uppercase tracking-wider text-brand-gold-400 block font-semibold -mt-1">
                  Seva Sansthan Trust
                </span>
              </div>
            </Link>
            <p className="text-sm text-slate-400 font-light leading-relaxed max-w-sm">
              We are a registered charity dedicated to cow welfare, medical relief, and ecological farming. 
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
                  className={`p-2 rounded-xl bg-slate-800 text-slate-400 border border-slate-700/50 hover:bg-slate-700/80 hover:scale-105 hover:border-slate-600 transition-all duration-300 ${item.color}`}
                  title={`Follow us on ${item.name}`}
                >
                  {item.icon}
                </a>
              ))}
            </div>

            <div className="text-xs text-slate-500 space-y-1 pt-2 font-mono">
              <p>Registration No: IV-108/2024</p>
              <p>Section 80G Exempted | CSR Registered</p>
            </div>
          </div>

          {/* Quick Info / Links */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-white font-serif font-bold text-base tracking-wide uppercase text-brand-gold-400">
              Useful Links
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400 font-light">
              <li><Link to="/" className="hover:text-brand-gold-400 transition-colors">Home</Link></li>
              <li><Link to="/about" className="hover:text-brand-gold-400 transition-colors">Our Mission</Link></li>
              <li><Link to="/seva" className="hover:text-brand-gold-400 transition-colors">Gau Seva Options</Link></li>
              <li><Link to="/updates" className="hover:text-brand-gold-400 transition-colors">Daily Goushala updates</Link></li>
              <li><Link to="/contact" className="hover:text-brand-gold-400 transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-white font-serif font-bold text-base tracking-wide uppercase text-brand-gold-400">
              Goushala Sanctuary
            </h4>
            <ul className="space-y-3.5 text-sm text-slate-400 font-light">
              <li className="flex items-start space-x-2">
                <span className="text-brand-gold-400 mt-1 shrink-0 font-bold">📍</span>
                <span>
                  Krishna Govind Sanctuary, Raman Reti,<br />
                  Vrindavan, Mathura, Uttar Pradesh, 281121
                </span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-brand-gold-400 shrink-0 font-bold">📞</span>
                <span>+91 98765 43210, +91 99999 88888</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-brand-gold-400 shrink-0 font-bold">✉️</span>
                <span>info@krishnagovindsevasansthan.org</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 font-light">
          <p>© {currentYear} Krishna Govind Seva Sansthan Trust. All Rights Reserved.</p>
          <p className="mt-2 sm:mt-0">
            Carefully crafted for Gomata Seva.
          </p>
        </div>

      </div>
    </footer>
  );
}
