import React from 'react';
import { ShieldCheck, Heart, Sparkles, Smile } from 'lucide-react';

export default function About() {
  const highlights = [
    {
      icon: <ShieldCheck className="w-6 h-6" />,
      title: "Safe Haven & Protection",
      description: "Providing shelter to abandoned, old, and non-lactating cows, shielding them from cruelty and trafficking."
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Loving & Holistic Care",
      description: "Cows are treated with dignity, regular feeding of fresh grass, nutritious feed, and spiritual chants."
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "Medical & Healing Center",
      description: "An on-site medical clinic with experienced veterinarians to treat injured, sick, or accidental cow cases."
    },
    {
      icon: <Smile className="w-6 h-6" />,
      title: "Organic Cow Products",
      description: "Developing organic manure and Panchagavya medicines to promote environment-friendly organic farming."
    }
  ];

  return (
    <section id="about" className="py-24 bg-gradient-to-b from-amber-50/10 via-amber-100/20 to-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-brand-gold-700 font-bold text-xs uppercase tracking-widest bg-brand-gold-100/60 px-4 py-1.5 rounded-full inline-block mb-3">
            Who We Are
          </span>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-slate-900 leading-tight">
            Serving Gomata with Eternal Love and Devotion
          </h2>
          <div className="h-1.5 w-24 bg-gradient-to-r from-brand-gold-400 to-amber-600 mx-auto mt-4 rounded-full"></div>
          <p className="text-slate-600 mt-6 text-base md:text-lg font-light leading-relaxed">
            Krishna Govind Seva Sansthan NGO operates with a singular focus: to serve the sacred cows.
            We believe that cow protection brings prosperity, peace, and spiritual harmony to humanity.
          </p>
        </div>

        {/* Narrative & Image Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          {/* Left Text Column */}
          <div className="lg:col-span-6 space-y-6">
            <h3 className="text-2xl md:text-3xl font-bold font-serif text-slate-800">
              Our Vision: No Cow Left Distressed
            </h3>
            <p className="text-slate-600 leading-relaxed font-light">
              In Vedic culture, the cow is revered as a mother. Today, many old, injured, and non-milking cows are abandoned on streets.
              Our Goushala is a dedicated sanctuary where they receive complete nutritional care, regular medical attention, and a lifetime of affection.
            </p>
            <p className="text-slate-600 leading-relaxed font-light">
              We cultivate green pastures, source high-quality wheat bran, and maintain dry grass silos. Our veterinary doctors perform operations, treat foot-and-mouth disease, and provide emergency aid to road accident victims.
            </p>

            {/* Simple Quote */}
            <div className="border-l-4 border-brand-gold-500 pl-4 py-2 bg-amber-50/50 rounded-r-lg">
              <p className="italic text-slate-700 font-serif text-sm">
                "To serve cows is to serve Lord Krishna Himself. Every drop of water, every blade of grass offered to Gomata returns as infinite blessings."
              </p>
              <span className="text-xs font-semibold text-amber-800 mt-1 block">— Trust Acharya</span>
            </div>
          </div>

          {/* Right Image/Features Column */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {highlights.map((item, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-2xl shadow-sm border border-amber-100 hover:shadow-lg hover:border-brand-gold-200 hover:-translate-y-1 transition-all duration-350 group cursor-default"
              >
                <div className="bg-amber-50 text-brand-gold-600 p-3 rounded-xl w-fit group-hover:bg-brand-gold-500 group-hover:text-white transition-all duration-350 shadow-sm">
                  {item.icon}
                </div>
                <h4 className="text-lg font-bold text-slate-800 mt-4 font-serif group-hover:text-brand-gold-700 transition-colors duration-300">
                  {item.title}
                </h4>
                <p className="text-slate-500 text-sm mt-2 font-light leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Dynamic Stats Banner */}
        <div className="bg-gradient-to-r from-brand-green-700 to-brand-green-800 text-white rounded-3xl p-8 md:p-12 shadow-xl grid grid-cols-2 lg:grid-cols-4 gap-8 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-2xl -mr-20 -mt-20"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-brand-gold-400/10 rounded-full blur-2xl -ml-20 -mb-20"></div>

          <div className="z-10">
            <span className="text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-brand-gold-300 to-amber-300 block font-serif">350+</span>
            <span className="text-xs uppercase tracking-wider text-emerald-100 font-medium mt-2 block">Protected Cows</span>
          </div>
          <div className="z-10">
            <span className="text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-brand-gold-300 to-amber-300 block font-serif">12+</span>
            <span className="text-xs uppercase tracking-wider text-emerald-100 font-medium mt-2 block">Acres of Green Pastures</span>
          </div>
          <div className="z-10">
            <span className="text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-brand-gold-300 to-amber-300 block font-serif">15,000+</span>
            <span className="text-xs uppercase tracking-wider text-emerald-100 font-medium mt-2 block">Daily Meals Served</span>
          </div>
          <div className="z-10">
            <span className="text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-brand-gold-300 to-amber-300 block font-serif">2,400+</span>
            <span className="text-xs uppercase tracking-wider text-emerald-100 font-medium mt-2 block">Medical Recoveries</span>
          </div>
        </div>

      </div>
    </section>
  );
}
