import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Calendar, ArrowRight, Rss, ArrowUpRight, Search, Heart, Mail, CheckCircle2 } from 'lucide-react';

const NEWS_DATA = [
  {
    id: 1,
    title: 'Goushala Expansion: RESCUE operations peak as winter sets in',
    source: 'Rajasthan Local Chronicle',
    date: 'July 15, 2026',
    desc: 'With support from national donors, we have expanded our main shelter block in Rajasthan. Over 45 distressed street cows were safely rescued during last week\'s rainfall.',
    category: 'Press Release',
    url: '#',
    image: 'https://images.unsplash.com/photo-1527153857715-3908f2bac5e8?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 2,
    title: 'A Guide to Organic Panchagavya Farming Fertilizers',
    source: 'Gau Krishi Patrika',
    date: 'June 28, 2026',
    desc: 'Understanding the biological science behind cow urine (Gomutra) and dung fertilizers. How small-scale farmers in Salumber are tripling soil yields naturally.',
    category: 'Educational Blog',
    url: '#',
    image: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 3,
    title: 'Dr. Sharma joins as Chief Veterinary Officer',
    source: 'Goushala Bulletins',
    date: 'May 10, 2026',
    desc: 'Former senior veterinary surgeon from Government Animal Hospital Udaipur has formally joined our sanctuary clinic, bringing 22+ years of critical surgery expertise.',
    category: 'Shelter Update',
    url: '#',
    image: 'https://images.unsplash.com/photo-1589923188900-85dae440342b?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 4,
    title: 'Impact of Saffron feed additives on indigenous calf immunity',
    source: 'Veterinary Research Journal',
    date: 'Apr 02, 2026',
    desc: 'A scientific paper outlining how traditional dietary feed structures (including mustard oil cake) drastically reduces foot-and-mouth disease occurrences.',
    category: 'Scientific Research',
    url: '#',
    image: 'https://images.unsplash.com/photo-1596733430284-f7437764b1a9?auto=format&fit=crop&w=800&q=80'
  }
];

export default function NewsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);

  const categories = ['All', 'Press Release', 'Educational Blog', 'Shelter Update', 'Scientific Research'];

  const filteredNews = NEWS_DATA.filter(news => {
    const matchesSearch = news.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          news.desc.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = activeCategory === 'All' || news.category === activeCategory;
    return matchesSearch && matchesCat;
  });

  const handleSubscribe = (e) => {
    e.preventDefault();
    setNewsletterSuccess(true);
    setNewsletterEmail('');
    setTimeout(() => setNewsletterSuccess(false), 4000);
  };

  return (
    <div className="flex-1 bg-stone-50/50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-brand-gold-700 font-bold text-xs uppercase tracking-widest bg-brand-gold-100/60 px-4 py-1.5 rounded-full inline-block mb-3 font-sans">
            Press & Media
          </span>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-zinc-900 leading-tight">
            News, Research & Vedic Blogs
          </h1>
          <div className="h-1 w-20 bg-brand-gold-500 mx-auto mt-4 rounded-full"></div>
          <p className="text-zinc-500 mt-5 text-sm md:text-base font-light leading-relaxed">
            Read recent news coverage, educational articles about cow protection, organic farming techniques, and official updates from our trust.
          </p>
        </div>

        {/* Filter Toolbar */}
        <div className="bg-white border border-stone-200/80 rounded-3xl p-6 shadow-sm mb-12 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          
          {/* Categories */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-zinc-950 text-white shadow-sm'
                    : 'bg-stone-50 border border-stone-200 text-zinc-650 hover:bg-stone-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
            <input
              type="text"
              placeholder="Search news..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-none focus:border-brand-gold-500 transition-all font-sans"
            />
          </div>
        </div>

        {/* News Grid */}
        {filteredNews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredNews.map((news) => (
              <motion.article
                key={news.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white border border-stone-200/80 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:border-brand-gold-200/60 transition-all duration-350 flex flex-col justify-between h-full group"
              >
                {/* Photo */}
                <div className="relative aspect-[16/9] w-full bg-stone-100 overflow-hidden">
                  <img
                    src={news.image}
                    alt={news.title}
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                  <span className="absolute top-4 left-4 bg-zinc-950/70 backdrop-blur-sm text-white px-3 py-1 rounded-xl text-[10px] font-bold uppercase tracking-wider">
                    {news.category}
                  </span>
                </div>

                {/* Body */}
                <div className="p-6 md:p-8 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs text-zinc-450 font-mono">
                      <span>{news.source}</span>
                      <span className="flex items-center space-x-1">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{news.date}</span>
                      </span>
                    </div>

                    <h3 className="text-lg md:text-xl font-serif font-bold text-zinc-900 group-hover:text-brand-gold-500 transition-colors duration-300 leading-snug">
                      {news.title}
                    </h3>
                    <p className="text-zinc-600 text-xs md:text-sm font-light leading-relaxed line-clamp-3">
                      {news.desc}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                    <a
                      href={news.url}
                      className="inline-flex items-center space-x-1.5 text-zinc-900 hover:text-brand-gold-500 text-xs font-semibold transition-colors font-sans"
                    >
                      <span>Read Full Article</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white border border-stone-200/60 rounded-3xl max-w-md mx-auto space-y-4">
            <div className="w-16 h-16 bg-stone-50 rounded-full flex items-center justify-center text-zinc-400 mx-auto border border-stone-150">
              <BookOpen className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-serif font-bold text-zinc-800">No articles match your search</h3>
            <p className="text-zinc-550 text-xs font-light leading-relaxed">
              Try adjusting your category filter or search keywords.
            </p>
          </div>
        )}

        {/* Newsletter callout */}
        <section className="mt-20 bg-zinc-950 text-white rounded-3xl p-8 md:p-12 relative overflow-hidden shadow-2xl border border-zinc-900">
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-gold-500/5 rounded-full blur-3xl -mr-20 -mt-20"></div>
          <div className="max-w-3xl mx-auto text-center space-y-6 relative z-10">
            <span className="text-brand-gold-400 font-mono text-[10px] uppercase tracking-widest font-bold bg-brand-gold-500/10 px-3 py-1 rounded-full border border-brand-gold-500/20 inline-block">
              Subscribe to Goushala Logs
            </span>
            <h2 className="text-2xl md:text-4xl font-serif font-bold text-white leading-tight">
              Get Monthly Cow Care Updates & Vedic Wisdom
            </h2>
            <p className="text-slate-400 text-xs md:text-sm font-light leading-relaxed max-w-xl mx-auto">
              Join 4,500+ subscribers who receive our visual digests, stories of newly rescued cows, and newsletters on cow farming science.
            </p>

            <form onSubmit={handleSubscribe} className="max-w-md mx-auto flex flex-col sm:flex-row gap-3 pt-2">
              <div className="relative flex-1">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="email"
                  required
                  placeholder="Enter email address"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-zinc-900 border border-zinc-800 rounded-xl text-sm focus:outline-none focus:border-brand-gold-500 text-white placeholder-slate-500 font-sans"
                />
              </div>
              <button
                type="submit"
                className="bg-brand-gold-500 hover:bg-brand-gold-600 text-white font-bold text-xs px-6 py-3 rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center space-x-1.5"
              >
                <Rss className="w-4 h-4" />
                <span>Join Newsletter</span>
              </button>
            </form>

            {newsletterSuccess && (
              <div className="flex items-center justify-center space-x-2 text-emerald-400 text-xs font-mono bg-emerald-500/5 py-2.5 max-w-sm mx-auto rounded-xl border border-emerald-500/10">
                <CheckCircle2 className="w-4 h-4" />
                <span>Subscription successful! Thank you.</span>
              </div>
            )}
          </div>
        </section>

      </div>
    </div>
  );
}
