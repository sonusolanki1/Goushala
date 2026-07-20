import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, MessageSquare, CheckCircle2, Send, Info } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setFormData({ name: '', email: '', subject: '', message: '' });
      setIsSubmitted(false);
    }, 4000);
  };

  return (
    <div className="flex-1 bg-stone-50/50 py-16 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Title Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-brand-gold-700 font-bold text-xs uppercase tracking-widest bg-brand-gold-100/60 px-4 py-1.5 rounded-full inline-block mb-3 font-sans">
            Connect With Us
          </span>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-zinc-900 leading-tight">
            Contact Goushala NGO
          </h1>
          <div className="h-1 w-20 bg-brand-gold-500 mx-auto mt-4 rounded-full"></div>
          <p className="text-zinc-500 mt-5 text-sm md:text-base font-light leading-relaxed">
            Have questions about cow adoptions, visiting timings, or donating green fodder? Reach out to our trustee desk. We would love to guide you.
          </p>
        </div>

        {/* Contact Info & Inquiry Form Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">

          {/* Left Column: Contact Cards */}
          <div className="lg:col-span-5 space-y-6">

            {/* Address */}
            <div className="bg-white border border-stone-200/80 p-6 rounded-2xl flex space-x-4 shadow-sm hover:shadow transition-shadow duration-300">
              <div className="bg-brand-gold-500/10 p-3 rounded-xl h-fit text-brand-gold-600 border border-brand-gold-500/20 shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-serif font-bold text-zinc-800 text-sm md:text-base">Goushala Sanctuary Office</h4>
                <p className="text-zinc-500 text-xs md:text-sm font-light leading-relaxed mt-1.5">
                  Krishna Govind Sanctuary, Randhela,<br />
                  Salumber, Rajasthan - 313027
                </p>
              </div>
            </div>

            {/* Calling Details */}
            <div className="bg-white border border-stone-200/80 p-6 rounded-2xl flex space-x-4 shadow-sm hover:shadow transition-shadow duration-300">
              <div className="bg-brand-gold-500/10 p-3 rounded-xl h-fit text-brand-gold-600 border border-brand-gold-500/20 shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-serif font-bold text-zinc-800 text-sm md:text-base">Call/WhatsApp Support</h4>
                <p className="text-zinc-650 text-xs md:text-sm font-mono mt-1.5">+91 77421 15132</p>
                <p className="text-zinc-450 text-[10px] uppercase font-light mt-0.5 tracking-wider">Available 9:00 AM - 6:00 PM</p>
              </div>
            </div>

            {/* Email Support */}
            <div className="bg-white border border-stone-200/80 p-6 rounded-2xl flex space-x-4 shadow-sm hover:shadow transition-shadow duration-300">
              <div className="bg-brand-gold-500/10 p-3 rounded-xl h-fit text-brand-gold-600 border border-brand-gold-500/20 shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-serif font-bold text-zinc-800 text-sm md:text-base">Email Addresses</h4>
                <p className="text-zinc-650 text-xs md:text-sm font-mono mt-1.5">info@krishnagovindsevasansthan.org</p>
              </div>
            </div>

            {/* Timings */}
            <div className="bg-white border border-stone-200/80 p-6 rounded-2xl flex space-x-4 shadow-sm hover:shadow transition-shadow duration-300">
              <div className="bg-brand-gold-500/10 p-3 rounded-xl h-fit text-brand-gold-600 border border-brand-gold-500/20 shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-serif font-bold text-zinc-800 text-sm md:text-base">Visiting Hours</h4>
                <p className="text-zinc-550 text-xs md:text-sm font-light leading-relaxed mt-1.5">
                  Morning: 07:00 AM — 11:30 AM <br />
                  Evening: 04:00 PM — 07:30 PM <br />
                  (Open on all days including Sundays)
                </p>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Form */}
          <div className="lg:col-span-7 bg-white border border-stone-200/80 p-6 md:p-8 rounded-3xl shadow-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1.5 bg-brand-gold-500"></div>
            
            <h3 className="text-xl font-serif font-bold text-zinc-950 mb-6 flex items-center space-x-2">
              <MessageSquare className="w-5 h-5 text-brand-gold-500" />
              <span>Send An Inquiry</span>
            </h3>

            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-16 text-center space-y-4"
              >
                <div className="inline-flex justify-center bg-emerald-50 p-4 rounded-full border border-emerald-100">
                  <CheckCircle2 className="w-12 h-12 text-emerald-600 animate-bounce" />
                </div>
                <h4 className="text-lg font-bold text-zinc-850">Inquiry Sent Successfully!</h4>
                <p className="text-zinc-500 text-xs font-light max-w-sm mx-auto leading-relaxed">
                  Thank you for writing to us. Our trust representative will respond back to you via email within 24 hours.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5 text-xs font-semibold text-zinc-650">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-zinc-500 mb-1.5 uppercase tracking-wider font-sans">
                      Your Name
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Anand Sharma"
                      className="w-full bg-stone-50 border border-stone-200 focus:bg-white rounded-xl px-4 py-3 text-sm text-zinc-800 focus:outline-none focus:border-brand-gold-500 transition-all font-sans"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-zinc-500 mb-1.5 uppercase tracking-wider font-sans">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. anand@example.com"
                      className="w-full bg-stone-50 border border-stone-200 focus:bg-white rounded-xl px-4 py-3 text-sm text-zinc-800 focus:outline-none focus:border-brand-gold-500 transition-all font-sans"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-zinc-500 mb-1.5 uppercase tracking-wider font-sans">
                    Subject
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="e.g. Fodder donation / Cow adoption inquiry"
                    className="w-full bg-stone-50 border border-stone-200 focus:bg-white rounded-xl px-4 py-3 text-sm text-zinc-800 focus:outline-none focus:border-brand-gold-500 transition-all font-sans"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-zinc-500 mb-1.5 uppercase tracking-wider font-sans">
                    Your Message
                  </label>
                  <textarea
                    rows="4"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your query in detail..."
                    className="w-full bg-stone-50 border border-stone-200 focus:bg-white rounded-xl px-4 py-3 text-sm text-zinc-800 focus:outline-none focus:border-brand-gold-500 resize-none transition-all font-sans"
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-xl text-white font-bold bg-zinc-950 hover:bg-brand-gold-600 transition-colors shadow-sm cursor-pointer text-center text-xs flex items-center justify-center space-x-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Inquiry Message</span>
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Map Placeholder Block */}
        <div className="bg-white border border-stone-200/80 rounded-3xl p-8 h-96 w-full relative overflow-hidden shadow-sm flex items-center justify-center text-center">
          <div className="absolute inset-0 bg-stone-50/50 z-10"></div>
          {/* Grid pattern */}
          <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1.5px,transparent_1.5px)] [background-size:24px_24px] opacity-75"></div>

          <div className="relative z-20 max-w-sm px-4 space-y-4">
            <span className="text-[10px] font-bold uppercase tracking-wider text-brand-gold-700 bg-brand-gold-50 border border-brand-gold-150 px-3 py-1 rounded-full font-sans">
              Sanctuary Maps
            </span>
            <h3 className="text-xl font-serif font-bold text-zinc-800">Physical Goushala Sanctuary</h3>
            <p className="text-zinc-500 text-xs font-light leading-relaxed">
              Located at Randhela, Salumber, Rajasthan. Easily accessible by state highways from Udaipur.
            </p>
            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1.5 bg-zinc-950 hover:bg-brand-gold-600 hover:text-white text-white font-bold text-xs px-6 py-3 rounded-full transition-all cursor-pointer shadow-sm"
            >
              <span>Get Driving Directions</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
