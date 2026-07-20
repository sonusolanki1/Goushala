import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Search, CheckCircle, Info, Sparkles, Users, Award, ShieldCheck } from 'lucide-react';

export default function AdoptionPage() {
  const steps = [
    {
      id: 1,
      title: 'Choose a Cow',
      desc: 'Browse our Cow Directory to find a cow or calf whose story connects with your heart. We shelter 350+ cows of pure indigenous breeds.'
    },
    {
      id: 2,
      title: 'Select a Care Level',
      desc: 'Sponsor green fodder feed, veterinary medical support, or cover complete lifetime care including construction of weather-proof barns.'
    },
    {
      id: 3,
      title: 'Receive Bi-Monthly Updates',
      desc: 'Get personal email updates, health check reports, and video snippets showing how your adopted cow is progressing at our sanctuary.'
    },
    {
      id: 4,
      title: 'Visit Vrindavan Shelter',
      desc: 'You are welcome to visit our physical facility at Rajasthan/Vrindavan. Perform personal Gau Puja, distribute treats, and meet your cow in person.'
    }
  ];

  return (
    <div className="flex-1 bg-stone-50/50 py-16 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Hero Banner Section */}
        <section className="bg-zinc-950 text-white rounded-3xl p-8 md:p-16 relative overflow-hidden shadow-2xl border border-zinc-900 mb-16">
          <div className="absolute top-0 right-0 w-80 h-80 bg-brand-gold-500/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
          <div className="max-w-3xl space-y-6 relative z-10">
            <span className="text-brand-gold-400 font-mono text-xs uppercase tracking-widest font-bold bg-brand-gold-500/10 px-4 py-1.5 rounded-full border border-brand-gold-500/20 inline-block">
              Virtual Adoption
            </span>
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-white leading-tight">
              Adopt (Sponsor) a Cow Virtually
            </h1>
            <p className="text-slate-400 text-sm md:text-base font-light leading-relaxed max-w-2xl">
              Can\'t keep a cow at home? You can still fulfill the sacred duty of cow protection. Sponsor a sheltered cow online and cover their monthly feeding, shelter, and medical needs.
            </p>
            <div className="pt-2">
              <Link
                to="/cows"
                className="inline-flex items-center space-x-2 bg-brand-gold-500 hover:bg-brand-gold-600 text-white font-bold text-xs px-8 py-4 rounded-full shadow-lg transition-transform hover:scale-[1.02]"
              >
                <Search className="w-4.5 h-4.5" />
                <span>Browse Cows to Adopt</span>
              </Link>
            </div>
          </div>
        </section>

        {/* How It Works (Steps) */}
        <section className="space-y-12 mb-16">
          <div className="text-center max-w-xl mx-auto">
            <h2 className="text-2xl md:text-4xl font-serif font-bold text-zinc-900">How Cow Adoption Works</h2>
            <div className="h-1 w-16 bg-brand-gold-500 mx-auto mt-3 rounded-full"></div>
            <p className="text-zinc-500 text-xs font-light mt-3 leading-relaxed">
              Adopt virtually in four simple steps and stay connected to Gomata\'s daily well-being.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step) => (
              <div key={step.id} className="bg-white border border-stone-200/80 rounded-3xl p-6 md:p-8 shadow-sm flex flex-col justify-between h-full hover:shadow-lg transition-shadow duration-300">
                <div className="space-y-4">
                  <span className="w-10 h-10 rounded-2xl bg-brand-gold-500/10 text-brand-gold-700 border border-brand-gold-500/20 font-serif font-bold text-lg flex items-center justify-center">
                    0{step.id}
                  </span>
                  <h3 className="font-serif font-bold text-zinc-800 text-base">{step.title}</h3>
                  <p className="text-zinc-550 text-xs font-light leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Benefits Summary Section */}
        <section className="bg-white border border-stone-200/80 rounded-3xl p-8 md:p-12 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-5xl mx-auto">
          
          <div className="lg:col-span-7 space-y-6">
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-zinc-950 leading-tight">Adoption Benefits & Certifications</h2>
            <div className="h-1 w-16 bg-brand-gold-500 rounded-full"></div>
            
            <ul className="space-y-4 text-xs md:text-sm text-zinc-650 font-light font-sans">
              <li className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-brand-gold-500 shrink-0 mt-0.5" />
                <span><strong>Tax Exemptions:</strong> Receive an official donation certificate under Section 80G for standard Indian income tax rebate.</span>
              </li>
              <li className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-brand-gold-500 shrink-0 mt-0.5" />
                <span><strong>Certificate & Photo Frame:</strong> Get a custom physical cow adoption certificate with a photograph of your cow.</span>
              </li>
              <li className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-brand-gold-500 shrink-0 mt-0.5" />
                <span><strong>Family Visits:</strong> Celebrate birthdays or anniversaries by visiting the shelter and distributing organic treat boxes.</span>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="absolute -inset-4 bg-brand-gold-500/5 rounded-3xl blur-2xl -z-10"></div>
            <div className="border border-stone-200 shadow-xl rounded-3xl p-6 md:p-8 bg-stone-50 space-y-4">
              <div className="flex items-center space-x-3">
                <Award className="w-8 h-8 text-brand-gold-500" />
                <h3 className="font-serif font-bold text-zinc-900 text-lg">Gau Adoption Trust</h3>
              </div>
              <p className="text-zinc-550 text-xs font-light leading-relaxed">
                "Whoever feeds a cow everyday, receives the merit of performing an Ashvamedha Yajna."
              </p>
              <span className="text-[10px] text-zinc-450 uppercase font-mono block">— Vedic Scriptures</span>
            </div>
          </div>

        </section>

      </div>
    </div>
  );
}
