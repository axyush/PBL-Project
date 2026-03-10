import React from 'react';
import { Leaf, Users, ShieldCheck, Globe, Sprout, Heart } from 'lucide-react';
import { motion } from 'motion/react';

const About = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <div className="max-w-3xl mx-auto text-center mb-24">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-20 h-20 bg-emerald-600 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-xl shadow-emerald-200"
        >
          <Leaf className="text-white w-10 h-10" />
        </motion.div>
        <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-8 tracking-tight">
          Modernizing Agriculture with <span className="text-emerald-600">Intelligence</span>
        </h1>
        <p className="text-xl text-slate-600 leading-relaxed">
          AgriSmart AI is a mission-driven platform dedicated to empowering farmers with the world's most advanced AI technology. We believe that data-driven decisions are the key to a sustainable and prosperous agricultural future.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-24">
        {[
          { icon: Users, title: 'Farmer Centric', desc: 'Every feature we build is designed with the farmer in mind, ensuring ease of use and practical value.' },
          { icon: ShieldCheck, title: 'Scientific Rigor', desc: 'Our AI models are trained on vast agricultural datasets and validated by experts for accuracy.' },
          { icon: Globe, title: 'Sustainable Growth', desc: 'We promote farming practices that are not only profitable but also environmentally friendly.' },
        ].map((item, i) => (
          <div key={i} className="text-center">
            <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <item.icon className="w-8 h-8 text-emerald-600" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-4">{item.title}</h3>
            <p className="text-slate-600 leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>

      <div className="bg-slate-50 rounded-[60px] p-12 lg:p-24">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8">Our Vision</h2>
            <p className="text-lg text-slate-600 leading-relaxed mb-8">
              To bridge the digital divide in agriculture and ensure that every farmer, regardless of their location or scale, has access to expert-level advice and real-time market insights.
            </p>
            <div className="space-y-4">
              {[
                'Empowering 10 million farmers by 2030',
                'Reducing crop loss due to diseases by 40%',
                'Increasing average farmer income by 25%',
                'Promoting water-efficient irrigation globally'
              ].map((goal, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center">
                    <Sprout className="w-3 h-3 text-emerald-600" />
                  </div>
                  <span className="font-bold text-slate-700">{goal}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:w-1/2">
            <div className="relative">
              <div className="absolute -inset-4 bg-emerald-500/10 rounded-[40px] blur-2xl"></div>
              <img 
                src="https://picsum.photos/seed/vision/800/800" 
                alt="Vision" 
                className="relative rounded-[40px] shadow-2xl"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-24 text-center">
        <h2 className="text-3xl font-bold text-slate-900 mb-8">Made with <Heart className="inline-block text-red-500 w-6 h-6 fill-red-500" /> for the Farming Community</h2>
        <p className="text-slate-500">AgriSmart AI Team</p>
      </div>
    </div>
  );
};

export default About;
