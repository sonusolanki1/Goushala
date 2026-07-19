import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, MessageSquare, CheckCircle2 } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate inquiry submission
    setIsSubmitted(true);
    setTimeout(() => {
      setFormData({ name: '', email: '', subject: '', message: '' });
      setIsSubmitted(false);
    }, 5000);
  };

  return (
    <div className="flex-1 animate-fadeIn bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-brand-gold-700 font-bold text-xs uppercase tracking-widest bg-brand-gold-100/60 px-4 py-1.5 rounded-full inline-block mb-3">
            Connect With Us
          </span>
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-slate-900 leading-tight">
            Contact Goushala NGO
          </h1>
          <div className="h-1.5 w-24 bg-gradient-to-r from-brand-gold-400 to-amber-600 mx-auto mt-4 rounded-full"></div>
          <p className="text-slate-500 mt-6 text-base md:text-lg font-light leading-relaxed">
            Have questions about cow adoptions, visiting timings, or donating fodder? 
            Reach out to our NGO office. We would love to hear from you.
          </p>
        </div>

        {/* Contact Info & Inquiry Form Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
          
          {/* Left Column: Contact Cards */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Address */}
            <div className="bg-amber-50/20 border border-amber-100 p-6 rounded-2xl flex space-x-4">
              <div className="bg-brand-gold-500/10 p-3 rounded-xl h-fit text-brand-gold-600">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-base font-serif font-bold text-slate-800">Goushala Sanctuary</h4>
                <p className="text-slate-550 text-sm font-light leading-relaxed mt-1">
                  Krishna Govind Sanctuary, Raman Reti,<br />
                  Vrindavan, Mathura, Uttar Pradesh, 281121
                </p>
              </div>
            </div>

            {/* Calling Details */}
            <div className="bg-amber-50/20 border border-amber-100 p-6 rounded-2xl flex space-x-4">
              <div className="bg-brand-gold-500/10 p-3 rounded-xl h-fit text-brand-gold-600">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-base font-serif font-bold text-slate-800">Call/WhatsApp Support</h4>
                <p className="text-slate-555 text-sm font-mono mt-1">+91 98765 43210</p>
                <p className="text-slate-555 text-sm font-mono mt-0.5">+91 99999 88888</p>
              </div>
            </div>

            {/* Email Support */}
            <div className="bg-amber-50/20 border border-amber-100 p-6 rounded-2xl flex space-x-4">
              <div className="bg-brand-gold-500/10 p-3 rounded-xl h-fit text-brand-gold-600">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-base font-serif font-bold text-slate-800">Email Address</h4>
                <p className="text-slate-555 text-sm font-light mt-1">info@krishnagovindsevasansthan.org</p>
                <p className="text-slate-555 text-sm font-light mt-0.5">contact@krishnagovindsevasansthan.org</p>
              </div>
            </div>

            {/* Timings */}
            <div className="bg-amber-50/20 border border-amber-100 p-6 rounded-2xl flex space-x-4">
              <div className="bg-brand-gold-500/10 p-3 rounded-xl h-fit text-brand-gold-600">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-base font-serif font-bold text-slate-800">Visiting Hours</h4>
                <p className="text-slate-555 text-sm font-light leading-relaxed mt-1">
                  Morning: 07:00 AM — 11:30 AM <br />
                  Evening: 04:00 PM — 07:30 PM <br />
                  (Open on all days including Sundays)
                </p>
              </div>
            </div>

            {/* Social Pages Card */}
            <div className="bg-amber-50/20 border border-amber-100 p-6 rounded-2xl space-y-4">
              <h4 className="text-base font-serif font-bold text-slate-800">Follow Our Social Channels</h4>
              <p className="text-xs text-slate-500 font-light leading-relaxed">
                Watch daily feeds of cow feeding and live ceremonies directly from our trust channels.
              </p>
              <div className="flex space-x-3">
                <a 
                  href="https://instagram.com/krishnagovindsevasansthan" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-gradient-to-r from-pink-500 to-rose-600 hover:scale-102 text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition-all"
                >
                  Instagram
                </a>
                <a 
                  href="https://facebook.com/krishnagovindsevasansthan" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-blue-600 hover:bg-blue-700 hover:scale-102 text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition-all"
                >
                  Facebook
                </a>
                <a 
                  href="https://youtube.com/krishnagovindsevasansthan" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-red-600 hover:bg-red-700 hover:scale-102 text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition-all"
                >
                  YouTube
                </a>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Form */}
          <div className="lg:col-span-7 bg-amber-50/10 border border-amber-100 p-8 rounded-3xl relative overflow-hidden">
            <h3 className="text-xl font-serif font-bold text-slate-800 mb-6 flex items-center space-x-2">
              <MessageSquare className="w-5 h-5 text-brand-gold-500" />
              <span>Send An Inquiry</span>
            </h3>

            {isSubmitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="inline-flex justify-center bg-emerald-50 p-4 rounded-full border border-emerald-100">
                  <CheckCircle2 className="w-12 h-12 text-emerald-600 animate-bounce" />
                </div>
                <h4 className="text-lg font-bold text-slate-800">Inquiry Sent Successfully!</h4>
                <p className="text-slate-500 text-xs font-light max-w-sm mx-auto">
                  Thank you for writing to us. Our trust representative will respond back to you via email shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 mb-1.5 uppercase tracking-wide">
                      Your Name
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Anand Sharma"
                      className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none focus:border-brand-gold-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 mb-1.5 uppercase tracking-wide">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. anand@example.com"
                      className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none focus:border-brand-gold-500"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-500 mb-1.5 uppercase tracking-wide">
                    Subject
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="e.g. Visit scheduling / Adopt-a-cow query"
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none focus:border-brand-gold-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-500 mb-1.5 uppercase tracking-wide">
                    Your Message
                  </label>
                  <textarea
                    rows="4"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Write details of your query..."
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none focus:border-brand-gold-500 resize-none"
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-xl text-white font-semibold bg-gradient-to-r from-brand-gold-500 to-amber-600 shadow-md hover:shadow-lg active:scale-[0.99] transition-all cursor-pointer text-center"
                >
                  Send Inquiry Message
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Map Placeholder Block */}
        <div className="bg-slate-100 rounded-3xl h-96 w-full relative overflow-hidden border border-slate-200/50 shadow-inner flex items-center justify-center text-center">
          <div className="absolute inset-0 bg-slate-900/10 z-10"></div>
          
          {/* Mock Map Background Visual */}
          <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-75"></div>
          
          <div className="relative z-20 max-w-sm px-4">
            <span className="text-[10px] font-bold uppercase tracking-wider text-brand-gold-700 bg-brand-gold-100 px-3 py-1 rounded-full border border-brand-gold-200">
              Interactive Map
            </span>
            <h3 className="text-xl font-serif font-bold text-slate-800 mt-3">Goushala Sanctuary Location</h3>
            <p className="text-slate-500 text-xs font-light mt-2 leading-relaxed">
              Located near Raman Reti, Vrindavan. Open daily for Gau Puja and fodder donation ceremonies.
            </p>
            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-4 bg-slate-800 hover:bg-slate-700 text-white font-medium text-xs px-5 py-2.5 rounded-full transition-all"
            >
              Get Driving Directions
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
