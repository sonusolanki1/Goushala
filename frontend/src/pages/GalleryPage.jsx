import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Play, X, Heart, Maximize2, Tag } from 'lucide-react';

const GALLERY_DATA = [
  {
    id: 1,
    title: 'Morning Vedic Gau Puja',
    category: 'Gau Puja',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?auto=format&fit=crop&w=1200&q=80',
    desc: 'Performing traditional rituals and offering fresh flowers to Gomata.'
  },
  {
    id: 2,
    title: 'Daily Veterinary Checkup',
    category: 'Vet Clinic',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1589923188900-85dae440342b?auto=format&fit=crop&w=1200&q=80',
    desc: 'Our specialized resident veterinarians conducting bi-weekly health scans.'
  },
  {
    id: 3,
    title: 'Clover Feeding in Main Pasture',
    category: 'Feeding Seva',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1596733430284-f7437764b1a9?auto=format&fit=crop&w=1200&q=80',
    desc: 'Cows feeding on high-protein green fodder and organic mustard oil cakes.'
  },
  {
    id: 4,
    title: 'Newborn Calf Nursery Care',
    category: 'Shelter Life',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1546445317-29f4545e9d53?auto=format&fit=crop&w=1200&q=80',
    desc: 'Rescued calves resting in our climate-regulated indoor barn nursery.'
  },
  {
    id: 5,
    title: 'Organic Fodder Cultivation',
    category: 'Feeding Seva',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1200&q=80',
    desc: 'Growing organic Napier grass across our 12-acre pasture fields.'
  },
  {
    id: 6,
    title: 'Shelter Expansion Construction',
    category: 'Shelter Life',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1527153857715-3908f2bac5e8?auto=format&fit=crop&w=1200&q=80',
    desc: 'Erecting brand-new weather-proof shed structures for rescued cattle.'
  },
  {
    id: 7,
    title: 'Volunteers Distributing Apples',
    category: 'Feeding Seva',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1484557052118-f32bd25b45b5?auto=format&fit=crop&w=1200&q=80',
    desc: 'School kids visiting the shelter to hand-feed fresh apples to calves.'
  },
  {
    id: 8,
    title: 'Community Kartik Puja Festival',
    category: 'Gau Puja',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1534067783941-51c9c23eccfd?auto=format&fit=crop&w=1200&q=80',
    desc: 'Devotees gather for Kartik Maas Gau Seva prayers and Gopashtami celebrations.'
  }
];

export default function GalleryPage() {
  const [activeTab, setActiveTab] = useState('All');
  const [activeItem, setActiveItem] = useState(null);

  const tabs = ['All', 'Gau Puja', 'Feeding Seva', 'Shelter Life', 'Vet Clinic'];

  const filteredItems = activeTab === 'All'
    ? GALLERY_DATA
    : GALLERY_DATA.filter(item => item.category === activeTab);

  return (
    <div className="flex-1 bg-stone-50/50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-brand-gold-700 font-bold text-xs uppercase tracking-widest bg-brand-gold-100/60 px-4 py-1.5 rounded-full inline-block mb-3 font-sans">
            Visual Tour
          </span>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-zinc-900 leading-tight">
            Goushala Photo & Media Gallery
          </h1>
          <div className="h-1 w-20 bg-brand-gold-500 mx-auto mt-4 rounded-full"></div>
          <p className="text-zinc-500 mt-5 text-sm md:text-base font-light leading-relaxed">
            Take a visual walkthrough of our shelter, veterinary operations, daily feeding schedules, and holy Gau Puja celebrations.
          </p>
        </div>

        {/* Categories Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-300 cursor-pointer ${
                activeTab === tab
                  ? 'bg-zinc-950 text-white shadow-md'
                  : 'bg-white border border-stone-200 text-zinc-650 hover:bg-stone-50'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Media Grid */}
        <motion.div 
          layout 
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                onClick={() => setActiveItem(item)}
                className="bg-white border border-stone-200/80 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl group transition-all duration-300 cursor-pointer flex flex-col h-full"
              >
                {/* Media Wrapper */}
                <div className="relative aspect-[4/3] w-full bg-stone-100 overflow-hidden">
                  <img
                    src={item.url}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                  {/* Overlay Icon */}
                  <div className="absolute inset-0 bg-zinc-950/20 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                    <div className="bg-white/95 text-zinc-900 p-3 rounded-full shadow-lg scale-90 group-hover:scale-100 transition-all duration-300">
                      <Maximize2 className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Category Label */}
                  <div className="absolute top-4 left-4 bg-zinc-950/70 backdrop-blur-sm px-3 py-1 rounded-xl text-white text-[10px] uppercase font-bold tracking-wider flex items-center space-x-1.5">
                    <Tag className="w-3 h-3 text-brand-gold-400" />
                    <span>{item.category}</span>
                  </div>
                </div>

                {/* Info block */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div className="space-y-1">
                    <h3 className="font-serif font-bold text-zinc-800 text-sm group-hover:text-brand-gold-500 transition-colors duration-350">
                      {item.title}
                    </h3>
                    <p className="text-zinc-550 text-xs font-light leading-relaxed line-clamp-2">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty state if no images */}
        {filteredItems.length === 0 && (
          <div className="text-center py-20 bg-white border border-stone-200/60 rounded-3xl max-w-md mx-auto space-y-4">
            <div className="w-16 h-16 bg-stone-50 rounded-full flex items-center justify-center text-zinc-400 mx-auto border border-stone-150">
              <Camera className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-serif font-bold text-zinc-800">No media available</h3>
            <p className="text-zinc-550 text-xs font-light leading-relaxed">
              We haven't uploaded media files under "{activeTab}" yet. Please check back later.
            </p>
          </div>
        )}
      </div>

      {/* Lightbox / Image Zoom Modal */}
      <AnimatePresence>
        {activeItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveItem(null)}
              className="absolute inset-0 bg-zinc-950/90 backdrop-blur-md"
            />

            {/* Lightbox Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-4xl max-h-[90vh] flex flex-col items-center justify-center relative z-10 space-y-4"
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveItem(null)}
                className="absolute -top-12 right-0 p-2 text-white/70 hover:text-white rounded-full bg-white/10 hover:bg-white/20 transition-all cursor-pointer"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="bg-white rounded-3xl overflow-hidden border border-white/10 shadow-2xl w-full flex flex-col md:flex-row max-h-[75vh]">
                {/* Photo */}
                <div className="flex-1 bg-zinc-950 flex items-center justify-center overflow-hidden aspect-[4/3] md:aspect-auto">
                  <img
                    src={activeItem.url}
                    alt={activeItem.title}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>

                {/* Details Sidebar in Lightbox */}
                <div className="w-full md:w-80 bg-white p-6 md:p-8 flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    <span className="text-[10px] text-brand-gold-700 uppercase tracking-widest font-bold font-sans">
                      {activeItem.category}
                    </span>
                    <h2 className="text-xl md:text-2xl font-serif font-bold text-zinc-900 leading-tight">
                      {activeItem.title}
                    </h2>
                    <p className="text-zinc-650 text-xs md:text-sm font-light leading-relaxed">
                      {activeItem.desc}
                    </p>
                  </div>

                  <div className="pt-6 border-t border-stone-100 flex flex-col space-y-3">
                    <div className="flex justify-between items-center text-xs font-mono text-zinc-400">
                      <span>File Format: JPG</span>
                      <span>High Res</span>
                    </div>
                    <button
                      onClick={() => {
                        setActiveItem(null);
                        // Redirect to donate or trigger sponsorship
                      }}
                      className="w-full bg-brand-gold-500 hover:bg-brand-gold-600 text-white font-bold text-xs py-3 rounded-xl shadow-sm transition-all cursor-pointer flex items-center justify-center space-x-2"
                    >
                      <Heart className="w-4 h-4 fill-white" />
                      <span>Sponsor this Activity</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
