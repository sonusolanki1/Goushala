import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShieldCheck, Sparkles, ArrowRight, Camera } from 'lucide-react';
import Hero from '../components/Hero';

export default function Home() {
  const galleryItems = [
    {
      img: '/seva1.jpeg',
      title: 'Desi Gir Cow Protection',
      desc: 'Sustaining pure indigenous breeds under dedicated Vedic shelter environments.'
    },
    {
      img: '/seva3.jpeg',
      title: 'Veterinary Sanctuary Care',
      desc: 'Our critical clinic unit providing immediate first-aid, medicines, and surgery for street cows.'
    },
    {
      img: '/seva5.jpeg',
      title: 'Our Calf Nursery Care',
      desc: 'Specialized nurturing, fresh grass silos, and milk feed scheduling for abandoned calves.'
    }
  ];

  return (
    <div className="flex-1 animate-fadeIn bg-white">
      {/* Hero Section */}
      <Hero />

      {/* NGO Welcome & Core Mission */}
      <section className="py-24 relative overflow-hidden bg-brand-gold-50/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Narrative Content */}
            <div className="lg:col-span-7 space-y-6">
              <span className="text-brand-gold-700 font-bold text-xs uppercase tracking-widest bg-brand-gold-100/60 px-4 py-1.5 rounded-full inline-block">
                Registered NGO Sanctuary
              </span>
              <h2 className="text-3xl md:text-5xl font-serif font-bold text-slate-900 leading-tight">
                Krishna Govind Seva Sansthan NGO
              </h2>
              <div className="h-1.5 w-24 bg-gradient-to-r from-brand-gold-400 to-brand-gold-600 rounded-full"></div>
              
              <p className="text-slate-650 text-base md:text-lg font-light leading-relaxed">
                We are a dedicated non-governmental organization (NGO) committed to saving, sheltering, and rehabilitating distressed street cows. 
                Our Goushala in Vrindavan serves as a permanent, loving home for over 350+ cows that were abandoned, sick, or injured.
              </p>
              
              <p className="text-slate-500 font-light leading-relaxed text-sm">
                Every cow at our sanctuary is treated as a mother. We feed them high-protein wheat bran, organic mustard oil cakes, 
                and fresh green grass daily. Through public donations, our NGO ensures that no cow is left neglected on the streets.
              </p>

              <div className="pt-4 flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                <Link
                  to="/about"
                  className="inline-flex items-center justify-center space-x-2 bg-slate-900 hover:bg-slate-800 text-white font-medium px-6 py-3.5 rounded-full transition-all duration-300"
                >
                  <span>Our NGO Story</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/donate"
                  className="inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-brand-gold-500 to-amber-600 text-white font-semibold px-6 py-3.5 rounded-full shadow-md hover:scale-102 transition-transform duration-300"
                >
                  <Heart className="w-4 h-4 fill-white" />
                  <span>Donate Online</span>
                </Link>
              </div>
            </div>

            {/* Right Column: Dynamic Welcome Image (seva2.jpeg) */}
            <div className="lg:col-span-5 relative">
              {/* Background accent ring */}
              <div className="absolute -inset-4 bg-brand-gold-500/10 rounded-3xl blur-2xl -z-10"></div>
              
              <div className="relative border-4 border-white shadow-2xl rounded-3xl overflow-hidden aspect-[4/3] group">
                <img 
                  src="/seva2.jpeg" 
                  alt="Holy Cow at Krishna Govind NGO" 
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                  onError={(e) => {
                    e.target.onerror = null; 
                    e.target.src = "https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?auto=format&fit=crop&w=800&q=80"; // Fallback image
                  }}
                />
                
                {/* Visual Accent Badge */}
                <div className="absolute bottom-4 left-4 bg-slate-900/80 backdrop-blur-sm px-4 py-2 rounded-xl text-white border border-white/10 text-xs font-serif flex items-center space-x-2">
                  <Sparkles className="w-3.5 h-3.5 text-brand-gold-400" />
                  <span>Gomata at our Sanctuary</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Short quick Stats Banner */}
      <section className="bg-slate-900 text-white py-16 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          <div className="space-y-1">
            <span className="text-3xl md:text-5xl font-serif font-bold text-brand-gold-500">350+</span>
            <p className="text-xs uppercase tracking-wider text-slate-400 mt-1">Sheltered Cows</p>
          </div>
          <div className="space-y-1">
            <span className="text-3xl md:text-5xl font-serif font-bold text-brand-gold-500">12+</span>
            <p className="text-xs uppercase tracking-wider text-slate-400 mt-1">Acres Pasture</p>
          </div>
          <div className="space-y-1">
            <span className="text-3xl md:text-5xl font-serif font-bold text-brand-gold-500">15,000+</span>
            <p className="text-xs uppercase tracking-wider text-slate-400 mt-1">Daily Meals</p>
          </div>
          <div className="space-y-1">
            <span className="text-3xl md:text-5xl font-serif font-bold text-brand-gold-500">24/7</span>
            <p className="text-xs uppercase tracking-wider text-slate-400 mt-1">Veterinary Support</p>
          </div>
        </div>
      </section>

      {/* Gomata Gallery Section (seva1, seva3, seva5) */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-brand-gold-700 font-bold text-xs uppercase tracking-widest bg-brand-gold-50 px-4 py-1.5 rounded-full inline-block mb-3">
              Sanctuary Life
            </span>
            <h2 className="text-2xl md:text-4xl font-serif font-bold text-slate-900">
              Gomata Gallery & Shelter Snippets
            </h2>
            <div className="h-1 w-16 bg-brand-gold-500 mx-auto mt-3 rounded-full"></div>
            <p className="text-slate-500 text-sm font-light mt-4 leading-relaxed">
              Real visual updates from our Goushala. Witness how your monthly sponsorships keep Gomata healthy and well cared for.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {galleryItems.map((item, idx) => (
              <div 
                key={idx} 
                className="bg-brand-gold-50/15 border border-brand-gold-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-md hover:border-brand-gold-250 transition-all duration-300 flex flex-col group"
              >
                <div className="aspect-[4/3] w-full overflow-hidden bg-slate-100 relative">
                  <img 
                    src={item.img} 
                    alt={item.title} 
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                    onError={(e) => {
                      e.target.onerror = null; 
                      e.target.src = "https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?auto=format&fit=crop&w=800&q=80"; // Fallback image
                    }}
                  />
                  <div className="absolute top-4 right-4 bg-slate-900/80 backdrop-blur-sm p-2 rounded-xl text-white border border-white/10">
                    <Camera className="w-4 h-4" />
                  </div>
                </div>
                <div className="p-6 space-y-2 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-serif font-bold text-slate-800">{item.title}</h3>
                    <p className="text-xs text-slate-500 leading-relaxed font-light mt-1">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Quick Seva Preview Callout */}
      <section className="py-20 bg-brand-gold-50/10 border-t border-brand-gold-100/50">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <h2 className="text-2xl md:text-4xl font-serif font-bold text-slate-900">
            Support Our NGO Mission Today
          </h2>
          <p className="text-slate-650 font-light leading-relaxed">
            By sponsoring feed, adopting a cow, or contributing to the medical fund, you directly 
            relieve cow distress and earn divine blessings. Check our detailed Seva options.
          </p>
          <div className="pt-2">
            <Link
              to="/seva"
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-brand-gold-500 to-amber-600 text-white font-bold px-8 py-4 rounded-full shadow-lg hover:scale-105 transition-transform"
            >
              <Heart className="w-5 h-5 fill-white" />
              <span>Explore Gau Seva Options</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
