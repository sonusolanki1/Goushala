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
    { id: 'general_fund', name: 'General Goushala Fund (Custom Amount)', defaultPrice: '' }
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
      setErrorMessage(err.message || 'Server connection offline. If offline, bank transfer remains fully active.');
      setIsLoading(false);
    }
  };

  return (
    <div className="flex-1 bg-stone-50/50 py-16 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-brand-gold-700 font-bold text-xs uppercase tracking-widest bg-brand-gold-100/60 px-4 py-1.5 rounded-full inline-block mb-3 font-sans">
            Sponsorship Gateway
          </span>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-zinc-900 leading-tight">
            Sponsor Sacred Gau Seva
          </h1>
          <div className="h-1 w-20 bg-brand-gold-500 mx-auto mt-4 rounded-full"></div>
          <p className="text-zinc-500 mt-5 text-sm md:text-base font-light leading-relaxed">
            Support the daily feeding, shelter construction, and veterinary medicines of 350+ sacred cows. Choose online payment or direct bank transfer.
          </p>
        </div>

        {/* Form Container split layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-6xl mx-auto items-start">
          
          {/* Left Column: Direct Bank Transfer Details Card */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-28">
            
            <div className="bg-zinc-950 text-white rounded-3xl p-6 md:p-8 border border-zinc-900 shadow-xl relative overflow-hidden flex flex-col justify-between group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold-500/5 rounded-full blur-2xl transition-all duration-500"></div>
              
              <div>
                <span className="text-[10px] text-brand-gold-400 font-bold uppercase tracking-widest block mb-2">
                  SECURE WIRE TRANSFER
                </span>
                <h3 className="text-xl font-serif font-bold text-white mb-4 flex items-center space-x-2.5">
                  <Landmark className="w-5 h-5 text-brand-gold-500" />
                  <span>Direct Bank Details</span>
                </h3>
                <p className="text-slate-400 text-xs font-light leading-relaxed mb-6">
                  For major contributions, monthly standing orders, or manual deposits, please transfer directly to our trust account:
                </p>

                {/* Account Details Blocks */}
                <div className="space-y-4 text-xs font-sans">
                  
                  {/* Account Name */}
                  <div className="flex justify-between items-center border-b border-zinc-900 pb-2">
                    <span className="text-slate-400">Trust Account Name:</span>
                    <span className="font-semibold text-white text-right font-sans">Krishna Govind Seva Sansthan NGO</span>
                  </div>

                  {/* Bank Name */}
                  <div className="flex justify-between items-center border-b border-zinc-900 pb-2">
                    <span className="text-slate-400">Bank Name:</span>
                    <span className="font-semibold text-white">State Bank of India (SBI)</span>
                  </div>

                  {/* Account Number */}
                  <div className="flex justify-between items-center border-b border-zinc-900 pb-2">
                    <span className="text-slate-400">Account Number:</span>
                    <div className="flex items-center space-x-1.5">
                      <span className="font-mono font-bold text-brand-gold-500 text-sm">4108108108108</span>
                      <button 
                        type="button" 
                        onClick={() => handleCopy('4108108108108', 'acc')} 
                        className="text-slate-400 hover:text-white p-1 rounded hover:bg-zinc-900 transition-colors cursor-pointer"
                      >
                        {copiedField === 'acc' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                  {/* IFSC Code */}
                  <div className="flex justify-between items-center border-b border-zinc-900 pb-2">
                    <span className="text-slate-400">IFSC Code:</span>
                    <div className="flex items-center space-x-1.5">
                      <span className="font-mono font-bold text-white">SBIN0000108</span>
                      <button 
                        type="button" 
                        onClick={() => handleCopy('SBIN0000108', 'ifsc')} 
                        className="text-slate-400 hover:text-white p-1 rounded hover:bg-zinc-900 transition-colors cursor-pointer"
                      >
                        {copiedField === 'ifsc' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                  {/* UPI Address */}
                  <div className="flex justify-between items-center border-b border-zinc-900 pb-2">
                    <span className="text-slate-400">UPI ID / VPA:</span>
                    <div className="flex items-center space-x-1.5">
                      <span className="font-mono text-brand-gold-500 font-semibold">krishnagovind@sbi</span>
                      <button 
                        type="button" 
                        onClick={() => handleCopy('krishnagovind@sbi', 'upi')} 
                        className="text-slate-400 hover:text-white p-1 rounded hover:bg-zinc-900 transition-colors cursor-pointer"
                      >
                        {copiedField === 'upi' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                  {/* Branch name */}
                  <div className="flex justify-between items-center pb-2">
                    <span className="text-slate-400">Branch Name:</span>
                    <span className="font-semibold text-white text-right">Salumber Branch, Rajasthan</span>
                  </div>

                </div>

              </div>

              <div className="border-t border-zinc-900 pt-6 space-y-3 font-sans text-xs">
                <div className="flex items-start space-x-3">
                  <ShieldCheck className="w-4.5 h-4.5 text-brand-gold-500 shrink-0 mt-0.5" />
                  <p className="text-slate-400 leading-relaxed font-light">All direct bank deposits qualify for tax deduction receipts.</p>
                </div>
                <div className="flex items-start space-x-3">
                  <ShieldCheck className="w-4.5 h-4.5 text-brand-gold-500 shrink-0 mt-0.5" />
                  <p className="text-slate-400 leading-relaxed font-light">Please email bank deposit slips to verify updates.</p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Donation Form */}
          <div className="lg:col-span-7 bg-white border border-stone-200/80 p-6 md:p-8 rounded-3xl shadow-sm relative">
            <div className="absolute top-0 left-0 w-full h-1.5 bg-brand-gold-500"></div>
            
            <h3 className="text-lg font-serif font-bold text-zinc-900 mb-6 flex items-center space-x-2">
              <CreditCard className="w-5 h-5 text-brand-gold-500" />
              <span>Instant Card / UPI Payment</span>
            </h3>

            <form onSubmit={handleDonate} className="space-y-5 text-xs font-semibold text-zinc-650">
              
              {/* Seva Category selection */}
              <div>
                <label className="block text-[11px] font-bold text-zinc-500 mb-2 uppercase tracking-wider font-sans">
                  Select Seva Category
                </label>
                <select
                  value={sevaType}
                  onChange={handleSevaChange}
                  className="w-full bg-stone-50 border border-stone-200 focus:bg-white rounded-xl px-4 py-3 text-sm text-zinc-800 focus:outline-none focus:border-brand-gold-500 transition-all font-sans cursor-pointer"
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
                <label className="block text-[11px] font-bold text-zinc-500 mb-2 uppercase tracking-wider font-sans">
                  Donation Amount (INR)
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 font-serif font-bold text-base">
                    ₹
                  </span>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    disabled={sevaType !== 'general_fund'}
                    placeholder="Enter custom amount"
                    min="1"
                    className="w-full bg-stone-50 border border-stone-200 focus:bg-white rounded-xl pl-8 pr-4 py-3.5 text-base text-zinc-900 font-serif font-bold focus:outline-none focus:border-brand-gold-500 disabled:opacity-75 disabled:bg-stone-100 disabled:cursor-not-allowed transition-all"
                    required
                  />
                </div>
                {sevaType !== 'general_fund' && (
                  <span className="text-[10px] text-zinc-450 mt-1.5 block font-sans font-light">
                    * Locked preset package price. Switch category to "General Goushala Fund" to specify custom amounts.
                  </span>
                )}
              </div>

              {/* Donor Name */}
              <div>
                <label className="block text-[11px] font-bold text-zinc-500 mb-2 uppercase tracking-wider font-sans">
                  Your Full Name
                </label>
                <input
                  type="text"
                  value={donorName}
                  onChange={(e) => setDonorName(e.target.value)}
                  placeholder="e.g. Rajesh Kumar"
                  className="w-full bg-stone-50 border border-stone-200 focus:bg-white rounded-xl px-4 py-3 text-sm text-zinc-800 focus:outline-none focus:border-brand-gold-500 transition-all font-sans"
                  required
                />
              </div>

              {/* Donor Email */}
              <div>
                <label className="block text-[11px] font-bold text-zinc-500 mb-2 uppercase tracking-wider font-sans">
                  Your Email Address
                </label>
                <input
                  type="email"
                  value={donorEmail}
                  onChange={(e) => setDonorEmail(e.target.value)}
                  placeholder="e.g. rajesh@example.com"
                  className="w-full bg-stone-50 border border-stone-200 focus:bg-white rounded-xl px-4 py-3 text-sm text-zinc-800 focus:outline-none focus:border-brand-gold-500 transition-all font-sans"
                  required
                />
              </div>

              {/* Donor Phone */}
              <div>
                <label className="block text-[11px] font-bold text-zinc-500 mb-2 uppercase tracking-wider font-sans">
                  Your Phone Number
                </label>
                <input
                  type="tel"
                  value={donorPhone}
                  onChange={(e) => setDonorPhone(e.target.value)}
                  placeholder="e.g. +91 98765 43210"
                  className="w-full bg-stone-50 border border-stone-200 focus:bg-white rounded-xl px-4 py-3 text-sm text-zinc-800 focus:outline-none focus:border-brand-gold-500 transition-all font-sans"
                  required
                />
              </div>

              {/* Error Box */}
              {errorMessage && (
                <div className="flex items-center space-x-2 bg-red-50 text-red-700 px-4 py-3 rounded-xl border border-red-150 text-xs">
                  <ShieldAlert className="w-4.5 h-4.5 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 rounded-xl text-white font-bold bg-zinc-950 hover:bg-brand-gold-600 transition-colors shadow-sm disabled:opacity-75 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center space-x-2 text-xs"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Connecting to Secure gateway...</span>
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
