import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { XCircle, ArrowLeft } from 'lucide-react';
import { recordPageView } from '../utils/analytics';

export default function Cancel() {
  useEffect(() => {
    recordPageView('/donation-cancel');
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50/20 to-white flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full p-8 md:p-10 shadow-2xl border border-amber-100 text-center relative overflow-hidden">
        
        {/* Top Gradient Accent */}
        <div className="absolute top-0 left-0 w-full h-1.5 bg-red-500"></div>

        <div className="flex justify-center mb-6">
          <div className="bg-red-50 p-4 rounded-full border border-red-100">
            <XCircle className="w-12 h-12 text-red-500" />
          </div>
        </div>

        <span className="text-red-600 font-bold text-xs uppercase tracking-widest bg-red-50 px-3 py-1 rounded-full inline-block mb-3">
          Payment Cancelled
        </span>

        <h1 className="text-2xl font-serif font-bold text-slate-800 leading-tight mb-4">
          Transaction Cancelled
        </h1>

        <p className="text-slate-500 text-sm font-light leading-relaxed mb-8">
          The donation process was cancelled. No funds were debited from your account. 
          If you encountered a technical issue or payment error, please try again or contact us.
        </p>

        <div className="space-y-3">
          <Link
            to="/"
            className="w-full py-3.5 rounded-xl bg-slate-800 text-white font-semibold flex items-center justify-center space-x-2 shadow-md hover:bg-slate-700 active:scale-[0.99] transition-all duration-300 text-sm cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Goushala Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
