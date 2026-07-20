import React from 'react';

export default function TermsPage() {
  return (
    <div className="flex-1 bg-stone-50/50 py-16 font-sans">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 bg-white border border-stone-200/80 rounded-3xl p-8 md:p-12 shadow-sm">
        <span className="text-[10px] text-brand-gold-700 uppercase tracking-widest font-bold">Trust Agreement</span>
        <h1 className="text-3xl font-serif font-bold text-zinc-950 mt-1 mb-6">Terms of Service</h1>
        
        <div className="space-y-6 text-zinc-650 text-xs md:text-sm font-light leading-relaxed">
          <p>
            Welcome to the website of Krishna Govind Seva Sansthan NGO. By accessing this website, you agree to comply with and be bound by the following Terms of Service.
          </p>

          <h2 className="text-base font-serif font-bold text-zinc-900 mt-8 mb-2">1. Use of the Site</h2>
          <p>
            You agree to use this website only for lawful purposes, such as processing Gau Seva donations, volunteering, and reviewing cow safety updates. Unauthorized attempts to exploit website services, forms, or admin databases are strictly prohibited.
          </p>

          <h2 className="text-base font-serif font-bold text-zinc-900 mt-8 mb-2">2. Donations & Refunds</h2>
          <p>
            All online donations made to our Goushala are voluntary contributions. Donations are generally non-refundable. If an accidental duplicate transaction occurs, please contact our support desk within 7 working days to resolve the billing query.
          </p>

          <h2 className="text-base font-serif font-bold text-zinc-900 mt-8 mb-2">3. Intellectual Property</h2>
          <p>
            All photographic snippets, video logs, text descriptions, logos, and custom UI icons are the exclusive intellectual property of Krishna Govind Seva Sansthan NGO, unless otherwise noted. Reuse of media without written consent is prohibited.
          </p>

          <h2 className="text-base font-serif font-bold text-zinc-900 mt-8 mb-2">4. Disclaimers</h2>
          <p>
            We strive to present precise, real-time records regarding cow counts and medicine stocks. However, the website content is provided "as is" without warranties of any kind.
          </p>

          <h2 className="text-base font-serif font-bold text-zinc-900 mt-8 mb-2">5. Governing Law</h2>
          <p>
            These terms are governed by and construed in accordance with the laws of India. Any disputes arising out of the website use will be subject to the exclusive jurisdiction of the courts of Rajasthan.
          </p>
        </div>
      </div>
    </div>
  );
}
