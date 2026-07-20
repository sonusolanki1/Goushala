import React from 'react';

export default function PrivacyPage() {
  return (
    <div className="flex-1 bg-stone-50/50 py-16 font-sans">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 bg-white border border-stone-200/80 rounded-3xl p-8 md:p-12 shadow-sm">
        <span className="text-[10px] text-brand-gold-700 uppercase tracking-widest font-bold">Trust Policy</span>
        <h1 className="text-3xl font-serif font-bold text-zinc-950 mt-1 mb-6">Privacy Policy</h1>
        
        <div className="space-y-6 text-zinc-650 text-xs md:text-sm font-light leading-relaxed">
          <p>
            Effective Date: July 20, 2026. This Privacy Policy describes how Krishna Govind Seva Sansthan NGO ("we", "our", or "us") collects, uses, and shares your personal information when you visit and donate through our website.
          </p>

          <h2 className="text-base font-serif font-bold text-zinc-900 mt-8 mb-2">1. Information We Collect</h2>
          <p>
            When you make a donation, apply to volunteer, or register for memberships, we collect your name, email address, phone number, and mailing address. We do not store credit card or bank login details on our servers; all payments are processed through secure, PCI-compliant gateways (such as Stripe or Razorpay).
          </p>

          <h2 className="text-base font-serif font-bold text-zinc-900 mt-8 mb-2">2. How We Use Your Information</h2>
          <p>
            We use your information to process donations, generate tax-exemption receipts (under Section 80G), send newsletters, and provide regular health updates about cow adoptions.
          </p>

          <h2 className="text-base font-serif font-bold text-zinc-900 mt-8 mb-2">3. Information Sharing</h2>
          <p>
            We do not sell, rent, or trade your personal information to third parties. We share data only with authorized processors (like payment gateways) to complete transaction requests.
          </p>

          <h2 className="text-base font-serif font-bold text-zinc-900 mt-8 mb-2">4. Security</h2>
          <p>
            We implement industry-standard encryption protocols (SSL/TLS) to secure all communications and protect user data from unauthorized access or disclosure.
          </p>

          <h2 className="text-base font-serif font-bold text-zinc-900 mt-8 mb-2">5. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please email us at <span className="font-mono text-zinc-900">info@krishnagovindsevasansthan.org</span>.
          </p>
        </div>
      </div>
    </div>
  );
}
