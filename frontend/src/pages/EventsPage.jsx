import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, Clock, ArrowRight, ShieldCheck, Heart, User, Mail, Phone, Info, X } from 'lucide-react';

const EVENTS_DATA = [
  {
    id: 1,
    title: 'Gopashtami Gau Mahotsav 2026',
    date: 'Nov 18, 2026',
    time: '08:00 AM - 06:00 PM',
    location: 'Krishna Govind Goushala Vrindavan',
    desc: 'Join our grand annual cow worship festival. Witness traditional Gau Puja, participate in Havan, enjoy spiritual lectures, and feed cows with direct hands-on bhandara.',
    image: 'https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?auto=format&fit=crop&w=800&q=80',
    type: 'Festival'
  },
  {
    id: 2,
    title: 'Vrindavan Tree Plantation Drive',
    date: 'Aug 12, 2026',
    time: '07:30 AM - 12:30 PM',
    location: 'Goushala Grass Pasture Fields',
    desc: 'Help us plant 500+ shadow-yielding Neem, Peepal, and Banyan trees across our 12-acre pasture fields to provide natural cool shade for the cows in summer.',
    image: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80',
    type: 'Volunteering'
  },
  {
    id: 3,
    title: 'Free Cattle Medical Camps',
    date: 'Sep 05, 2026',
    time: '09:00 AM - 04:00 PM',
    location: 'Salumber Surrounding Villages',
    desc: 'Our veterinary clinic team is conducting a free veterinary medicine and health check camp for rural stray cattle and farming livestock. Volunteers needed.',
    image: 'https://images.unsplash.com/photo-1589923188900-85dae440342b?auto=format&fit=crop&w=800&q=80',
    type: 'Medical Camp'
  },
  {
    id: 4,
    title: 'Weekly Sundarkand & Gau Seva',
    date: 'Every Saturday',
    time: '04:00 PM - 07:30 PM',
    location: 'Main Goushala Devotional Hall',
    desc: 'Participate in our weekend congregational prayers. Chant the holy Sundarkand path followed by collective grass fodder feeding (Seva) and evening Aarti.',
    image: 'https://images.unsplash.com/photo-1596733430284-f7437764b1a9?auto=format&fit=crop&w=800&q=80',
    type: 'Weekly Spiritual'
  }
];

export default function EventsPage() {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [regSuccess, setRegSuccess] = useState(false);

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    setRegSuccess(true);
    setTimeout(() => {
      setRegSuccess(false);
      setSelectedEvent(null);
    }, 3000);
  };

  return (
    <div className="flex-1 bg-stone-50/50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-brand-gold-700 font-bold text-xs uppercase tracking-widest bg-brand-gold-100/60 px-4 py-1.5 rounded-full inline-block mb-3 font-sans">
            Participate
          </span>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-zinc-900 leading-tight">
            Upcoming Events & Seva Camps
          </h1>
          <div className="h-1 w-20 bg-brand-gold-500 mx-auto mt-4 rounded-full"></div>
          <p className="text-zinc-500 mt-5 text-sm md:text-base font-light leading-relaxed">
            Get involved in our community festivals, green tree plantations, and emergency animal care drives. Check schedules and register to join.
          </p>
        </div>

        {/* Events Layout */}
        <div className="space-y-8">
          {EVENTS_DATA.map((event, idx) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="bg-white border border-stone-200/80 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl group transition-all duration-300 flex flex-col md:flex-row"
            >
              {/* Media banner */}
              <div className="w-full md:w-80 lg:w-96 bg-stone-150 shrink-0 relative overflow-hidden aspect-video md:aspect-auto">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700 ease-out"
                  loading="lazy"
                />
                <span className="absolute top-4 left-4 bg-zinc-950/70 backdrop-blur-sm text-white px-3 py-1 rounded-xl text-[10px] font-bold uppercase tracking-wider">
                  {event.type}
                </span>
              </div>

              {/* Info content */}
              <div className="p-6 md:p-8 flex-1 flex flex-col justify-between space-y-6">
                <div className="space-y-3">
                  <h3 className="text-xl md:text-2xl font-serif font-bold text-zinc-900 group-hover:text-brand-gold-500 transition-colors duration-300">
                    {event.title}
                  </h3>
                  
                  {/* Metadata labels */}
                  <div className="flex flex-wrap gap-y-2 gap-x-4 text-xs font-sans text-zinc-500 font-light">
                    <span className="flex items-center space-x-1">
                      <Calendar className="w-3.5 h-3.5 text-brand-gold-500 shrink-0" />
                      <span>{event.date}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Clock className="w-3.5 h-3.5 text-brand-gold-500 shrink-0" />
                      <span>{event.time}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <MapPin className="w-3.5 h-3.5 text-brand-gold-500 shrink-0" />
                      <span>{event.location}</span>
                    </span>
                  </div>

                  <p className="text-zinc-600 text-xs md:text-sm font-light leading-relaxed pt-2">
                    {event.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                  <span className="text-xs text-zinc-400 font-mono">Free Public Entry</span>
                  <button
                    onClick={() => setSelectedEvent(event)}
                    className="inline-flex items-center space-x-2 bg-zinc-950 hover:bg-brand-gold-600 hover:text-white text-white font-semibold text-xs px-5 py-3 rounded-full transition-all duration-300 cursor-pointer shadow-sm"
                  >
                    <span>Register to Join</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Event Registration Modal */}
      <AnimatePresence>
        {selectedEvent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedEvent(null)}
              className="absolute inset-0 bg-zinc-950/60 backdrop-blur-sm"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-white rounded-3xl border border-stone-200 shadow-2xl w-full max-w-lg overflow-hidden relative z-10 p-6 md:p-8"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedEvent(null)}
                className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-zinc-600 rounded-full hover:bg-stone-100 transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {regSuccess ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600 mx-auto border border-emerald-100">
                    <ShieldCheck className="w-10 h-10 animate-bounce" />
                  </div>
                  <h2 className="text-2xl font-serif font-bold text-zinc-900">Registration Complete!</h2>
                  <p className="text-zinc-500 text-sm font-light max-w-sm mx-auto leading-relaxed">
                    Thank you for registering for <strong>{selectedEvent.title}</strong>. An email confirmation has been sent with direction details.
                  </p>
                </div>
              ) : (
                <div className="space-y-5">
                  <div>
                    <span className="text-[10px] text-brand-gold-700 uppercase tracking-widest font-bold font-sans">
                      {selectedEvent.type} Entry Pass
                    </span>
                    <h2 className="text-xl md:text-2xl font-serif font-bold text-zinc-900 leading-tight">
                      Register: {selectedEvent.title}
                    </h2>
                    <p className="text-xs text-zinc-500 mt-1 font-mono">{selectedEvent.date} @ {selectedEvent.location}</p>
                  </div>

                  <hr className="border-stone-100" />

                  {/* Form */}
                  <form onSubmit={handleRegisterSubmit} className="space-y-4">
                    
                    {/* Name */}
                    <div>
                      <label className="block text-[11px] font-bold text-zinc-500 mb-1.5 uppercase tracking-wider font-sans">
                        Full Name
                      </label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                        <input
                          type="text"
                          required
                          placeholder="Your Name"
                          className="w-full bg-stone-50 border border-stone-200 rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:border-brand-gold-500 transition-all font-sans"
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-[11px] font-bold text-zinc-500 mb-1.5 uppercase tracking-wider font-sans">
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                        <input
                          type="email"
                          required
                          placeholder="you@example.com"
                          className="w-full bg-stone-50 border border-stone-200 rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:border-brand-gold-500 transition-all font-sans"
                        />
                      </div>
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-[11px] font-bold text-zinc-500 mb-1.5 uppercase tracking-wider font-sans">
                        Phone Number
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                        <input
                          type="tel"
                          required
                          placeholder="+91 99999 99999"
                          className="w-full bg-stone-50 border border-stone-200 rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:border-brand-gold-500 transition-all font-sans"
                        />
                      </div>
                    </div>

                    {/* Number of Attendees */}
                    <div>
                      <label className="block text-[11px] font-bold text-zinc-500 mb-1.5 uppercase tracking-wider font-sans">
                        Number of Persons
                      </label>
                      <select className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-gold-500 transition-all font-sans cursor-pointer">
                        <option>1 Person</option>
                        <option>2 Persons</option>
                        <option>3 - 5 Persons</option>
                        <option>5+ (Group delegation)</option>
                      </select>
                    </div>

                    <div className="pt-2 flex space-x-3">
                      <button
                        type="button"
                        onClick={() => setSelectedEvent(null)}
                        className="w-1/3 py-3 rounded-xl border border-stone-200 text-zinc-650 hover:bg-stone-50 text-xs font-semibold transition-all cursor-pointer text-center"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="w-2/3 py-3 rounded-xl bg-zinc-950 hover:bg-brand-gold-600 text-white font-bold text-xs shadow-md transition-all cursor-pointer flex items-center justify-center space-x-2"
                      >
                        <Heart className="w-4 h-4 fill-white" />
                        <span>Confirm Attendance</span>
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
