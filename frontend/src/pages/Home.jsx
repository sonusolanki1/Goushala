import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, ShieldCheck, Sparkles, ArrowRight, Camera, Users, Award, HeartHandshake, Info } from 'lucide-react';
import Hero from '../components/Hero';

export default function Home() {
  const galleryItems = [
    {
      img: '/seva1.jpeg',
      title: 'Desi Gir Cow Protection',
      desc: 'Sustaining pure indigenous breeds under dedicated Vedic shelter environments.'
    },
    {
      img: '/seva5.jpeg',
      title: 'Veterinary Sanctuary Care',
      desc: 'Our critical clinic unit providing immediate first-aid, medicines, and surgery for street cows.'
    },
    {
      img: '/seva3.jpeg',
      title: 'Our Calf Nursery Care',
      desc: 'Specialized nurturing, fresh grass silos, and milk feed scheduling for abandoned calves.'
    }
  ];

  const features = [
    {
      title: 'Registered NGO',
      desc: 'Formally licensed animal welfare trust complying with audits.',
      icon: <ShieldCheck className="w-5 h-5 text-brand-gold-500" />
    },
    {
      title: 'Cow Adoption',
      desc: 'Sponsor a cow virtually and get bi-monthly health logs.',
      icon: <Heart className="w-5 h-5 text-brand-gold-500" />
    },
    {
      title: 'Volunteer Hub',
      desc: 'Join weekly grass distribution drives and shelter sevas.',
      icon: <Users className="w-5 h-5 text-brand-gold-500" />
    },
    {
      title: 'Lifetime Programs',
      desc: 'Patron and trustee memberships for sustainable operations.',
      icon: <Award className="w-5 h-5 text-brand-gold-500" />
    }
  ];

  return (
    <div className="flex-1 bg-transparent font-sans">
      {/* Hero Section */}
      <Hero />

      {/* NGO Welcome & Core Mission */}
      <section className="py-24 relative overflow-hidden bg-stone-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            {/* Left Column: Narrative Content */}
            <div className="lg:col-span-7 space-y-6">
              <span className="text-brand-gold-700 font-bold text-xs uppercase tracking-widest bg-brand-gold-100/60 px-4 py-1.5 rounded-full inline-block font-sans">
                Registered NGO Sanctuary
              </span>
              <h2 className="text-3xl md:text-5xl font-serif font-bold text-zinc-900 leading-tight">
                Krishna Govind Seva Sansthan NGO
              </h2>
              <div className="h-1.5 w-24 bg-brand-gold-500 rounded-full"></div>

              <p className="text-zinc-650 text-base md:text-lg font-light leading-relaxed">
                We are a dedicated non-governmental organization (NGO) committed to saving, sheltering, and rehabilitating distressed street cows.
                Our Goushala in Rajasthan serves as a permanent, loving home for over 350+ cows that were abandoned, sick, or injured.
              </p>

              <p className="text-zinc-550 font-light leading-relaxed text-sm">
                Every cow at our sanctuary is treated as a mother. We feed them high-protein wheat bran, organic mustard oil cakes,
                and fresh green grass daily. Through public donations, our NGO ensures that no cow is left neglected on the streets.
              </p>

              <div className="pt-4 flex flex-col sm:flex-row gap-3">
                <Link
                  to="/about"
                  className="inline-flex items-center justify-center space-x-2 bg-zinc-950 hover:bg-brand-gold-600 text-white font-bold px-6 py-3.5 rounded-full hover:shadow-lg transition-all duration-300 text-xs cursor-pointer"
                >
                  <span>Our NGO Story</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/donate"
                  className="inline-flex items-center justify-center space-x-2 border border-stone-200 bg-white hover:bg-stone-50 text-zinc-800 font-bold px-6 py-3.5 rounded-full shadow-sm hover:shadow transition-all duration-300 text-xs cursor-pointer"
                >
                  <Heart className="w-4 h-4 text-brand-gold-500 fill-brand-gold-500" />
                  <span>Donate Online</span>
                </Link>
              </div>
            </div>

            {/* Right Column: Image */}
            <div className="lg:col-span-5 relative">
              <div className="absolute -inset-4 bg-brand-gold-500/5 rounded-3xl blur-2xl -z-10 animate-pulse-soft"></div>

              <div className="relative border border-stone-200 shadow-2xl rounded-3xl overflow-hidden aspect-[4/3] group bg-white">
                <img
                  src="/seva2.jpeg"
                  alt="Holy Cow at Krishna Govind NGO"
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700 ease-out"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?auto=format&fit=crop&w=800&q=80"; // Fallback image
                  }}
                />

                {/* Visual Accent Badge */}
                <div className="absolute bottom-4 left-4 bg-zinc-950/80 backdrop-blur-sm px-4 py-2 rounded-xl text-white border border-white/10 text-xs flex items-center space-x-2">
                  <Sparkles className="w-3.5 h-3.5 text-brand-gold-400" />
                  <span>Gomata at our Sanctuary</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Grid of Key Features */}
      <section className="py-20 bg-white border-y border-stone-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feat, idx) => (
              <div key={idx} className="space-y-3 p-4 rounded-2xl hover:bg-stone-50 transition-colors duration-300 border border-transparent hover:border-stone-150">
                <div className="bg-brand-gold-500/10 p-2.5 rounded-xl border border-brand-gold-500/20 w-fit">
                  {feat.icon}
                </div>
                <h3 className="font-serif font-bold text-zinc-900 text-base">{feat.title}</h3>
                <p className="text-zinc-550 text-xs font-light leading-relaxed">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Short quick Stats Banner */}
      <section className="bg-zinc-950 text-white py-16 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-gold-500/5 rounded-full blur-3xl -mr-20 -mt-20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center relative z-10 font-sans">
          <div className="space-y-1">
            <span className="text-3xl md:text-5xl font-serif font-bold text-brand-gold-500">350+</span>
            <p className="text-xs uppercase tracking-wider text-slate-400 mt-1">Sheltered Cows</p>
          </div>
          <div className="space-y-1">
            <span className="text-3xl md:text-5xl font-serif font-bold text-brand-gold-500">12+</span>
            <p className="text-xs uppercase tracking-wider text-slate-400 mt-1">Acres Pasture</p>
          </div>
          <div className="space-y-1">
            <span className="text-3xl md:text-5xl font-serif font-bold text-brand-gold-500">15k+</span>
            <p className="text-xs uppercase tracking-wider text-slate-400 mt-1">Daily Meals</p>
          </div>
          <div className="space-y-1">
            <span className="text-3xl md:text-5xl font-serif font-bold text-brand-gold-500">24/7</span>
            <p className="text-xs uppercase tracking-wider text-slate-400 mt-1">Veterinary Support</p>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-24 bg-stone-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-brand-gold-700 font-bold text-xs uppercase tracking-widest bg-brand-gold-100/60 px-4 py-1.5 rounded-full inline-block mb-3 font-sans">
              Sanctuary Life
            </span>
            <h2 className="text-2xl md:text-4xl font-serif font-bold text-zinc-900">
              Gomata Gallery & Shelter Snippets
            </h2>
            <div className="h-1 w-16 bg-brand-gold-500 mx-auto mt-3 rounded-full"></div>
            <p className="text-zinc-500 text-sm font-light mt-4 leading-relaxed">
              Real visual updates from our Goushala. Witness how your monthly sponsorships keep Gomata healthy and well cared for.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {galleryItems.map((item, idx) => (
              <div
                key={idx}
                className="bg-white border border-stone-200/80 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:border-brand-gold-200/60 transition-all duration-350 flex flex-col group cursor-default"
              >
                <div className="aspect-[4/3] w-full overflow-hidden bg-stone-100 relative">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700 ease-out"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?auto=format&fit=crop&w=800&q=80"; // Fallback image
                    }}
                  />
                  <div className="absolute top-4 right-4 bg-zinc-950/80 backdrop-blur-sm p-2 rounded-xl text-white border border-white/10">
                    <Camera className="w-4 h-4" />
                  </div>
                </div>
                <div className="p-6 space-y-2 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-base font-serif font-bold text-zinc-800 group-hover:text-brand-gold-500 transition-colors duration-300">{item.title}</h3>
                    <p className="text-xs text-zinc-500 leading-relaxed font-light mt-1.5">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              to="/gallery"
              className="inline-flex items-center space-x-1.5 text-zinc-900 hover:text-brand-gold-500 text-xs font-bold transition-all uppercase tracking-wider"
            >
              <span>Explore full media gallery</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </section>

      {/* Quick Seva Preview Callout */}
      <section className="py-24 bg-white border-t border-stone-200/80 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-gold-500/5 rounded-full blur-3xl -z-10"></div>
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <span className="text-[10px] uppercase font-bold text-brand-gold-700 tracking-widest font-sans bg-brand-gold-50/80 border border-brand-gold-150 px-3.5 py-1.5 rounded-full">Support the Sanctuary</span>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-zinc-900 leading-tight">
            Perform Fodder & Medicine Seva Today
          </h2>
          <p className="text-zinc-600 font-light leading-relaxed text-sm md:text-base max-w-2xl mx-auto">
            By sponsoring feed, adopting a cow virtually, or contributing to our medical sanctuary clinics, you directly help shelter mother cows in Rajasthan.
          </p>
          <div className="pt-4 flex justify-center gap-3">
            <Link
              to="/seva"
              className="inline-flex items-center space-x-2 bg-zinc-950 hover:bg-brand-gold-600 text-white font-bold px-8 py-4 rounded-full shadow-md hover:shadow-lg transition-all text-xs"
            >
              <Heart className="w-4 h-4 fill-white" />
              <span>Explore Gau Seva Plans</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
