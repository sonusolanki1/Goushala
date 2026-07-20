import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShieldCheck, Award, Flame, Star, Sparkles, Camera, Heart, CheckCircle2 } from 'lucide-react';

export default function AboutPage() {
  const coreValues = [
    {
      icon: <ShieldCheck className="w-5 h-5 text-brand-gold-500" />,
      title: "Rescue & Rehabilitation",
      desc: "Providing a permanent, safe shelter to cows rescued from illegal cattle trafficking, highway accidents, and rural abandonment."
    },
    {
      icon: <Award className="w-5 h-5 text-brand-gold-500" />,
      title: "Veterinary Sanctuary Clinic",
      desc: "An on-site hospital running 24/7 with resident doctors to perform diagnostics, surgeries, and distribute seasonal vaccines."
    },
    {
      icon: <Flame className="w-5 h-5 text-brand-gold-500" />,
      title: "Vedic Spiritual Environment",
      desc: "Surrounding Gomata with positive energies using regular morning pujas, sweet chanting, and a tranquil pasture habitat."
    },
    {
      icon: <Star className="w-5 h-5 text-brand-gold-500" />,
      title: "Organic Panchagavya Ecology",
      desc: "Manufacturing biological pest repellents and organic manure from cow dung & urine, helping local farmers avoid chemicals."
    }
  ];

  return (
    <div className="flex-1 bg-stone-50/50 py-16 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-brand-gold-700 font-bold text-xs uppercase tracking-widest bg-brand-gold-100/60 px-4 py-1.5 rounded-full inline-block mb-3 font-sans">
            Our NGO Mission
          </span>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-zinc-900 leading-tight">
            About Our Goushala & Trust
          </h1>
          <div className="h-1 w-20 bg-brand-gold-500 mx-auto mt-4 rounded-full"></div>
          <p className="text-zinc-500 mt-5 text-sm md:text-base font-light leading-relaxed">
            Krishna Govind Seva Sansthan is a registered non-governmental organization (NGO) operating with a deep spiritual commitment to sacred cow protection in Rajasthan.
          </p>
        </div>

        {/* Narrative Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24">
          
          {/* Left Text Block */}
          <div className="lg:col-span-6 space-y-6">
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-zinc-900 leading-snug">
              Sacred Gomata: The Mothers of the Universe
            </h2>
            <p className="text-zinc-655 leading-relaxed font-light text-sm">
              In traditional Indian culture, the cow is treated with high honor and maternal affection. Today, hundreds of non-lactating, sick, or elderly cows are left on the streets due to urbanization. Our NGO acts as a protective shield, rescuing them and providing a green, safe habitat.
            </p>
            <p className="text-zinc-655 leading-relaxed font-light text-sm">
              In our sanctuary pastures, cows roam free. We provide daily fresh wheat straw, high-protein mustard oil cakes, and specialized veterinary medicine. Every single contribution made to our NGO translates directly to food, medicine, and clean sheds.
            </p>
            
            <div className="bg-white border border-stone-200 shadow-sm rounded-2xl p-5 space-y-2">
              <span className="text-xs font-bold text-brand-gold-700 uppercase tracking-wider block font-sans">Registration Credentials</span>
              <p className="text-xs text-zinc-500 font-light leading-relaxed">
                Krishna Govind Seva Sansthan is registered under NGO act registration No. <strong>IV-108/2024</strong>. Donations made to our Goushala qualify for tax deduction benefits under Section 80G, with detailed digital logs.
              </p>
            </div>
          </div>

          {/* Right Image Frame Grid */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-6">
            
            {/* Image card 1 (seva1.jpeg) */}
            <div className="relative rounded-3xl overflow-hidden shadow-sm border border-stone-200 group aspect-[3/4] bg-white">
              <img 
                src="/seva1.jpeg" 
                alt="Gir Cow at our NGO" 
                className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                onError={(e) => {
                  e.target.onerror = null; 
                  e.target.src = "https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?auto=format&fit=crop&w=800&q=80";
                }}
              />
              <div className="absolute bottom-3 left-3 bg-zinc-950/80 backdrop-blur-sm px-2.5 py-1.5 rounded-lg text-white text-[9px] font-bold uppercase tracking-wider flex items-center space-x-1 border border-white/5 font-sans">
                <Camera className="w-3.5 h-3.5 text-brand-gold-400" />
                <span>Our Gir Breed</span>
              </div>
            </div>

            {/* Image card 2 (seva4.jpeg) */}
            <div className="space-y-6 flex flex-col justify-between">
              
              <div className="relative rounded-3xl overflow-hidden shadow-sm border border-stone-200 group aspect-square bg-white">
                <img 
                  src="/seva4.jpeg" 
                  alt="Holy Calf playing" 
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                  onError={(e) => {
                    e.target.onerror = null; 
                    e.target.src = "https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?auto=format&fit=crop&w=800&q=80";
                  }}
                />
                <div className="absolute bottom-3 left-3 bg-zinc-950/80 backdrop-blur-sm px-2.5 py-1.5 rounded-lg text-white text-[9px] font-bold uppercase tracking-wider flex items-center space-x-1 border border-white/5 font-sans">
                  <Camera className="w-3.5 h-3.5 text-brand-gold-400" />
                  <span>Calf Nursery</span>
                </div>
              </div>

              {/* Stat block */}
              <div className="bg-zinc-950 text-white rounded-3xl p-6 shadow-md relative overflow-hidden flex-1 flex flex-col justify-center border border-zinc-900">
                <h4 className="text-xs font-serif font-bold text-brand-gold-500 uppercase tracking-wider">Our Sacred Vow</h4>
                <p className="text-[10px] text-slate-400 italic mt-1.5 leading-relaxed font-light">
                  "No cow entering our sanctuary will ever be sold, neglected, or abandoned again."
                </p>
              </div>

            </div>

          </div>
        </div>

        {/* Core Pillars */}
        <div className="mb-24">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-zinc-900">
              The Four Pillars of Gau Seva
            </h2>
            <div className="h-1 w-16 bg-brand-gold-500 mx-auto mt-3 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {coreValues.map((pillar, idx) => (
              <div key={idx} className="bg-white p-8 rounded-3xl border border-stone-200 hover:shadow-lg transition-all duration-350 flex space-x-4 group cursor-default">
                <div className="bg-brand-gold-500/10 p-3 rounded-2xl h-fit shrink-0 border border-brand-gold-500/20">
                  {pillar.icon}
                </div>
                <div>
                  <h3 className="text-base font-bold text-zinc-900 font-serif mb-2 group-hover:text-brand-gold-500 transition-colors duration-300">{pillar.title}</h3>
                  <p className="text-xs text-zinc-550 font-light leading-relaxed">{pillar.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA to Seva */}
        <div className="bg-zinc-950 border border-zinc-900 rounded-3xl p-8 md:p-12 text-center text-white space-y-6 shadow-xl max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-serif font-bold">
            Support Our Cow Protection Mission
          </h2>
          <p className="text-slate-400 text-xs md:text-sm font-light max-w-2xl mx-auto leading-relaxed">
            Help our trust buy green grass fodder, medical injections, and expand shelter barn capacities. Perform online seva today.
          </p>
          <div className="pt-2">
            <Link
              to="/donate"
              className="inline-flex items-center justify-center space-x-2 bg-brand-gold-500 hover:bg-brand-gold-600 text-white font-bold px-8 py-4 rounded-full shadow-lg transition-transform hover:scale-[1.02] text-xs"
            >
              <Heart className="w-4 h-4 fill-white" />
              <span>Contribute Seva Online</span>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
