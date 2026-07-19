import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ChevronDown } from 'lucide-react';

export default function Hero() {
  // Local background video file placed inside frontend/public/
  const videoUrl = "/video1.mp4";

  return (
    <section id="home" className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-slate-900">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute z-0 w-full h-full object-cover"
      >
        <source src={videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Hero Overlay Gradient */}
      <div className="absolute inset-0 z-10 hero-gradient"></div>

      {/* Hero Content */}
      <div className="relative z-20 text-center px-4 max-w-5xl mx-auto flex flex-col items-center">
        <span className="text-amber-300 font-semibold tracking-widest text-xs md:text-sm uppercase mb-4 animate-pulse-soft">
          श्रीमद्भागवत गीता के अनुसार - गावो विश्वस्य मातरः (Cows are the mothers of the universe)
        </span>
        
        <h1 className="text-4xl md:text-6xl lg:text-7xl text-white font-serif font-extrabold leading-tight tracking-tight mb-6">
          Krishna Govind <br className="hidden md:inline" />
          <span className="text-brand-gold-500">
            Seva Sansthan NGO
          </span>
        </h1>
        
        <p className="text-base md:text-xl text-slate-100/90 max-w-3xl font-light leading-relaxed mb-10">
          Dedicated to the protection, feeding, and medical care of abandoned and sacred cows. 
          Your contributions keep Gomata healthy, happy, and loved in our spiritual shelter.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 items-center">
          <Link
            to="/donate"
            className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-brand-gold-500 hover:bg-brand-gold-600 text-white font-bold px-8 py-4 rounded-full shadow-2xl hover:scale-105 transition-all duration-300 text-lg cursor-pointer"
          >
            <Heart className="w-5 h-5 fill-white stroke-white" />
            <span>Perform Gau Seva</span>
          </Link>
          
          <Link
            to="/about"
            className="w-full sm:w-auto flex items-center justify-center border border-white/50 text-white hover:bg-white/10 px-8 py-4 rounded-full font-semibold transition-all duration-300 text-lg backdrop-blur-sm"
          >
            Our Story & Mission
          </Link>
        </div>
      </div>

      {/* Down Chevron Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 animate-bounce">
        <Link to="/about" className="text-white/70 hover:text-white transition-colors">
          <ChevronDown className="w-8 h-8" />
        </Link>
      </div>
    </section>
  );
}
