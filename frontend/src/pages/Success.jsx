import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { CheckCircle2, Heart, Award, ArrowRight, Loader2, Info } from 'lucide-react';
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
        colors: ['#ea580c', '#f59e0b', '#ffffff']
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#ea580c', '#f59e0b', '#ffffff']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());
  };

  return (
    <div className="min-h-screen bg-stone-50/50 flex items-center justify-center p-4 font-sans">
      <div className="bg-white rounded-3xl max-w-xl w-full p-8 md:p-12 shadow-sm border border-stone-200 text-center relative overflow-hidden">
        {/* Top saffron bar */}
        <div className="absolute top-0 left-0 w-full h-1.5 bg-brand-gold-500"></div>

        {status === 'loading' && (
          <div className="flex flex-col items-center py-12 space-y-4">
            <Loader2 className="w-12 h-12 text-brand-gold-500 animate-spin" />
            <h2 className="text-xl font-serif font-bold text-zinc-900">Verifying Donation...</h2>
            <p className="text-zinc-500 text-xs font-light">Please hold on while we verify your transaction status.</p>
          </div>
        )}

        {status === 'success' && (
          <div className="space-y-6">
            <div className="flex justify-center">
              <div className="bg-emerald-50 p-4 rounded-full border border-emerald-100/60 animate-pulse-soft">
                <CheckCircle2 className="w-12 h-12 text-emerald-600" />
              </div>
            </div>

            <span className="text-brand-gold-700 font-bold text-xs uppercase tracking-widest bg-brand-gold-50 border border-brand-gold-150 px-4 py-1.5 rounded-full inline-block font-sans">
              Donation Successful
            </span>

            <h1 className="text-2xl md:text-3xl font-serif font-bold text-zinc-950 leading-tight">
              Thank You for Your Sacred Support!
            </h1>

            <p className="text-zinc-600 font-light leading-relaxed text-xs md:text-sm max-w-md mx-auto">
              Dear <span className="font-semibold text-zinc-900">{donationDetails?.donorName || 'Gau Sevak'}</span>, your contribution of <span className="font-bold text-zinc-900">₹{donationDetails?.amount?.toLocaleString('en-IN')}</span> has been successfully received. Every rupee fuels the well-being of our holy cows.
            </p>

            {/* Donation Receipt details box */}
            <div className="bg-stone-50 rounded-2xl p-5 border border-stone-150 flex flex-col space-y-3 text-left text-xs max-w-sm mx-auto font-sans">
              <div className="flex justify-between">
                <span className="text-zinc-500 font-medium">Donor Name:</span>
                <span className="text-zinc-800 font-semibold">{donationDetails?.donorName || 'Anonymous'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500 font-medium">Amount Contributed:</span>
                <span className="text-zinc-900 font-bold font-serif">₹{donationDetails?.amount?.toLocaleString('en-IN')}.00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500 font-medium">Status:</span>
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full font-sans">
                  Completed
                </span>
              </div>
            </div>

            {/* Quote of blessing */}
            <p className="italic text-brand-gold-700 text-xs md:text-sm font-serif max-w-md mx-auto">
              "Blessed are the hands that rise to serve Gomata."
            </p>

            <div className="pt-4">
              <Link
                to="/"
                className="inline-flex items-center space-x-2 bg-zinc-950 hover:bg-brand-gold-600 text-white px-8 py-3.5 rounded-full font-bold shadow-sm transition-all cursor-pointer text-xs"
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
                <Loader2 className="w-12 h-12 text-brand-gold-500 animate-spin" />
              </div>
            </div>
            <h1 className="text-xl font-serif font-bold text-zinc-900">
              Payment Verification Pending
            </h1>
            <p className="text-zinc-500 text-xs font-light max-w-md mx-auto leading-relaxed">
              We have initiated the verification of your payment. It might take a moment. If your account was debited, it will update automatically within 10 minutes.
            </p>
            <div className="pt-4">
              <Link to="/" className="text-brand-gold-700 font-medium hover:underline text-xs">
                Go back to home page
              </Link>
            </div>
          </div>
        )}

        {status === 'error' && (
          <div className="space-y-6 py-8">
            <div className="flex justify-center">
              <div className="bg-red-50 p-4 rounded-full border border-red-100">
                <Info className="w-12 h-12 text-red-500" />
              </div>
            </div>
            <h1 className="text-xl font-serif font-bold text-zinc-900">
              Verification Failed
            </h1>
            <p className="text-zinc-500 text-xs font-light max-w-md mx-auto leading-relaxed">
              We couldn't verify your donation session. If this is an error, please reach out to our team with your transaction details.
            </p>
            <div className="pt-4">
              <Link
                to="/"
                className="bg-zinc-950 text-white px-6 py-3 rounded-xl text-xs font-bold hover:bg-brand-gold-600 transition-all inline-block"
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
