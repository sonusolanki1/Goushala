import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, ArrowRight, Heart } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="flex-1 bg-stone-50/50 flex flex-col items-center justify-center py-20 px-4 text-center font-sans">
      <div className="max-w-md bg-white border border-stone-200/80 rounded-3xl p-8 md:p-12 shadow-sm space-y-6 relative overflow-hidden">
        {/* Top bar saffron indicator */}
        <div className="absolute top-0 left-0 w-full h-1.5 bg-brand-gold-500"></div>

        <div className="w-16 h-16 bg-brand-gold-50/80 rounded-full flex items-center justify-center text-brand-gold-500 border border-brand-gold-150 mx-auto">
          <Compass className="w-8 h-8 animate-spin-slow" />
        </div>

        <div className="space-y-2">
          <span className="text-[10px] text-brand-gold-700 uppercase tracking-widest font-bold">Error 404</span>
          <h1 className="text-3xl font-serif font-bold text-zinc-950">Page Not Found</h1>
          <p className="text-zinc-550 text-xs md:text-sm font-light leading-relaxed">
            The path you are looking for does not exist or has been relocated to another sanctuary module.
          </p>
        </div>

        <div className="pt-2 flex flex-col gap-3">
          <Link
            to="/"
            className="w-full py-3 bg-zinc-950 hover:bg-brand-gold-600 text-white font-bold text-xs rounded-xl shadow-sm transition-all flex items-center justify-center space-x-1.5 cursor-pointer"
          >
            <span>Return to Safety</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/donate"
            className="w-full py-3 border border-stone-200 hover:bg-stone-50 text-zinc-800 font-semibold text-xs rounded-xl transition-all flex items-center justify-center space-x-1.5 cursor-pointer"
          >
            <Heart className="w-4 h-4 text-brand-gold-500 fill-brand-gold-500" />
            <span>Sponsor Gau Feed Instead</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
