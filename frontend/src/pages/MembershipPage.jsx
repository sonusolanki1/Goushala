import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Heart, Sparkles, Check, Gift, Users, Award, X } from 'lucide-react';

const TIERS = [
  {
    id: 1,
    name: 'Gau Sevak',
    price: 501,
    period: 'month',
    desc: 'Support the daily green fodder and fresh water supply for one rescued calf.',
    color: 'border-stone-200',
    badge: 'Basic Support',
    benefits: [
      'Digital Membership Certificate',
      'Monthly Goushala visual vlogs',
      'Name listed in Annual Report'
    ]
  },
  {
    id: 2,
    name: 'Gau Rakshak',
    price: 2100,
    period: 'quarter',
    desc: 'Sponsor the critical veterinary medicines and seasonal vaccines for 3 cows.',
    color: 'border-brand-gold-400 shadow-brand-gold-500/5',
    badge: 'Popular choice',
    isPopular: true,
    benefits: [
      'Gau Rakshak Copper Badge (Shipped)',
      'Digital Membership Certificate',
      'Monthly Goushala visual vlogs',
      'Bi-annual veterinary health reports',
      'Special prayers offered in your name'
    ]
  },
  {
    id: 3,
    name: 'Gau Patron',
    price: 11000,
    period: 'year',
    desc: 'Sponsor complete wheat bran feed and shed shelter construction for one cow.',
    color: 'border-stone-200',
    badge: 'Annual Care',
    benefits: [
      'Special Vrindavan Prashadam Kit (Shipped)',
      'Name carved on Goushala Patron Wall',
      'Gau Rakshak Copper Badge (Shipped)',
      'Custom framed membership plaque',
      'Lifelong updates & priority support'
    ]
  }
];

export default function MembershipPage() {
  const [selectedTier, setSelectedTier] = useState(null);
  const [regSuccess, setRegSuccess] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleJoinSubmit = (e) => {
    e.preventDefault();
    setRegSuccess(true);
    setTimeout(() => {
      setRegSuccess(false);
      setSelectedTier(null);
      setName('');
      setEmail('');
    }, 3000);
  };

  return (
    <div className="flex-1 bg-stone-50/50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-brand-gold-700 font-bold text-xs uppercase tracking-widest bg-brand-gold-100/60 px-4 py-1.5 rounded-full inline-block mb-3 font-sans">
            Sustaining Patronage
          </span>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-zinc-900 leading-tight">
            Goushala Sacred Membership Program
          </h1>
          <div className="h-1 w-20 bg-brand-gold-500 mx-auto mt-4 rounded-full"></div>
          <p className="text-zinc-500 mt-5 text-sm md:text-base font-light leading-relaxed">
            Become a core pillar of our cow sanctuary. Regular monthly or annual memberships help us budget fodder stocks and medical supplies in advance.
          </p>
        </div>

        {/* Membership Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch mb-16">
          {TIERS.map((tier) => (
            <div
              key={tier.id}
              className={`bg-white border rounded-3xl p-8 flex flex-col justify-between h-full relative transition-all duration-300 ${
                tier.isPopular ? 'ring-2 ring-brand-gold-500 shadow-xl' : 'shadow-sm hover:shadow-lg'
              } ${tier.color}`}
            >
              {tier.isPopular && (
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-brand-gold-500 text-white font-sans font-bold text-[10px] uppercase tracking-widest px-4 py-1.5 rounded-full border border-white">
                  Highly Recommended
                </span>
              )}

              {/* Top block */}
              <div className="space-y-6">
                <div>
                  <span className="text-zinc-400 font-sans text-[10px] uppercase tracking-wider block">{tier.badge}</span>
                  <h3 className="text-2xl font-serif font-bold text-zinc-950 mt-1">{tier.name}</h3>
                  <p className="text-zinc-500 text-xs font-light mt-2 leading-relaxed">{tier.desc}</p>
                </div>

                <div className="flex items-baseline">
                  <span className="text-4xl font-serif font-bold text-zinc-900">₹{tier.price.toLocaleString('en-IN')}</span>
                  <span className="text-zinc-550 text-xs font-light ml-1 font-sans">/{tier.period}</span>
                </div>

                <hr className="border-stone-100" />

                {/* Benefits */}
                <ul className="space-y-3 text-xs font-sans text-zinc-650 font-light">
                  {tier.benefits.map((b, i) => (
                    <li key={i} className="flex items-start space-x-2.5">
                      <Check className="w-4 h-4 text-brand-gold-500 shrink-0 mt-0.5" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Button */}
              <div className="pt-8">
                <button
                  onClick={() => setSelectedTier(tier)}
                  className={`w-full py-3.5 rounded-xl font-bold text-xs shadow-sm hover:scale-[1.01] transition-all cursor-pointer flex items-center justify-center space-x-2 ${
                    tier.isPopular 
                      ? 'bg-brand-gold-500 hover:bg-brand-gold-600 text-white shadow-md' 
                      : 'bg-zinc-950 hover:bg-brand-gold-600 hover:text-white text-white'
                  }`}
                >
                  <Award className="w-4 h-4" />
                  <span>Join as {tier.name}</span>
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* FAQ note block */}
        <div className="bg-white border border-stone-200/80 rounded-3xl p-6 md:p-8 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6 max-w-4xl mx-auto">
          <div className="flex items-start space-x-4">
            <div className="bg-brand-gold-500/10 text-brand-gold-600 p-3 rounded-2xl border border-brand-gold-500/20 shrink-0">
              <Gift className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif font-bold text-zinc-800 text-base">Corporate / Group Memberships</h4>
              <p className="text-zinc-550 text-xs font-light mt-1 leading-relaxed max-w-xl">
                Are you an enterprise, bank, or community center looking to sponsor bulk cow care programs? Contact our trustee desk directly for specialized corporate ESG partnerships.
              </p>
            </div>
          </div>
          <a
            href="/contact"
            className="bg-stone-50 hover:bg-stone-100 border border-stone-200 text-zinc-800 font-semibold text-xs px-6 py-3 rounded-xl transition-all cursor-pointer whitespace-nowrap"
          >
            Contact Trustee Desk
          </a>
        </div>

      </div>

      {/* Membership Join Modal */}
      <AnimatePresence>
        {selectedTier && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedTier(null)}
              className="absolute inset-0 bg-zinc-950/60 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-white rounded-3xl border border-stone-200 shadow-2xl w-full max-w-md overflow-hidden relative z-10 p-6 md:p-8"
            >
              <button
                onClick={() => setSelectedTier(null)}
                className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-zinc-600 rounded-full hover:bg-stone-100 transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {regSuccess ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600 mx-auto border border-emerald-100">
                    <ShieldCheck className="w-10 h-10 animate-bounce" />
                  </div>
                  <h2 className="text-2xl font-serif font-bold text-zinc-900">Welcome to the Trust!</h2>
                  <p className="text-zinc-500 text-sm font-light max-w-sm mx-auto leading-relaxed">
                    Thank you for joining as a <strong>{selectedTier.name}</strong>. Redirecting to payment options...
                  </p>
                </div>
              ) : (
                <div className="space-y-5">
                  <div>
                    <span className="text-[10px] text-brand-gold-700 uppercase tracking-widest font-bold font-sans">
                      Join Membership Program
                    </span>
                    <h2 className="text-xl md:text-2xl font-serif font-bold text-zinc-900 leading-tight">
                      Become a {selectedTier.name}
                    </h2>
                    <p className="text-xs text-zinc-500 mt-1 font-mono">Cost: ₹{selectedTier.price.toLocaleString('en-IN')} / {selectedTier.period}</p>
                  </div>

                  <hr className="border-stone-100" />

                  <form onSubmit={handleJoinSubmit} className="space-y-4">
                    <div>
                      <label className="block text-[11px] font-bold text-zinc-500 mb-1.5 uppercase tracking-wider font-sans">
                        Full Name
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your Name"
                        className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-gold-500 transition-all font-sans"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-zinc-500 mb-1.5 uppercase tracking-wider font-sans">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-gold-500 transition-all font-sans"
                      />
                    </div>

                    <div className="pt-2 flex space-x-3">
                      <button
                        type="button"
                        onClick={() => setSelectedTier(null)}
                        className="w-1/3 py-3 rounded-xl border border-stone-200 text-zinc-650 hover:bg-stone-50 text-xs font-semibold transition-all cursor-pointer text-center"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="w-2/3 py-3 rounded-xl bg-brand-gold-500 hover:bg-brand-gold-600 text-white font-bold text-xs shadow-md transition-all cursor-pointer flex items-center justify-center space-x-2"
                      >
                        <Heart className="w-4 h-4 fill-white" />
                        <span>Pay & Subscribe</span>
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
