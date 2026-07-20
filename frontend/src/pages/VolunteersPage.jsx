import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Mail, Phone, Calendar, Heart, ShieldCheck, HeartHandshake, CheckCircle2, MessageSquare, Info } from 'lucide-react';

export default function VolunteersPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'Feed Management Seva',
    availability: 'Weekends',
    experience: '',
    notes: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      // Fetch existing volunteers from localStorage
      const existing = JSON.parse(localStorage.getItem('volunteerSubmissions') || '[]');
      const newSub = {
        id: 'vol-' + Date.now(),
        ...formData,
        status: 'pending',
        timestamp: new Date().toISOString()
      };
      
      localStorage.setItem('volunteerSubmissions', JSON.stringify([newSub, ...existing]));
      
      setIsSubmitting(false);
      setSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        role: 'Feed Management Seva',
        availability: 'Weekends',
        experience: '',
        notes: ''
      });
      setTimeout(() => setSuccess(false), 4000);
    }, 1500);
  };

  const roles = [
    'Feed Management Seva (Feeding cows)',
    'Event Coordinator (Puja, Bhandara planning)',
    'Veterinary Helper (Assisting clinic team)',
    'Organic Farming & Pasture Maintenance',
    'Media Volunteer (Daily vlogs, photography)'
  ];

  return (
    <div className="flex-1 bg-stone-50/50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Mission Description */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-28">
            <span className="text-brand-gold-700 font-bold text-xs uppercase tracking-widest bg-brand-gold-100/60 px-4 py-1.5 rounded-full inline-block font-sans">
              Get Involved
            </span>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-zinc-900 leading-tight">
              Become a Registered Gau Seva Volunteer
            </h1>
            <div className="h-1.5 w-20 bg-brand-gold-500 rounded-full"></div>
            
            <p className="text-zinc-650 text-sm md:text-base font-light leading-relaxed">
              Volunteering at Krishna Govind Goushala is a path of selfless service (Seva). Join a passionate local and international community dedicated to caring for distressed mother cows.
            </p>

            <div className="space-y-4 pt-4 font-sans text-xs md:text-sm text-zinc-600">
              <div className="flex items-start space-x-3.5">
                <div className="bg-brand-gold-500/10 text-brand-gold-600 p-2.5 rounded-xl border border-brand-gold-500/20 shrink-0">
                  <HeartHandshake className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-zinc-800">Selfless Devotion</h4>
                  <p className="font-light text-zinc-550 mt-0.5">Participate in daily feed preparation, veterinary medicine distribution, or administrative tasks.</p>
                </div>
              </div>

              <div className="flex items-start space-x-3.5">
                <div className="bg-brand-gold-500/10 text-brand-gold-600 p-2.5 rounded-xl border border-brand-gold-500/20 shrink-0">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-zinc-800">Flexible Scheduling</h4>
                  <p className="font-light text-zinc-550 mt-0.5">Give 2 hours a week, join us on weekends, or register for full-time long-term volunteering.</p>
                </div>
              </div>

              <div className="flex items-start space-x-3.5">
                <div className="bg-brand-gold-500/10 text-brand-gold-600 p-2.5 rounded-xl border border-brand-gold-500/20 shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-zinc-800">Volunteer Certificate & Prasad</h4>
                  <p className="font-light text-zinc-550 mt-0.5">Receive a formal volunteering certificate from the NGO Trust and consecrated holy Prasad.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Premium Form */}
          <div className="lg:col-span-7">
            <div className="bg-white border border-stone-200/80 rounded-3xl p-6 md:p-10 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1.5 bg-brand-gold-500"></div>
              
              <h2 className="text-2xl font-serif font-bold text-zinc-950 mb-1.5">Join the Seva Family</h2>
              <p className="text-zinc-500 text-xs font-light mb-8">Fill in your information. Our volunteer coordinator will schedule a short video call / physical meet within 48 hours.</p>

              {success ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-16 space-y-4"
                >
                  <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600 mx-auto border border-emerald-100">
                    <CheckCircle2 className="w-10 h-10 animate-bounce" />
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-zinc-900">Application Submitted!</h3>
                  <p className="text-zinc-500 text-sm font-light max-w-sm mx-auto leading-relaxed">
                    Hare Krishna! Your volunteer registration form was recorded in our database. We will contact you shortly.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  {/* Row 1: Name and Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[11px] font-bold text-zinc-500 mb-2 uppercase tracking-wider font-sans">Full Name</label>
                      <div className="relative">
                        <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          placeholder="Your Name"
                          className="w-full bg-stone-50 border border-stone-200 rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:border-brand-gold-500 transition-all font-sans"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-zinc-500 mb-2 uppercase tracking-wider font-sans">Email Address</label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          placeholder="you@example.com"
                          className="w-full bg-stone-50 border border-stone-200 rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:border-brand-gold-500 transition-all font-sans"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Row 2: Phone and Role */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[11px] font-bold text-zinc-500 mb-2 uppercase tracking-wider font-sans">Phone Number</label>
                      <div className="relative">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                          placeholder="+91 99999 99999"
                          className="w-full bg-stone-50 border border-stone-200 rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:border-brand-gold-500 transition-all font-sans"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-zinc-500 mb-2 uppercase tracking-wider font-sans">Preferred Seva Area</label>
                      <select
                        value={formData.role}
                        onChange={(e) => setFormData({...formData, role: e.target.value})}
                        className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-gold-500 transition-all font-sans cursor-pointer"
                      >
                        {roles.map((r, i) => (
                          <option key={i} value={r}>{r}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Row 3: Availability & Experience */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[11px] font-bold text-zinc-500 mb-2 uppercase tracking-wider font-sans">Availability</label>
                      <select
                        value={formData.availability}
                        onChange={(e) => setFormData({...formData, availability: e.target.value})}
                        className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-gold-500 transition-all font-sans cursor-pointer"
                      >
                        <option value="Weekends">Weekends Only</option>
                        <option value="Weekdays">Weekdays Only</option>
                        <option value="Full Time">Full Time (Residential Seva)</option>
                        <option value="Remote">Remote Media & Admin Help</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-zinc-500 mb-2 uppercase tracking-wider font-sans">Previous Experience (Optional)</label>
                      <input
                        type="text"
                        value={formData.experience}
                        onChange={(e) => setFormData({...formData, experience: e.target.value})}
                        placeholder="e.g. veterinarian, social worker"
                        className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-gold-500 transition-all font-sans"
                      />
                    </div>
                  </div>

                  {/* Notes / Motivation */}
                  <div>
                    <label className="block text-[11px] font-bold text-zinc-500 mb-2 uppercase tracking-wider font-sans">Why do you want to volunteer for Gomata Seva?</label>
                    <div className="relative">
                      <MessageSquare className="absolute left-4 top-3 w-4 h-4 text-zinc-400" />
                      <textarea
                        rows={4}
                        required
                        value={formData.notes}
                        onChange={(e) => setFormData({...formData, notes: e.target.value})}
                        placeholder="Share your thoughts or prayers for cows..."
                        className="w-full bg-stone-50 border border-stone-200 rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:border-brand-gold-500 transition-all font-sans resize-none"
                      />
                    </div>
                  </div>

                  <div className="bg-stone-50 p-4 rounded-2xl border border-stone-100 flex items-center space-x-2 text-xs text-zinc-500">
                    <Info className="w-4.5 h-4.5 text-brand-gold-500 shrink-0" />
                    <span>Note: Residential volunteers must submit proof of ID. Food and lodging will be fully covered by the Trust.</span>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-xl bg-zinc-950 hover:bg-brand-gold-600 text-white font-bold text-xs shadow-md transition-all cursor-pointer flex items-center justify-center space-x-2 disabled:opacity-75 disabled:cursor-not-allowed"
                  >
                    <Heart className="w-4 h-4 fill-white" />
                    <span>{isSubmitting ? 'Recording Seva form...' : 'Submit Application'}</span>
                  </button>

                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
