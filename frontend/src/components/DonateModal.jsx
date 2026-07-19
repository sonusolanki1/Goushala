import React, { useState, useEffect } from 'react';
import { X, Heart, ShieldAlert, Loader2 } from 'lucide-react';

export default function DonateModal({ isOpen, onClose, selectedSevaPreset }) {
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
    { id: 'general_fund', name: 'General Goushala Fund (Custom)', defaultPrice: '' }
  ];

  // Sync selected preset from parent
  useEffect(() => {
    if (selectedSevaPreset) {
      setSevaType(selectedSevaPreset.id);
      if (selectedSevaPreset.price === 'Custom') {
        setAmount('');
      } else {
        setAmount(selectedSevaPreset.price);
      }
    }
  }, [selectedSevaPreset]);

  // Adjust amount when Seva Type dropdown changes
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
      setErrorMessage('Please enter your email.');
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
        throw new Error('Stripe redirect URL not received.');
      }
    } catch (err) {
      console.error(err);
      setErrorMessage(err.message || 'Server error. Please try again later.');
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      ></div>

      {/* Modal Container */}
      <div className="relative bg-white rounded-3xl max-w-lg w-full p-6 md:p-8 shadow-2xl border border-amber-100 z-10 overflow-hidden transform transition-all">
        {/* Top Gradient Decorator */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-brand-gold-400 via-amber-500 to-brand-green-600"></div>

        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Content */}
        <div className="flex flex-col items-center text-center mb-6 mt-2">
          <div className="bg-amber-50 p-3 rounded-2xl w-fit border border-amber-100 mb-3">
            <Heart className="w-6 h-6 text-brand-gold-600 fill-brand-gold-600/20" />
          </div>
          <h3 className="text-2xl font-bold font-serif text-slate-850">
            Sponsor Gau Seva
          </h3>
          <p className="text-xs text-slate-500 font-light mt-1">
            Krishna Govind Seva Sansthan Trust Goushala
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleDonate} className="space-y-4">
          
          {/* Seva Type Dropdown */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">
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

          {/* Amount Input */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">
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
                placeholder="Enter amount"
                min="1"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-8 pr-4 py-3 text-base text-slate-800 font-serif font-bold focus:outline-none focus:border-brand-gold-500 focus:ring-1 focus:ring-brand-gold-500 disabled:opacity-75 disabled:bg-slate-100 disabled:cursor-not-allowed"
                required
              />
            </div>
            {sevaType !== 'general_fund' && (
              <span className="text-[10px] text-slate-400 mt-1 block">
                * Selected preset amount is locked. Select "General Goushala Fund" to choose a custom amount.
              </span>
            )}
          </div>

          {/* Donor Name */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">
              Your Full Name
            </label>
            <input
              type="text"
              value={donorName}
              onChange={(e) => setDonorName(e.target.value)}
              placeholder="e.g. Rajesh Kumar"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none focus:border-brand-gold-500 focus:ring-1 focus:ring-brand-gold-500"
              required
            />
          </div>

          {/* Donor Email */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">
              Your Email Address
            </label>
            <input
              type="email"
              value={donorEmail}
              onChange={(e) => setDonorEmail(e.target.value)}
              placeholder="e.g. rajesh@example.com"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none focus:border-brand-gold-500 focus:ring-1 focus:ring-brand-gold-500"
              required
            />
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div className="flex items-center space-x-2 bg-red-50 text-red-700 px-4 py-3 rounded-xl border border-red-100 text-xs">
              <ShieldAlert className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Stripe Trust text */}
          <p className="text-[10px] text-slate-400 text-center font-light mt-2 leading-relaxed">
            By clicking below, you will be redirected to Stripe Checkout. All transactions are secure and encrypted.
          </p>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-4 rounded-xl text-white font-semibold flex items-center justify-center space-x-2 bg-gradient-to-r from-brand-gold-500 to-amber-600 hover:scale-[1.01] active:scale-[0.99] transition-all shadow-md duration-300 disabled:opacity-75 disabled:cursor-not-allowed cursor-pointer"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Redirecting to Stripe...</span>
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
  );
}
