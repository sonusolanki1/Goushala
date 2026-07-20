import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Heart, ShieldCheck, Loader2, ShieldAlert, Copy, Check, Landmark, CreditCard, QrCode } from 'lucide-react';

export default function DonatePage() {
  const [searchParams] = useSearchParams();
  const initialSevaParam = searchParams.get('seva');

  const [sevaType, setSevaType] = useState('feed_day');
  const [amount, setAmount] = useState(501);
  const [donorName, setDonorName] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [donorPhone, setDonorPhone] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [copiedField, setCopiedField] = useState('');

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

  const handleCopy = (text, fieldName) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(''), 2000);
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

    if (!donorPhone.trim()) {
      setErrorMessage('Please enter your phone number.');
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
          donorPhone,
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
    <div className="flex-1 animate-fadeIn bg-white py-24 text-zinc-900 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-brand-gold-500 font-bold text-xs uppercase tracking-widest bg-brand-gold-50 px-4 py-1.5 rounded-full inline-block mb-3 border border-brand-gold-200">
            Sponsorship & Seva Gateway
          </span>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-zinc-900 leading-tight">
            Sponsor Sacred Gau Seva
          </h1>
          <div className="h-1 w-20 bg-brand-gold-500 mx-auto mt-4 rounded-full"></div>
          <p className="text-zinc-500 mt-5 text-sm font-light leading-relaxed">
            Support the daily feeding, shelter, and medical protection of 350+ sacred cows. 
            Choose either instant online checkouts or direct bank transfer wire.
          </p>
        </div>

        {/* Form Container split layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-6xl mx-auto">
          
          {/* Left Column: Direct Bank Transfer Details Card */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="bg-gradient-to-br from-zinc-900 via-zinc-950 to-neutral-900 text-white rounded-3xl p-8 border border-amber-500/20 shadow-2xl relative overflow-hidden flex flex-col justify-between hover:border-brand-gold-500/40 transition-colors duration-500 group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold-500/10 rounded-full blur-2xl group-hover:bg-brand-gold-500/15 transition-all duration-500"></div>
              
              <div>
                <span className="text-[10px] text-brand-gold-400 font-bold uppercase tracking-widest block mb-2">
                  SECURE WIRE TRANSFER
                </span>
                <h3 className="text-xl font-serif font-bold text-white mb-4 flex items-center space-x-2.5">
                  <Landmark className="w-5.5 h-5.5 text-brand-gold-500" />
                  <span>Direct Bank Details</span>
                </h3>
                <p className="text-slate-400 text-xs font-light leading-relaxed mb-6">
                  For major contributions, monthly standing instructions, or manual bank wire deposits, please transfer directly to our NGO account:
                </p>

                {/* Account Details Blocks */}
                <div className="space-y-4 text-xs">
                  
                  {/* Account Name */}
                  <div className="flex justify-between items-center border-b border-zinc-800/80 pb-2">
                    <span className="text-slate-400">NGO Beneficiary:</span>
                    <span className="font-semibold text-white text-right">Krishna Govind Seva Sansthan NGO</span>
                  </div>

                  {/* Bank Name */}
                  <div className="flex justify-between items-center border-b border-zinc-800/80 pb-2">
                    <span className="text-slate-400">Bank Name:</span>
                    <span className="font-semibold text-white">State Bank of India (SBI)</span>
                  </div>

                  {/* Account Number */}
                  <div className="flex justify-between items-center border-b border-zinc-800/80 pb-2">
                    <span className="text-slate-400">Account Number:</span>
                    <div className="flex items-center space-x-1.5">
                      <span className="font-mono font-bold text-brand-gold-400 text-sm">4108108108108</span>
                      <button 
                        type="button" 
                        onClick={() => handleCopy('4108108108108', 'acc')} 
                        className="text-slate-400 hover:text-white p-1 rounded hover:bg-zinc-800 transition-colors"
                      >
                        {copiedField === 'acc' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                  {/* IFSC Code */}
                  <div className="flex justify-between items-center border-b border-zinc-800/80 pb-2">
                    <span className="text-slate-400">IFSC Code:</span>
                    <div className="flex items-center space-x-1.5">
                      <span className="font-mono font-bold text-white">SBIN0000108</span>
                      <button 
                        type="button" 
                        onClick={() => handleCopy('SBIN0000108', 'ifsc')} 
                        className="text-slate-400 hover:text-white p-1 rounded hover:bg-zinc-800 transition-colors"
                      >
                        {copiedField === 'ifsc' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                  {/* UPI Address */}
                  <div className="flex justify-between items-center border-b border-zinc-800/80 pb-2">
                    <span className="text-slate-400">UPI ID / VPA:</span>
                    <div className="flex items-center space-x-1.5">
                      <span className="font-mono text-brand-gold-400 font-semibold">krishnagovind@sbi</span>
                      <button 
                        type="button" 
                        onClick={() => handleCopy('krishnagovind@sbi', 'upi')} 
                        className="text-slate-400 hover:text-white p-1 rounded hover:bg-zinc-800 transition-colors"
                      >
                        {copiedField === 'upi' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                  {/* Branch name */}
                  <div className="flex justify-between items-center pb-2">
                    <span className="text-slate-400">Branch:</span>
                    <span className="font-semibold text-white text-right">Dwarka Sector-5, New Delhi</span>
                  </div>

                </div>

              </div>

              <div className="border-t border-zinc-800/80 pt-6 space-y-4">
                <div className="flex items-start space-x-3 text-xs">
                  <ShieldCheck className="w-4.5 h-4.5 text-brand-gold-500 shrink-0 mt-0.5" />
                  <p className="text-slate-350 leading-relaxed">All direct bank deposits qualify for tax deduction receipts.</p>
                </div>
                <div className="flex items-start space-x-3 text-xs">
                  <ShieldCheck className="w-4.5 h-4.5 text-brand-gold-500 shrink-0 mt-0.5" />
                  <p className="text-slate-350 leading-relaxed">Please email bank deposit slips to verify updates.</p>
                </div>
              </div>
            </div>

            {/* Saffron Image Card (seva3.jpeg) */}
            <div className="relative rounded-3xl overflow-hidden shadow-xl border border-zinc-200 aspect-video group bg-slate-100">
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

          </div>

          {/* Right Column: Donation Form */}
          <div className="lg:col-span-7 bg-white border border-zinc-200/80 p-8 rounded-3xl shadow-xl relative hover:border-zinc-300 transition-all duration-300">
            
            <h3 className="text-lg font-serif font-bold text-zinc-900 mb-6 flex items-center space-x-2">
              <CreditCard className="w-5 h-5 text-brand-gold-500" />
              <span>Instant Card Payment (Stripe)</span>
            </h3>

            <form onSubmit={handleDonate} className="space-y-5 text-xs font-medium text-slate-700">
              
              {/* Seva Category selection */}
              <div>
                <label className="block text-[10px] font-bold text-zinc-400 mb-1.5 uppercase tracking-widest">
                  Select Seva Category
                </label>
                <select
                  value={sevaType}
                  onChange={handleSevaChange}
                  className="w-full bg-slate-50/50 hover:bg-slate-50 border border-slate-200 focus:bg-white focus:ring-4 focus:ring-brand-gold-500/5 rounded-xl px-4 py-3 text-sm text-zinc-800 focus:outline-none focus:border-brand-gold-500 transition-all duration-300"
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
                <label className="block text-[10px] font-bold text-zinc-400 mb-1.5 uppercase tracking-widest">
                  Donation Amount (INR)
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 font-serif font-bold text-lg">
                    ₹
                  </span>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    disabled={sevaType !== 'general_fund'}
                    placeholder="Enter custom amount"
                    min="1"
                    className="w-full bg-slate-50/50 hover:bg-slate-50 border border-slate-200 focus:bg-white focus:ring-4 focus:ring-brand-gold-500/5 rounded-xl pl-8 pr-4 py-3 text-base text-zinc-800 font-serif font-bold focus:outline-none focus:border-brand-gold-500 disabled:opacity-70 disabled:bg-zinc-100 disabled:cursor-not-allowed transition-all duration-300"
                    required
                  />
                </div>
                {sevaType !== 'general_fund' && (
                  <span className="text-[10px] text-zinc-400 mt-1 block font-mono">
                    * Locked preset package price. Switch category to "General Goushala Fund" to specify custom amounts.
                  </span>
                )}
              </div>

              {/* Donor Name */}
              <div>
                <label className="block text-[10px] font-bold text-zinc-400 mb-1.5 uppercase tracking-widest">
                  Your Full Name
                </label>
                <input
                  type="text"
                  value={donorName}
                  onChange={(e) => setDonorName(e.target.value)}
                  placeholder="e.g. Rajesh Kumar"
                  className="w-full bg-slate-50/50 hover:bg-slate-50 border border-slate-200 focus:bg-white focus:ring-4 focus:ring-brand-gold-500/5 rounded-xl px-4 py-3 text-sm text-zinc-800 focus:outline-none focus:border-brand-gold-500 transition-all duration-300"
                  required
                />
              </div>

              {/* Donor Email */}
              <div>
                <label className="block text-[10px] font-bold text-zinc-400 mb-1.5 uppercase tracking-widest">
                  Your Email Address
                </label>
                <input
                  type="email"
                  value={donorEmail}
                  onChange={(e) => setDonorEmail(e.target.value)}
                  placeholder="e.g. rajesh@example.com"
                  className="w-full bg-slate-50/50 hover:bg-slate-50 border border-slate-200 focus:bg-white focus:ring-4 focus:ring-brand-gold-500/5 rounded-xl px-4 py-3 text-sm text-zinc-800 focus:outline-none focus:border-brand-gold-500 transition-all duration-300"
                  required
                />
              </div>

              {/* Donor Phone */}
              <div>
                <label className="block text-[10px] font-bold text-zinc-400 mb-1.5 uppercase tracking-widest">
                  Your Phone Number
                </label>
                <input
                  type="tel"
                  value={donorPhone}
                  onChange={(e) => setDonorPhone(e.target.value)}
                  placeholder="e.g. +91 9876543210"
                  className="w-full bg-slate-50/50 hover:bg-slate-50 border border-slate-200 focus:bg-white focus:ring-4 focus:ring-brand-gold-500/5 rounded-xl px-4 py-3 text-sm text-zinc-800 focus:outline-none focus:border-brand-gold-500 transition-all duration-300"
                  required
                />
              </div>

              {/* Error Box */}
              {errorMessage && (
                <div className="flex items-center space-x-2 bg-red-50 text-red-700 px-4 py-3 rounded-xl border border-red-150 text-xs">
                  <ShieldAlert className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 rounded-xl text-white font-bold bg-gradient-to-r from-brand-gold-500 to-amber-600 shadow-md hover:shadow-lg hover:brightness-105 active:scale-[0.99] transition-all duration-300 disabled:opacity-75 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center space-x-2 text-sm"
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
