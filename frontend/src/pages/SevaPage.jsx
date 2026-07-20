import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, PlusCircle, Sparkles, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function SevaPage() {
  const sevas = [
    {
      id: "feed_day",
      title: "One-Day Cow Feed Seva",
      price: 501,
      tagline: "Feed a holy cow",
      description: "Provides fresh green grass, wheat bran, mustard oil cakes (khali), and clean drinking water for a cow for one full day.",
      badge: "Most Popular",
      color: "bg-zinc-950 hover:bg-brand-gold-600 text-white"
    },
    {
      id: "adopt_month",
      title: "Adopt a Cow (Monthly)",
      price: 2500,
      tagline: "Monthly sponsorship",
      description: "Covers complete nutritional diet, veterinary care, vaccine scheduling, and clean stall maintenance for 30 days.",
      badge: "Highly Blessed",
      color: "bg-brand-gold-500 hover:bg-brand-gold-600 text-white"
    },
    {
      id: "medical_care",
      title: "Injured Cow Medical Fund",
      price: 5000,
      tagline: "Critical emergency care",
      description: "Directly funds emergency surgeries, plastering, antibiotic courses, and on-site quarantine treatment for rescued street cows.",
      badge: "Urgent Need",
      color: "bg-zinc-950 hover:bg-brand-gold-600 text-white"
    },
    {
      id: "lifetime_adopt",
      title: "Lifetime Adopt & Sponsor",
      price: 21000,
      tagline: "Sacred lifetime bond",
      description: "Adopt a cow permanently. We provide lifelong care. You will receive updates, photos, and can visit to perform puja.",
      badge: "Devotion Level",
      color: "bg-brand-gold-500 hover:bg-brand-gold-600 text-white"
    },
    {
      id: "general_fund",
      title: "General NGO Seva",
      price: "Custom",
      tagline: "Every contribution counts",
      description: "Support expansion of modern cow sheds, solar water systems, organic manure production, and daily labor costs.",
      badge: "Flexible Support",
      color: "bg-zinc-950 hover:bg-brand-gold-600 text-white"
    }
  ];

  return (
    <div className="flex-1 bg-stone-50/50 py-16 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-brand-gold-700 font-bold text-xs uppercase tracking-widest bg-brand-gold-100/60 px-4 py-1.5 rounded-full inline-block mb-3 font-sans">
            Sponsorship Options
          </span>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-zinc-900 leading-tight">
            Perform Sacred Gau Seva
          </h1>
          <div className="h-1 w-20 bg-brand-gold-500 mx-auto mt-4 rounded-full"></div>
          <p className="text-zinc-500 mt-5 text-sm md:text-base font-light leading-relaxed">
            Your generous donation directly funds cow feeding, medical aid, and shelter preservation. Select a Seva package below to complete your contribution.
          </p>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sevas.map((seva, idx) => (
            <motion.div 
              key={seva.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.1 }}
              className="bg-white border border-stone-200/80 rounded-3xl p-6 md:p-8 hover:shadow-xl hover:border-brand-gold-200/80 transition-all duration-300 flex flex-col justify-between relative group cursor-default shadow-sm"
            >
              {/* Badge */}
              <div className="absolute top-4 right-4 bg-brand-gold-50 text-brand-gold-700 text-[10px] font-bold uppercase tracking-wider px-3.5 py-1 rounded-full border border-brand-gold-200/40">
                {seva.badge}
              </div>

              <div className="mt-2 space-y-4">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-zinc-400 font-bold block mb-1 font-sans">
                    {seva.tagline}
                  </span>
                  <h3 className="text-xl font-serif font-bold text-zinc-800 pr-16 group-hover:text-brand-gold-500 transition-colors">
                    {seva.title}
                  </h3>
                </div>
                
                {/* Price Display */}
                <div className="flex items-baseline space-x-1.5">
                  <span className="text-3xl font-serif font-extrabold text-zinc-900">
                    {typeof seva.price === 'number' ? `₹${seva.price.toLocaleString('en-IN')}` : seva.price}
                  </span>
                  {typeof seva.price === 'number' && (
                    <span className="text-zinc-500 text-xs font-light font-sans">INR</span>
                  )}
                </div>

                <p className="text-zinc-600 text-xs md:text-sm font-light leading-relaxed">
                  {seva.description}
                </p>
              </div>

              {/* Link CTA */}
              <div className="pt-8">
                <Link
                  to={`/donate?seva=${seva.id}`}
                  className={`w-full py-3.5 rounded-xl font-bold text-xs flex items-center justify-center space-x-1.5 shadow-sm transition-all duration-300 cursor-pointer ${seva.color}`}
                >
                  {seva.price === 'Custom' ? (
                    <PlusCircle className="w-4 h-4" />
                  ) : (
                    <Heart className="w-4 h-4 fill-white" />
                  )}
                  <span>{seva.price === 'Custom' ? 'Enter Custom Amount' : 'Sponsor Seva'}</span>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}
