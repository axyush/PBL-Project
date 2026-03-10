import React, { useState, useEffect } from 'react';
import { BookOpen, Search, Filter, ExternalLink, ShieldCheck, Users, ChevronRight, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';

const GovernmentSchemes = () => {
  const [schemes, setSchemes] = useState<any[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch('/api/schemes').then(res => res.json()).then(setSchemes);
  }, []);

  const filteredSchemes = schemes.filter(s => 
    s.title.toLowerCase().includes(search.toLowerCase()) || 
    s.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-3xl mx-auto text-center mb-16">
        <h1 className="text-3xl font-bold text-slate-900 mb-4">Government Schemes & Insurance</h1>
        <p className="text-slate-600">Explore agricultural subsidies, income support programs, and crop insurance schemes provided by the government to support farmers.</p>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search schemes by name or keyword..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 shadow-sm"
          />
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto overflow-x-auto no-scrollbar">
          {['All', 'Subsidies', 'Insurance', 'Income Support', 'Loans'].map((cat, i) => (
            <button key={i} className={`whitespace-nowrap px-6 py-3 rounded-xl text-sm font-bold transition-all ${
              i === 0 ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-200' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}>
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredSchemes.map((scheme, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white rounded-[40px] border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-emerald-500/5 transition-all flex flex-col group"
          >
            <div className="p-8 flex-grow">
              <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <BookOpen className="w-7 h-7 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">{scheme.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-6">
                {scheme.description}
              </p>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="mt-1 w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Eligibility</div>
                    <div className="text-xs text-slate-700 font-medium">{scheme.eligibility}</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-8 pt-0 mt-auto">
              <a 
                href={scheme.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full py-4 bg-slate-50 text-slate-900 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-emerald-600 hover:text-white transition-all"
              >
                Learn More & Apply <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Help Section */}
      <div className="mt-24 bg-slate-900 rounded-[60px] p-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10">
          <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500 rounded-full blur-[120px]"></div>
        </div>
        <div className="relative flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-2/3">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Need help with applications?</h2>
            <p className="text-slate-400 text-lg mb-8 max-w-2xl">
              Our AI Assistant can guide you through the eligibility criteria and required documents for any of these schemes. Just ask!
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-3 bg-white/5 px-6 py-3 rounded-2xl border border-white/10">
                <Users className="text-emerald-500 w-5 h-5" />
                <span className="text-white font-medium">1-on-1 Support</span>
              </div>
              <div className="flex items-center gap-3 bg-white/5 px-6 py-3 rounded-2xl border border-white/10">
                <ShieldCheck className="text-emerald-500 w-5 h-5" />
                <span className="text-white font-medium">Verified Info</span>
              </div>
            </div>
          </div>
          <div className="lg:w-1/3 w-full">
            <button className="w-full py-6 bg-emerald-600 text-white rounded-3xl font-bold text-xl hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-900/20">
              Chat with Assistant
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GovernmentSchemes;
