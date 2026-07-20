import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Heart, Filter, ArrowRight, ShieldCheck, Tag, Info, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const COWS_DATA = [
  {
    id: 1,
    name: 'Nandini',
    breed: 'Gir',
    age: '4 Years',
    gender: 'Female',
    status: 'Healthy',
    intakeDate: 'Jan 2024',
    story: 'Rescued from a dry drought area in Rajasthan. She is gentle, loves fresh green clover, and enjoys head scratches.',
    image: 'https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?auto=format&fit=crop&w=800&q=80',
    sponsorshipCost: 2500
  },
  {
    id: 2,
    name: 'Radha',
    breed: 'Sahiwal',
    age: '6 Years',
    gender: 'Female',
    status: 'Recovered',
    intakeDate: 'Mar 2024',
    story: 'Injured in a road accident in Vrindavan and brought by our veterinary rescue ambulance. Now fully healed and active.',
    image: 'https://images.unsplash.com/photo-1589923188900-85dae440342b?auto=format&fit=crop&w=800&q=80',
    sponsorshipCost: 3000
  },
  {
    id: 3,
    name: 'Balaram',
    breed: 'Kankrej',
    age: '3 Years',
    gender: 'Male (Bull)',
    status: 'Healthy',
    intakeDate: 'Nov 2023',
    story: 'Abandoned calf found near a busy highway. He has magnificent curved horns and is very protective of the younger calves.',
    image: 'https://images.unsplash.com/photo-1596733430284-f7437764b1a9?auto=format&fit=crop&w=800&q=80',
    sponsorshipCost: 3500
  },
  {
    id: 4,
    name: 'Surabhi',
    breed: 'Tharparkar',
    age: '5 Years',
    gender: 'Female',
    status: 'Special Care',
    intakeDate: 'Sep 2024',
    story: 'Requires customized therapeutic wheat bran mash due to a previous metabolic condition. Extremely friendly and peaceful.',
    image: 'https://images.unsplash.com/photo-1546445317-29f4545e9d53?auto=format&fit=crop&w=800&q=80',
    sponsorshipCost: 4000
  },
  {
    id: 5,
    name: 'Ganga',
    breed: 'Red Sindhi',
    age: '7 Years',
    gender: 'Female',
    status: 'Healthy',
    intakeDate: 'Feb 2024',
    story: 'A gentle mother cow rescued from illegal cattle trafficking. She lives peacefully in our primary pasture sanctuary.',
    image: 'https://images.unsplash.com/photo-1527153857715-3908f2bac5e8?auto=format&fit=crop&w=800&q=80',
    sponsorshipCost: 2500
  },
  {
    id: 6,
    name: 'Krishna',
    breed: 'Gir',
    age: '2 Years',
    gender: 'Male (Calf)',
    status: 'Healthy',
    intakeDate: 'Dec 2024',
    story: 'Born at our sanctuary to a rescued pregnant cow. Energetic, playful, and loves chasing birds around the straw yard.',
    image: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80',
    sponsorshipCost: 2000
  }
];

export default function CowsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBreed, setSelectedBreed] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedCow, setSelectedCow] = useState(null);
  const [adoptSuccess, setAdoptSuccess] = useState(false);

  const breeds = ['All', 'Gir', 'Sahiwal', 'Kankrej', 'Tharparkar', 'Red Sindhi'];
  const statuses = ['All', 'Healthy', 'Recovered', 'Special Care'];

  const filteredCows = COWS_DATA.filter(cow => {
    const matchesSearch = cow.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          cow.breed.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBreed = selectedBreed === 'All' || cow.breed === selectedBreed;
    const matchesStatus = selectedStatus === 'All' || cow.status === selectedStatus;
    return matchesSearch && matchesBreed && matchesStatus;
  });

  const handleSponsorSubmit = (e) => {
    e.preventDefault();
    setAdoptSuccess(true);
    setTimeout(() => {
      setAdoptSuccess(false);
      setSelectedCow(null);
    }, 3000);
  };

  return (
    <div className="flex-1 bg-stone-50/50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-brand-gold-700 font-bold text-xs uppercase tracking-widest bg-brand-gold-100/60 px-4 py-1.5 rounded-full inline-block mb-3 font-sans">
            Sheltered Mothers & Calves
          </span>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-zinc-900 leading-tight">
            Meet Our Sacred Gomata Family
          </h1>
          <div className="h-1 w-20 bg-brand-gold-500 mx-auto mt-4 rounded-full"></div>
          <p className="text-zinc-500 mt-5 text-sm md:text-base font-light leading-relaxed">
            We rescue and feed abandoned, injured, or sick cows. Browse the directory below to know their stories, breeds, and sponsor a cow of your choice.
          </p>
        </div>

        {/* Filters and Search Bar */}
        <div className="bg-white border border-stone-200/80 rounded-3xl p-6 shadow-sm mb-12 space-y-4 md:space-y-0 md:flex md:items-center md:justify-between md:space-x-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
            <input
              type="text"
              placeholder="Search by cow name or breed..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-stone-50 border border-stone-200 rounded-2xl text-sm focus:outline-none focus:border-brand-gold-500 focus:ring-1 focus:ring-brand-gold-500 transition-all font-sans"
            />
          </div>

          {/* Breed Filter */}
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-zinc-400 shrink-0" />
            <select
              value={selectedBreed}
              onChange={(e) => setSelectedBreed(e.target.value)}
              className="bg-stone-50 border border-stone-200 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-brand-gold-500 transition-all font-sans cursor-pointer"
            >
              {breeds.map(breed => (
                <option key={breed} value={breed}>{breed} Breed</option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div className="flex items-center space-x-2">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="bg-stone-50 border border-stone-200 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-brand-gold-500 transition-all font-sans cursor-pointer"
            >
              <option value="All">All Health Statuses</option>
              {statuses.slice(1).map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Cows Grid */}
        {filteredCows.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCows.map((cow) => (
              <motion.div
                key={cow.id}
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white border border-stone-200/80 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:border-brand-gold-200/80 group transition-all duration-300 flex flex-col justify-between h-full"
              >
                {/* Image */}
                <div className="relative aspect-[4/3] w-full bg-stone-100 overflow-hidden">
                  <img
                    src={cow.image}
                    alt={cow.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                  {/* Status Badge */}
                  <span className={`absolute top-4 left-4 text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full text-white ${
                    cow.status === 'Healthy' ? 'bg-emerald-600' :
                    cow.status === 'Recovered' ? 'bg-sky-600' : 'bg-brand-gold-500'
                  }`}>
                    {cow.status}
                  </span>
                  
                  {/* Breed Label */}
                  <span className="absolute bottom-4 right-4 bg-zinc-950/70 backdrop-blur-sm text-white px-3 py-1 rounded-xl text-xs font-medium font-sans">
                    {cow.breed}
                  </span>
                </div>

                {/* Content */}
                <div className="p-6 md:p-8 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2.5">
                    <div className="flex justify-between items-center">
                      <h3 className="text-xl font-serif font-bold text-zinc-900 group-hover:text-brand-gold-500 transition-colors duration-300">
                        {cow.name}
                      </h3>
                      <span className="text-xs text-zinc-400 font-mono">Age: {cow.age}</span>
                    </div>
                    
                    <p className="text-zinc-650 text-xs md:text-sm font-light leading-relaxed line-clamp-3">
                      {cow.story}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                    <div className="space-y-0.5">
                      <span className="text-[10px] text-zinc-400 uppercase tracking-wider block font-sans">Sponsorship</span>
                      <span className="text-base font-serif font-bold text-zinc-900">₹{cow.sponsorshipCost.toLocaleString('en-IN')}<span className="text-xs font-light text-zinc-500">/mo</span></span>
                    </div>

                    <button
                      onClick={() => setSelectedCow(cow)}
                      className="inline-flex items-center space-x-1.5 bg-brand-gold-500 hover:bg-brand-gold-600 text-white font-medium text-xs px-4 py-2.5 rounded-full shadow-sm hover:shadow transition-all duration-300 cursor-pointer"
                    >
                      <Heart className="w-3.5 h-3.5 fill-white" />
                      <span>Sponsor Gomata</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white border border-stone-200/60 rounded-3xl max-w-lg mx-auto space-y-4">
            <div className="w-16 h-16 bg-stone-50 rounded-full flex items-center justify-center text-zinc-400 mx-auto border border-stone-150">
              <Info className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-serif font-bold text-zinc-800">No cows found</h3>
            <p className="text-zinc-500 text-xs font-light max-w-sm mx-auto leading-relaxed">
              We couldn't find any cow matching "{searchTerm}". Please refine your filters or try a different search.
            </p>
          </div>
        )}
      </div>

      {/* Cow Sponsorship Modal */}
      <AnimatePresence>
        {selectedCow && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCow(null)}
              className="absolute inset-0 bg-zinc-950/60 backdrop-blur-sm"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-white rounded-3xl border border-stone-200 shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto relative z-10 p-6 md:p-8"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedCow(null)}
                className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-zinc-600 rounded-full hover:bg-stone-100 transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {adoptSuccess ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600 mx-auto border border-emerald-100">
                    <ShieldCheck className="w-10 h-10 animate-bounce" />
                  </div>
                  <h2 className="text-2xl font-serif font-bold text-zinc-900">Sponsorship Initialized!</h2>
                  <p className="text-zinc-500 text-sm font-light max-w-md mx-auto leading-relaxed">
                    Thank you for sponsoring <strong>{selectedCow.name}</strong>. Redirecting you to checkout options...
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Header Title */}
                  <div className="flex items-start space-x-4">
                    <div className="w-20 h-20 rounded-2xl overflow-hidden shrink-0 bg-stone-100">
                      <img src={selectedCow.image} alt={selectedCow.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <span className="text-[10px] text-brand-gold-700 uppercase tracking-widest font-bold font-sans">{selectedCow.breed} Breed Adoption</span>
                      <h2 className="text-2xl font-serif font-bold text-zinc-900">Sponsor {selectedCow.name}</h2>
                      <p className="text-xs text-zinc-500 mt-1 font-mono">Intake Date: {selectedCow.intakeDate}</p>
                    </div>
                  </div>

                  <hr className="border-stone-100" />

                  {/* Cow Bio Details */}
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-zinc-700 uppercase tracking-wider block font-sans">Gomata Biography</span>
                    <p className="text-sm font-light text-zinc-650 leading-relaxed bg-stone-50 p-4 rounded-2xl border border-stone-100">
                      {selectedCow.story}
                    </p>
                  </div>

                  {/* Pricing / Payment Sponsor Form */}
                  <form onSubmit={handleSponsorSubmit} className="space-y-4 pt-2">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-bold text-zinc-500 mb-1.5 uppercase tracking-wider font-sans">Sponsorship Period</label>
                        <select className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-gold-500 transition-all font-sans cursor-pointer">
                          <option>Monthly - ₹{selectedCow.sponsorshipCost}/mo</option>
                          <option>Quarterly - ₹{selectedCow.sponsorshipCost * 3} (Save 5%)</option>
                          <option>Half-Yearly - ₹{selectedCow.sponsorshipCost * 6} (Save 10%)</option>
                          <option>Yearly - ₹{selectedCow.sponsorshipCost * 12} (Save 15%)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-zinc-500 mb-1.5 uppercase tracking-wider font-sans">Donor Name</label>
                        <input
                          type="text"
                          required
                          placeholder="Your Full Name"
                          className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-gold-500 transition-all font-sans"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-bold text-zinc-500 mb-1.5 uppercase tracking-wider font-sans">Email Address</label>
                        <input
                          type="email"
                          required
                          placeholder="you@example.com"
                          className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-gold-500 transition-all font-sans"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-zinc-500 mb-1.5 uppercase tracking-wider font-sans">Phone Number</label>
                        <input
                          type="tel"
                          required
                          placeholder="+91 99999 99999"
                          className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-gold-500 transition-all font-sans"
                        />
                      </div>
                    </div>

                    <div className="bg-stone-50 p-4 rounded-2xl border border-stone-100 flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Tag className="w-4 h-4 text-brand-gold-500" />
                        <span className="text-xs font-light text-zinc-600">Secure tax-exempt donation (80G applicable)</span>
                      </div>
                      <span className="text-sm font-serif font-bold text-zinc-900">Total: ₹{selectedCow.sponsorshipCost}</span>
                    </div>

                    <div className="pt-2 flex space-x-3">
                      <button
                        type="button"
                        onClick={() => setSelectedCow(null)}
                        className="w-1/3 py-3 rounded-xl border border-stone-200 text-zinc-650 hover:bg-stone-50 text-xs font-semibold transition-all cursor-pointer text-center"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="w-2/3 py-3 rounded-xl bg-brand-gold-500 hover:bg-brand-gold-600 text-white font-bold text-xs shadow-md transition-all cursor-pointer flex items-center justify-center space-x-2"
                      >
                        <Heart className="w-4 h-4 fill-white" />
                        <span>Proceed to Pay</span>
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
