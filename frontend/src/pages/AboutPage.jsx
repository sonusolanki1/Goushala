import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShieldCheck, Award, Flame, Star, Sparkles, Camera } from 'lucide-react';

export default function AboutPage() {
  const coreValues = [
    {
      icon: <ShieldCheck className="w-6 h-6 text-brand-gold-600" />,
      title: "Rescuing & Rehabilitation",
      desc: "Providing a permanent, safe shelter to cows rescued from illegal slaughter houses, highway accidents, and severe neglect."
    },
    {
      icon: <Award className="w-6 h-6 text-brand-gold-600" />,
      title: "Veterinary Excellence",
      desc: "An on-site clinic running 24/7 with professional doctors to treat sick or accidental cow victims."
    },
    {
      icon: <Flame className="w-6 h-6 text-brand-gold-600" />,
      title: "Spiritual Goushala Environment",
      desc: "Surrounding Gomata with positive, divine energies using regular morning pujas, sweet music, and Vedic chants."
    },
    {
      icon: <Star className="w-6 h-6 text-brand-gold-600" />,
      title: "Panchagavya Organic Farming",
      desc: "Utilizing cow dung manure and bio-pesticides to encourage ecofriendly, chemical-free organic farming practices."
    }
  ];

  return (
    <div className="flex-1 animate-fadeIn bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-brand-gold-700 font-bold text-xs uppercase tracking-widest bg-brand-gold-100/60 px-4 py-1.5 rounded-full inline-block mb-3">
            Our NGO Mission
          </span>
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-slate-900 leading-tight">
            About Our Goushala & NGO
          </h1>
          <div className="h-1.5 w-24 bg-gradient-to-r from-brand-gold-400 to-amber-600 mx-auto mt-4 rounded-full"></div>
          <p className="text-slate-500 mt-6 text-base md:text-lg font-light leading-relaxed">
            Krishna Govind Seva Sansthan is a registered non-governmental organization (NGO) operating with a deep spiritual commitment to cow care.
          </p>
        </div>

        {/* Narrative Grid (incorporates seva1.jpeg & seva4.jpeg) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24">
          {/* Left Text Block */}
          <div className="lg:col-span-6 space-y-6">
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-slate-800">
              Mother Gomata: The Heart of Our NGO
            </h2>
            <p className="text-slate-650 leading-relaxed font-light text-sm">
              In traditional Indian culture, the cow is treated with high honor and maternal affection. Today, hundreds of non-lactating, sick, or elderly cows are left on the streets. Our NGO acts as a protective shield, rescuing them and providing a green, safe habitat.
            </p>
            <p className="text-slate-650 leading-relaxed font-light text-sm">
              In our Vrindavan sanctuary, cows roam free in large green pastures. We provide daily fresh wheat straw, water, and specialized veterinary medicine. Every single contribution made to our NGO translates directly to food, medicine, and clean sheds.
            </p>
            
            <div className="bg-brand-gold-50 border border-brand-gold-100 rounded-2xl p-6 flex flex-col space-y-2">
              <span className="text-xs font-bold text-brand-gold-700 uppercase tracking-wider">Registration Credentials</span>
              <p className="text-xs text-slate-600 leading-relaxed">
                Krishna Govind Seva Sansthan is registered under NGO act registration No. <strong>IV-108/2024</strong>. 
                Donations made to our Goushala NGO qualify for tax deduction benefits, with detailed receipt records.
              </p>
            </div>
          </div>

          {/* Right Image Frame Grid (incorporating seva1 and seva4) */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-6">
            
            {/* Image card 1 (seva1.jpeg) */}
            <div className="relative rounded-3xl overflow-hidden shadow-lg border-2 border-slate-100 group aspect-[3/4]">
              <img 
                src="/seva1.jpeg" 
                alt="Gir Cow at our NGO" 
                className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                onError={(e) => {
                  e.target.onerror = null; 
                  e.target.src = "https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?auto=format&fit=crop&w=800&q=80";
                }}
              />
              <div className="absolute bottom-3 left-3 bg-slate-900/80 backdrop-blur-sm px-2.5 py-1.5 rounded-lg text-white text-[10px] flex items-center space-x-1 border border-white/5">
                <Camera className="w-3 h-3 text-brand-gold-400" />
                <span>Our Gir Cows</span>
              </div>
            </div>

            {/* Image card 2 (seva4.jpeg) */}
            <div className="space-y-6 flex flex-col justify-between">
              
              <div className="relative rounded-3xl overflow-hidden shadow-lg border-2 border-slate-100 group aspect-square">
                <img 
                  src="/seva4.jpeg" 
                  alt="Holy Calf playing" 
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                  onError={(e) => {
                    e.target.onerror = null; 
                    e.target.src = "https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?auto=format&fit=crop&w=800&q=80";
                  }}
                />
                <div className="absolute bottom-3 left-3 bg-slate-900/80 backdrop-blur-sm px-2.5 py-1.5 rounded-lg text-white text-[10px] flex items-center space-x-1 border border-white/5">
                  <Camera className="w-3 h-3 text-brand-gold-400" />
                  <span>Young Calf Shelter</span>
                </div>
              </div>

              {/* Stat block */}
              <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-md relative overflow-hidden flex-1 flex flex-col justify-center">
                <h4 className="text-sm font-serif font-semibold text-brand-gold-400">Our Vow</h4>
                <p className="text-[10px] text-slate-350 italic mt-1 leading-relaxed">
                  "No cow entering our sanctuary will ever be neglected, sold, or abandoned."
                </p>
              </div>

            </div>

          </div>
        </div>

        {/* Core Pillars */}
        <div className="mb-24">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-slate-850">
              The Four Pillars of NGO Gau Seva
            </h2>
            <div className="h-1 w-16 bg-brand-gold-500 mx-auto mt-3 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {coreValues.map((pillar, idx) => (
              <div key={idx} className="bg-brand-gold-50/15 p-8 rounded-3xl border border-brand-gold-100 hover:shadow-md transition-all duration-300 flex space-x-4">
                <div className="bg-brand-gold-100 p-3 rounded-2xl h-fit shrink-0 text-brand-gold-700">
                  {pillar.icon}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-850 font-serif mb-2">{pillar.title}</h3>
                  <p className="text-sm text-slate-500 font-light leading-relaxed">{pillar.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA to Seva */}
        <div className="bg-gradient-to-r from-brand-gold-500 to-amber-600 rounded-3xl p-8 md:p-12 text-center text-white space-y-6 shadow-xl max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-4xl font-serif font-bold">
            Support Our NGO Cow Welfare Mission
          </h2>
          <p className="text-slate-100/90 text-sm md:text-base font-light max-w-2xl mx-auto leading-relaxed">
            Help our NGO buy green grass fodder, medicines, and expand our shelter capacity. Perform online seva today.
          </p>
          <div className="pt-2">
            <Link
              to="/donate"
              className="inline-flex items-center justify-center space-x-2 bg-slate-950 text-white font-bold px-8 py-4 rounded-full shadow-lg hover:scale-105 transition-transform"
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
