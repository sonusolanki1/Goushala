import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, Info, FileText, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const FAQS = [
  {
    question: 'Where is the Goushala located and can I visit?',
    answer: 'Our primary Goushala facility is located in Salumber, near Udaipur, Rajasthan (Pincode - 313027). We also maintain a shelter outpost in Vrindavan. You are welcome to visit our physical facilities between 09:00 AM and 05:00 PM on any day of the week. Please contact our trust desk 24 hours in advance to coordinate your visit.'
  },
  {
    question: 'Is Krishna Govind Seva Sansthan a registered NGO?',
    answer: 'Yes, we are a registered non-governmental organization (NGO) under registration number IV-108/2024. Our operations are fully audited, and we maintain an absolute policy of financial transparency.'
  },
  {
    question: 'Are my online donations tax-deductible?',
    answer: 'Yes. All donations made to Krishna Govind Seva Sansthan are eligible for tax exemption under Section 80G of the Income Tax Act, 1961. Once your payment goes through, the 80G receipt will be generated and emailed to your address automatically.'
  },
  {
    question: 'Can I sponsor a specific cow and get updates?',
    answer: 'Yes, our Virtual Cow Adoption Program allows you to choose a specific cow or calf. We will send you bi-monthly health and feeding updates along with short video snippets of your sponsored cow.'
  },
  {
    question: 'How are the donated funds utilized?',
    answer: 'More than 85% of all received donations go directly towards purchasing dry feed (mustard cakes, wheat bran), fresh green clover grass, veterinary medicines, surgical equipment, and maintaining the shelter sheds. The remaining 15% covers staff caretaker salaries, rescue ambulance fuel, and utility bills.'
  },
  {
    question: 'Can I donate fodder, grain, or medicines physically?',
    answer: 'Yes! We welcome physical donations of wheat flour, green grass fodder, mustard seed cakes, and cattle medicines. You can ship them directly to our Rajasthan office address or drop them off in person.'
  }
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="flex-1 bg-stone-50/50 py-16 font-sans">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-brand-gold-700 font-bold text-xs uppercase tracking-widest bg-brand-gold-100/60 px-4 py-1.5 rounded-full inline-block mb-3 font-sans">
            Help Center
          </span>
          <h1 className="text-3xl md:text-5xl font-serif font-bold text-zinc-900 leading-tight">
            Frequently Asked Questions
          </h1>
          <div className="h-1 w-20 bg-brand-gold-500 mx-auto mt-4 rounded-full"></div>
          <p className="text-zinc-500 mt-5 text-sm md:text-base font-light leading-relaxed">
            Have questions about donations, cow adoptions, visiting guidelines, or tax exemptions? Find answers below or contact our trustee team.
          </p>
        </div>

        {/* Accordion Layout */}
        <div className="space-y-4">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="bg-white border border-stone-200/80 rounded-2xl overflow-hidden shadow-sm hover:shadow transition-shadow duration-300"
              >
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full flex items-center justify-between p-6 text-left focus:outline-none cursor-pointer"
                >
                  <span className="font-serif font-bold text-zinc-900 text-sm md:text-base pr-4">
                    {faq.question}
                  </span>
                  <div className="p-1 rounded-lg bg-stone-50 border border-stone-150 text-zinc-500 shrink-0">
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                    >
                      <div className="px-6 pb-6 pt-0 border-t border-stone-100 text-zinc-600 text-xs md:text-sm font-light leading-relaxed whitespace-pre-line">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Callout box */}
        <div className="bg-zinc-950 text-white rounded-3xl p-8 text-center space-y-6 mt-16 shadow-xl border border-zinc-900 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-brand-gold-500/5 rounded-full blur-2xl"></div>
          <h3 className="font-serif font-bold text-xl md:text-2xl">Still have a question?</h3>
          <p className="text-slate-400 text-xs font-light max-w-md mx-auto leading-relaxed">
            Our support desk is open 24 hours to address queries regarding bank transfers, cow welfare, or residential volunteering.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row justify-center gap-3">
            <Link
              to="/contact"
              className="bg-white hover:bg-stone-50 text-zinc-900 font-bold text-xs px-6 py-3 rounded-xl transition-all shadow"
            >
              Get in Touch
            </Link>
            <Link
              to="/donate"
              className="bg-brand-gold-500 hover:bg-brand-gold-600 text-white font-bold text-xs px-6 py-3 rounded-xl transition-all shadow-md flex items-center justify-center space-x-1.5"
            >
              <Heart className="w-4 h-4 fill-white" />
              <span>Donate to Goushala</span>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
