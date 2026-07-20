import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert, Heart, ArrowRight } from 'lucide-react';

export default function Cancel() {
  return (
    <div className="min-h-screen bg-stone-50/50 flex items-center justify-center p-4 font-sans">
      <div className="bg-white rounded-3xl max-w-md w-full p-8 shadow-sm border border-stone-200 text-center relative overflow-hidden">
        {/* Top saffron bar */}
        <div className="absolute top-0 left-0 w-full h-1.5 bg-brand-gold-500"></div>

        <div className="space-y-6">
          <div className="flex justify-center">
            <div className="bg-red-50 p-4 rounded-full border border-red-100">
              <ShieldAlert className="w-12 h-12 text-red-600" />
            </div>
          </div>

          <div className="space-y-2">
            <span className="text-[10px] text-zinc-400 uppercase tracking-widest font-bold font-sans">
              Checkout Cancelled
            </span>
            <h1 className="text-2xl font-serif font-bold text-zinc-950">
              Donation Cancelled
            </h1>
            <p className="text-zinc-550 text-xs font-light leading-relaxed max-w-xs mx-auto">
              Your donation checkout was cancelled and no funds were charged. If this was an accident, feel free to try again.
            </p>
          </div>

          <div className="pt-4 flex flex-col gap-3 font-sans">
            <Link
              to="/donate"
              className="w-full py-3 bg-zinc-950 hover:bg-brand-gold-600 text-white font-bold text-xs rounded-xl shadow-sm transition-all flex items-center justify-center space-x-1.5 cursor-pointer"
            >
              <Heart className="w-4 h-4 fill-white" />
              <span>Retry Donation Seva</span>
            </Link>
            <Link
              to="/"
              className="w-full py-3 border border-stone-200 hover:bg-stone-50 text-zinc-800 font-semibold text-xs rounded-xl transition-all flex items-center justify-center space-x-1.5 cursor-pointer"
            >
              <span>Return to Homepage</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
