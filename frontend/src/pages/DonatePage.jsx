import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Heart, ShieldCheck, Loader2, ShieldAlert } from 'lucide-react';

export default function DonatePage() {
  const [searchParams] = useSearchParams();
  const initialSevaParam = searchParams.get('seva');

  const [sevaType, setSevaType] = useState('feed_day');
  const [amount, setAmount] = useState(501);
  const [donorName, setDonorName] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const sevaOptions = [
    { id: 'feed_day', name: 'One-Day Cow Feed Seva (₹501)', defaultPrice: 501 },
    { id: 'adopt_month', name: 'Adopt a Cow Monthly (₹2,500)', defaultPrice: 2500 },
    { id: 'medical_care', name: 'Injured Cow Medical Fund (₹5,000)', defaultPrice: 5000 },
    { id: 'lifetime_adopt', name: 'Lifetime Adopt & Sponsor (₹21,000)', defaultPrice: 21000 },
    { id: 'general_fund', name: 'General NGO Goushala Fund (Custom Amount)', defaultPrice: '' }
  ];

  // Sync selected query parameter from URL
  useEffect(() => {
    if (initialSevaParam) {
      const matched = sevaOptions.find(opt => opt.id === initialSevaParam);
      if (matched) {
        setSevaType(matched.id);
        if (matched.defaultPrice === '') {
          setAmount('');
        } else {
          setAmount(matched.defaultPrice);
        }
      }
    }
  }, [initialSevaParam]);

  // Adjust amount when user shifts the category
  const handleSevaChange = (e) => {
    const selectedId = e.target.value;
    setSevaType(selectedId);
    const matched = sevaOptions.find(opt => opt.id === selectedId);
    if (matched) {
      setAmount(matched.defaultPrice);
    }
  };

  const handleDonate = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      setErrorMessage('Please enter a valid donation amount.');
      return;
    }

    if (!donorName.trim()) {
      setErrorMessage('Please enter your name.');
      return;
    }

    if (!donorEmail.trim()) {
      setErrorMessage('Please enter your email address.');
      return;
    }

    setIsLoading(true);

    try {
      const apiBaseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const selectedSevaLabel = sevaOptions.find(o => o.id === sevaType)?.name || 'General Seva';

      const response = await fetch(`${apiBaseUrl}/api/payment/create-checkout-session`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: parsedAmount,
          donorName,
          donorEmail,
          sevaType: selectedSevaLabel,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to initialize payment.');
      }

      // Redirect to Stripe checkout URL
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error('Stripe checkout URL not received.');
      }
    } catch (err) {
      console.error(err);
      setErrorMessage(err.message || 'Server connection error. Please try again later.');
      setIsLoading(false);
    }
  };

  return (
    <div className="flex-1 animate-fadeIn bg-gradient-to-b from-amber-50/20 to-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-brand-gold-700 font-bold text-xs uppercase tracking-widest bg-brand-gold-100/60 px-4 py-1.5 rounded-full inline-block mb-3">
            Secure Donation Page
          </span>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 leading-tight">
            Sponsor Sacred Gau Seva
          </h1>
          <div className="h-1.5 w-24 bg-gradient-to-r from-brand-gold-400 to-amber-600 mx-auto mt-4 rounded-full"></div>
          <p className="text-slate-500 mt-6 text-base md:text-lg font-light leading-relaxed">
            Fill in the details below to proceed to the secure Stripe Checkout gateway. 
            All donation receipts will be emailed directly to you.
          </p>
        </div>

        {/* Form Container split layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-5xl mx-auto">
          
          {/* Left Column: NGO Info & Tax Exemption */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="bg-slate-900 text-white rounded-3xl p-8 shadow-xl relative overflow-hidden flex flex-col justify-between h-fit">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
              
              <div>
                <span className="text-[10px] text-brand-gold-400 font-bold uppercase tracking-wider block mb-2">
                  Krishna Govind Goushala
                </span>
                <h3 className="text-xl font-serif font-bold text-white mb-4">
                  Why Sponsor Gau Seva?
                </h3>
                <p className="text-slate-355 text-xs font-light leading-relaxed mb-6">
                  Serving Gomata is considered one of the highest spiritual duties in India. 
                  Every contribution is logged, auditing directly to purchase green hay, construct protective shelters, and provide veterinary surgery tools.
                </p>
              </div>

              <div className="border-t border-slate-800 pt-6 space-y-4">
                <div className="flex items-start space-x-3 text-xs">
                  <ShieldCheck className="w-4 h-4 text-emerald-450 shrink-0 mt-0.5" />
                  <p className="text-slate-300">Tax exemption benefits applicable under Section 80G.</p>
                </div>
                <div className="flex items-start space-x-3 text-xs">
                  <ShieldCheck className="w-4 h-4 text-emerald-450 shrink-0 mt-0.5" />
                  <p className="text-slate-300">100% secure SSL encrypted Stripe transactions.</p>
                </div>
              </div>
            </div>

            {/* Saffron Image Card (seva3.jpeg) */}
            <div className="relative rounded-3xl overflow-hidden shadow-lg border-2 border-slate-100 aspect-video group bg-slate-100">
              <img 
                src="/seva3.jpeg" 
                alt="Emergency Medical Seva" 
                className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                onError={(e) => {
                  e.target.onerror = null; 
                  e.target.src = "https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?auto=format&fit=crop&w=800&q=80";
                }}
              />
            </div>

            <div className="border-l-4 border-brand-gold-500 pl-4 py-3 bg-amber-50/50 rounded-r-2xl">
              <p className="italic text-slate-750 font-serif text-xs leading-relaxed">
                "गावो मे अग्रतः सन्तु गावो मे सन्तु पृष्ठतः। गावो मे हृदये सन्तु गवां मध्ये वसाम्यहम्॥" <br className="my-1 block" />
                (Let cows be in front of me, let cows be behind me, let cows be in my heart. May I always dwell in the midst of cows.)
              </p>
            </div>

          </div>

          {/* Right Column: Donation Form */}
          <div className="lg:col-span-7 bg-white border border-amber-100 p-8 rounded-3xl shadow-lg relative">
            <form onSubmit={handleDonate} className="space-y-5">
              
              {/* Seva Category selection */}
              <div>
                <label className="block text-[11px] font-bold text-slate-500 mb-1.5 uppercase tracking-wide">
                  Select Seva Category
                </label>
                <select
                  value={sevaType}
                  onChange={handleSevaChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none focus:border-brand-gold-500 focus:ring-1 focus:ring-brand-gold-500"
                >
                  {sevaOptions.map(option => (
                    <option key={option.id} value={option.id}>
                      {option.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Amount field */}
              <div>
                <label className="block text-[11px] font-bold text-slate-500 mb-1.5 uppercase tracking-wide">
                  Donation Amount (INR)
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-serif font-bold text-lg">
                    ₹
                  </span>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    disabled={sevaType !== 'general_fund'}
                    placeholder="Enter custom amount"
                    min="1"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-8 pr-4 py-3 text-base text-slate-800 font-serif font-bold focus:outline-none focus:border-brand-gold-500 focus:ring-1 focus:ring-brand-gold-500 disabled:opacity-75 disabled:bg-slate-100 disabled:cursor-not-allowed"
                    required
                  />
                </div>
                {sevaType !== 'general_fund' && (
                  <span className="text-[10px] text-slate-400 mt-1 block">
                    * The selected preset price package is locked. Select "General Goushala Fund" to choose a custom amount.
                  </span>
                )}
              </div>

              {/* Donor Name */}
              <div>
                <label className="block text-[11px] font-bold text-slate-500 mb-1.5 uppercase tracking-wide">
                  Your Full Name
                </label>
                <input
                  type="text"
                  value={donorName}
                  onChange={(e) => setDonorName(e.target.value)}
                  placeholder="e.g. Rajesh Kumar"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none focus:border-brand-gold-500"
                  required
                />
              </div>

              {/* Donor Email */}
              <div>
                <label className="block text-[11px] font-bold text-slate-500 mb-1.5 uppercase tracking-wide">
                  Your Email Address
                </label>
                <input
                  type="email"
                  value={donorEmail}
                  onChange={(e) => setDonorEmail(e.target.value)}
                  placeholder="e.g. rajesh@example.com"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none focus:border-brand-gold-500"
                  required
                />
              </div>

              {/* Error Box */}
              {errorMessage && (
                <div className="flex items-center space-x-2 bg-red-50 text-red-700 px-4 py-3 rounded-xl border border-red-100 text-xs">
                  <ShieldAlert className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 rounded-xl text-white font-bold bg-gradient-to-r from-brand-gold-500 to-amber-600 hover:scale-[1.01] active:scale-[0.99] transition-all shadow-md duration-300 disabled:opacity-75 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center space-x-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Connecting to Stripe checkout...</span>
                  </>
                ) : (
                  <>
                    <Heart className="w-4 h-4 fill-white stroke-white" />
                    <span>Proceed to Secure Pay</span>
                  </>
                )}
              </button>

            </form>
          </div>

        </div>

      </div>
    </div>
  );
}
