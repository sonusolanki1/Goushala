import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { CheckCircle2, Heart, Award, ArrowRight, Loader2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { recordPageView } from '../utils/analytics';

export default function Success() {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
  
  const [status, setStatus] = useState('loading');
  const [donationDetails, setDonationDetails] = useState(null);

  useEffect(() => {
    recordPageView('/donation-success');
    
    if (!sessionId) {
      setStatus('error');
      return;
    }

    const verifyDonation = async () => {
      try {
        const apiBaseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        const res = await fetch(`${apiBaseUrl}/api/payment/verify-session/${sessionId}`);
        const data = await res.json();

        if (res.ok && data.status === 'completed') {
          setDonationDetails(data);
          setStatus('success');
          
          // Trigger confetti explosion
          triggerConfetti();
        } else {
          setStatus('pending');
        }
      } catch (err) {
        console.error('Error verifying donation:', err);
        setStatus('error');
      }
    };

    verifyDonation();
  }, [sessionId]);

  const triggerConfetti = () => {
    const duration = 3 * 1000;
    const end = Date.now() + duration;

    (function frame() {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#deb531', '#2d6a4f', '#ffffff']
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#deb531', '#2d6a4f', '#ffffff']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50/20 to-white flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-xl w-full p-8 md:p-12 shadow-2xl border border-amber-100 text-center relative overflow-hidden">
        
        {/* Decorative elements */}
        <div className="absolute -top-12 -left-12 w-32 h-32 bg-brand-gold-200/20 rounded-full blur-xl"></div>
        <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-brand-green-100/20 rounded-full blur-xl"></div>

        {status === 'loading' && (
          <div className="flex flex-col items-center py-12 space-y-4">
            <Loader2 className="w-16 h-16 text-brand-gold-500 animate-spin" />
            <h2 className="text-xl font-semibold text-slate-700">Verifying Donation...</h2>
            <p className="text-slate-400 text-sm font-light">Please hold on while we secure your payment status.</p>
          </div>
        )}

        {status === 'success' && (
          <div className="space-y-6">
            <div className="flex justify-center">
              <div className="bg-emerald-50 p-4 rounded-full border border-emerald-100 animate-pulse-soft">
                <CheckCircle2 className="w-16 h-16 text-emerald-600" />
              </div>
            </div>

            <span className="text-brand-gold-700 font-bold text-xs uppercase tracking-widest bg-brand-gold-50 px-4 py-1.5 rounded-full inline-block">
              Donation Successful
            </span>

            <h1 className="text-3xl md:text-4xl font-serif font-bold text-slate-800 leading-tight">
              Thank You for Your Sacred Support!
            </h1>

            <p className="text-slate-600 font-light leading-relaxed max-w-md mx-auto">
              Dear <span className="font-semibold text-slate-800">{donationDetails?.donorName || 'Gau Sevak'}</span>, your contribution of <span className="font-bold text-slate-900">₹{donationDetails?.amount?.toLocaleString('en-IN')}</span> has been successfully received. Every rupee fuels the well-being of our holy cows.
            </p>

            {/* Donation Receipt details box */}
            <div className="bg-amber-50/50 rounded-2xl p-6 border border-amber-100/50 flex flex-col space-y-3 text-left text-sm max-w-sm mx-auto">
              <div className="flex justify-between">
                <span className="text-slate-400 font-medium">Donor Name:</span>
                <span className="text-slate-800 font-semibold">{donationDetails?.donorName || 'Anonymous'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400 font-medium">Amount Contributed:</span>
                <span className="text-slate-800 font-bold font-serif">₹{donationDetails?.amount?.toLocaleString('en-IN')}.00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400 font-medium">Status:</span>
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full">
                  Completed
                </span>
              </div>
            </div>

            {/* Quote of blessing */}
            <p className="italic text-brand-green-700 text-sm font-serif max-w-md mx-auto">
              "धन्य हैं वे हाथ, जो गाय की सेवा में उठते हैं।" <br />
              (Blessed are the hands that rise to serve Gomata.)
            </p>

            <div className="pt-6">
              <Link
                to="/"
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-brand-gold-500 to-amber-600 text-white px-8 py-3.5 rounded-full font-semibold shadow-lg hover:shadow-xl hover:scale-102 transition-all cursor-pointer"
              >
                <span>Return to Home</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}

        {status === 'pending' && (
          <div className="space-y-6 py-8">
            <div className="flex justify-center">
              <div className="bg-amber-50 p-4 rounded-full border border-amber-100">
                <Loader2 className="w-16 h-16 text-amber-500 animate-spin" />
              </div>
            </div>
            <h1 className="text-2xl font-serif font-bold text-slate-800">
              Payment Verification Pending
            </h1>
            <p className="text-slate-500 text-sm font-light max-w-md mx-auto leading-relaxed">
              We have initialized the verification of your payment. It might take a moment. If your account was debited and it shows pending, we will reconcile it automatically within 10 minutes.
            </p>
            <div className="pt-4">
              <Link to="/" className="text-brand-gold-700 font-medium hover:underline text-sm">
                Go back to home page
              </Link>
            </div>
          </div>
        )}

        {status === 'error' && (
          <div className="space-y-6 py-8">
            <div className="flex justify-center">
              <div className="bg-red-50 p-4 rounded-full border border-red-100">
                <Award className="w-16 h-16 text-red-500" />
              </div>
            </div>
            <h1 className="text-2xl font-serif font-bold text-slate-800">
              Verification Failed
            </h1>
            <p className="text-slate-500 text-sm font-light max-w-md mx-auto leading-relaxed">
              We couldn't verify your donation session. If this is an error, please reach out to the Trust team with your transaction details.
            </p>
            <div className="pt-4">
              <Link
                to="/"
                className="bg-slate-800 text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-slate-700 transition-all inline-block"
              >
                Go back to Home
              </Link>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
