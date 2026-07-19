import React from 'react';
import { Heart, Sparkles, PlusCircle } from 'lucide-react';

export default function SevaCards({ onSelectSeva }) {
  const sevas = [
    {
      id: "feed_day",
      title: "One-Day Cow Feed Seva",
      price: 501,
      tagline: "Feed a holy cow",
      description: "Provides fresh green grass, wheat bran, oil cakes (khali), and clean drinking water for a cow for one day.",
      badge: "Most Popular",
      color: "from-amber-500 to-amber-600"
    },
    {
      id: "adopt_month",
      title: "Adopt a Cow (Monthly)",
      price: 2500,
      tagline: "Monthly sponsorship",
      description: "Covers complete nutritional diet, veterinary care, vaccine scheduling, and clean stall maintenance for 30 days.",
      badge: "Highly Blessed",
      color: "from-brand-gold-500 to-amber-700"
    },
    {
      id: "medical_care",
      title: "Injured Cow Medical Fund",
      price: 5000,
      tagline: "Critical emergency care",
      description: "Directly funds emergency surgeries, plastering, antibiotic courses, and on-site quarantine treatment for rescued cows.",
      badge: "Urgent Need",
      color: "from-red-500 to-red-600"
    },
    {
      id: "lifetime_adopt",
      title: "Lifetime Adopt & Sponsor",
      price: 21000,
      tagline: "Sacred lifetime bond",
      description: "Adopt a cow permanently. We provide lifelong care. You will receive updates, photos, and can visit to perform puja.",
      badge: "Devotion Level",
      color: "from-brand-green-600 to-brand-green-700"
    },
    {
      id: "general_fund",
      title: "General Trust Seva",
      price: "Custom",
      tagline: "Every contribution counts",
      description: "Support expansion of modern cow sheds, solar water systems, organic manure production, and daily labor costs.",
      badge: "Flexible Support",
      color: "from-slate-700 to-slate-800"
    }
  ];

  return (
    <section id="seva" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-brand-green-700 font-bold text-xs uppercase tracking-widest bg-emerald-50 px-4 py-1.5 rounded-full inline-block mb-3">
            Gau Seva Options
          </span>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-slate-900 leading-tight">
            Select a Holy Seva Contribution
          </h2>
          <div className="h-1.5 w-24 bg-gradient-to-r from-brand-gold-400 to-amber-600 mx-auto mt-4 rounded-full"></div>
          <p className="text-slate-600 mt-6 text-base md:text-lg font-light leading-relaxed">
            Your generous donation directly funds cow feeding, medical aid, and shelter preservation. 
            Select one of the sevas below or contribute a custom amount to make a difference.
          </p>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sevas.map((seva) => (
            <div 
              key={seva.id} 
              className="bg-amber-50/20 rounded-3xl p-8 border border-amber-100 hover:border-brand-gold-300 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between relative group"
            >
              {/* Badge */}
              <div className="absolute top-4 right-4 bg-brand-gold-50 text-brand-gold-800 text-xs font-semibold px-3 py-1 rounded-full border border-brand-gold-200">
                {seva.badge}
              </div>

              <div>
                <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold block mb-1">
                  {seva.tagline}
                </span>
                <h3 className="text-xl md:text-2xl font-serif font-bold text-slate-800 mb-4 pr-16 group-hover:text-brand-gold-700 transition-colors">
                  {seva.title}
                </h3>
                
                {/* Price Display */}
                <div className="flex items-baseline space-x-1 mb-6">
                  <span className="text-3xl md:text-4xl font-extrabold font-serif text-slate-950">
                    {typeof seva.price === 'number' ? `₹${seva.price.toLocaleString('en-IN')}` : seva.price}
                  </span>
                  {typeof seva.price === 'number' && (
                    <span className="text-slate-500 text-sm font-medium">INR</span>
                  )}
                </div>

                <p className="text-slate-600 text-sm leading-relaxed font-light mb-8">
                  {seva.description}
                </p>
              </div>

              {/* Submit CTA */}
              <button
                onClick={() => onSelectSeva(seva)}
                className={`w-full py-4 rounded-2xl text-white font-semibold flex items-center justify-center space-x-2 bg-gradient-to-r ${seva.color} shadow-md group-hover:shadow-lg group-hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 cursor-pointer`}
              >
                {seva.price === 'Custom' ? (
                  <PlusCircle className="w-5 h-5" />
                ) : (
                  <Heart className="w-5 h-5 fill-white stroke-white" />
                )}
                <span>{seva.price === 'Custom' ? 'Enter Amount' : 'Sponsor Seva'}</span>
              </button>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
