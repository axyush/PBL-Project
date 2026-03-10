import React from 'react';
import { Link } from 'react-router-dom';
import { 
  MessageSquare, 
  Sprout, 
  Bug, 
  TrendingUp, 
  BookOpen, 
  ChevronRight, 
  ShieldCheck, 
  Zap, 
  BarChart3,
  Users,
  Search
} from 'lucide-react';
import { motion } from 'motion/react';

const FeatureCard = ({ icon: Icon, title, description, link, color }: any) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl hover:shadow-emerald-500/5 transition-all group"
  >
    <div className={`w-14 h-14 rounded-2xl ${color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
      <Icon className="text-white w-7 h-7" />
    </div>
    <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
    <p className="text-slate-600 mb-6 leading-relaxed">
      {description}
    </p>
    <Link 
      to={link} 
      className="inline-flex items-center text-emerald-600 font-semibold hover:gap-2 transition-all"
    >
      Get Started <ChevronRight className="w-4 h-4 ml-1" />
    </Link>
  </motion.div>
);

const LandingPage = () => {
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 lg:pt-32 lg:pb-48 bg-white">
        <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:40px_40px] opacity-[0.03]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-block py-1 px-3 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-6">
                The Future of Agriculture
              </span>
              <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight mb-8 leading-[1.1]">
                AI Powered <span className="text-emerald-600">Farming</span> Assistance
              </h1>
              <p className="text-xl text-slate-600 mb-10 leading-relaxed">
                Helping farmers make smarter agricultural decisions using AI, real-time data, and simple digital tools. Increase your yield and profit today.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  to="/assistant"
                  className="w-full sm:w-auto px-8 py-4 bg-emerald-600 text-white rounded-2xl font-bold text-lg shadow-lg shadow-emerald-200 hover:bg-emerald-700 hover:shadow-emerald-300 transition-all flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-5 h-5" />
                  Ask AI Assistant
                </Link>
                <Link
                  to="/diseases"
                  className="w-full sm:w-auto px-8 py-4 bg-white text-slate-900 border-2 border-slate-100 rounded-2xl font-bold text-lg hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
                >
                  <Bug className="w-5 h-5" />
                  Upload Crop Image
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-emerald-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { label: 'Farmers Helped', value: '50K+' },
              { label: 'Crops Supported', value: '100+' },
              { label: 'Accuracy Rate', value: '98%' },
              { label: 'States Covered', value: '25+' },
            ].map((stat, i) => (
              <div key={i}>
                <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-emerald-100 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Core Platform Features</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Everything you need to manage your farm more efficiently, all in one place.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard 
              icon={MessageSquare}
              title="AI Farming Assistant"
              description="Ask any farming question via text, voice, or image and get instant expert advice."
              link="/assistant"
              color="bg-blue-500"
            />
            <FeatureCard 
              icon={Sprout}
              title="Crop Recommendation"
              description="Get personalized crop suggestions based on your location, soil type, and season."
              link="/crops"
              color="bg-emerald-500"
            />
            <FeatureCard 
              icon={Bug}
              title="Disease Detection"
              description="Upload a photo of your crop to identify diseases and get treatment recommendations."
              link="/diseases"
              color="bg-orange-500"
            />
            <FeatureCard 
              icon={TrendingUp}
              title="Market Intelligence"
              description="Stay updated with real-time market prices and demand trends in your nearby mandis."
              link="/market"
              color="bg-purple-500"
            />
            <FeatureCard 
              icon={BookOpen}
              title="Govt Schemes"
              description="Discover and apply for agricultural subsidies and insurance programs easily."
              link="/schemes"
              color="bg-red-500"
            />
            <FeatureCard 
              icon={BarChart3}
              title="What-If Simulation"
              description="Test different farming scenarios to estimate yield and profit before you plant."
              link="/simulation"
              color="bg-indigo-500"
            />
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8">How the System Works</h2>
              <div className="space-y-8">
                {[
                  { icon: Search, title: 'Input Query', desc: 'Farmer provides details via text, voice, or image upload.' },
                  { icon: Zap, title: 'AI Analysis', desc: 'Our advanced AI engine processes the data using NLP and computer vision.' },
                  { icon: ShieldCheck, title: 'Expert Advice', desc: 'Receive personalized, scientific recommendations for your specific needs.' },
                ].map((step, i) => (
                  <div key={i} className="flex gap-6">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold">
                      {i + 1}
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-slate-900 mb-1">{step.title}</h4>
                      <p className="text-slate-600">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:w-1/2">
              <div className="relative">
                <div className="absolute -inset-4 bg-emerald-500/10 rounded-3xl blur-2xl"></div>
                <img 
                  src="https://picsum.photos/seed/agriculture/800/600" 
                  alt="Farmer using app" 
                  className="relative rounded-3xl shadow-2xl border border-slate-100"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-slate-900 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-500 rounded-full blur-[120px]"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-8">Ready to modernize your farm?</h2>
          <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto">
            Join thousands of farmers who are already using AgriSmart AI to improve their livelihoods.
          </p>
          <Link
            to="/dashboard"
            className="inline-flex items-center px-10 py-5 bg-emerald-600 text-white rounded-2xl font-bold text-xl hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-900/20"
          >
            Go to Farmer Dashboard
          </Link>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
