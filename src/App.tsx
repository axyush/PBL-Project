import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  MessageSquare, 
  Sprout, 
  Bug, 
  TrendingUp, 
  BookOpen, 
  Info, 
  Menu, 
  X, 
  Home,
  User,
  Bell,
  Search,
  Mic,
  Image as ImageIcon,
  ChevronRight,
  Leaf,
  Droplets,
  CloudSun,
  ArrowUpRight,
  ArrowDownRight,
  Globe
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from './lib/utils';

// Pages
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import AIAssistant from './pages/AIAssistant';
import CropRecommendation from './pages/CropRecommendation';
import DiseaseDetection from './pages/DiseaseDetection';
import MarketIntelligence from './pages/MarketIntelligence';
import GovernmentSchemes from './pages/GovernmentSchemes';
import Simulation from './pages/Simulation';
import About from './pages/About';

const translations: any = {
  en: {
    home: 'Home',
    dashboard: 'Dashboard',
    assistant: 'AI Assistant',
    crops: 'Crops',
    diseases: 'Diseases',
    market: 'Market',
    schemes: 'Schemes',
    about: 'About',
    brand: 'AgriSmart AI'
  },
  hi: {
    home: 'होम',
    dashboard: 'डैशबोर्ड',
    assistant: 'AI सहायक',
    crops: 'फसलें',
    diseases: 'बीमारियां',
    market: 'बाजार',
    schemes: 'योजनाएं',
    about: 'हमारे बारे में',
    brand: 'एग्रीस्मार्ट AI'
  }
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const [lang, setLang] = useState('en');

  const navItems = [
    { name: translations[lang].home, path: '/', icon: Home },
    { name: translations[lang].dashboard, path: '/dashboard', icon: LayoutDashboard },
    { name: translations[lang].assistant, path: '/assistant', icon: MessageSquare },
    { name: translations[lang].crops, path: '/crops', icon: Sprout },
    { name: translations[lang].diseases, path: '/diseases', icon: Bug },
    { name: translations[lang].market, path: '/market', icon: TrendingUp },
    { name: translations[lang].schemes, path: '/schemes', icon: BookOpen },
    { name: translations[lang].about, path: '/about', icon: Info },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-emerald-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-200">
                <Leaf className="text-white w-6 h-6" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-emerald-700 to-green-600 bg-clip-text text-transparent hidden sm:block">
                {translations[lang].brand}
              </span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2",
                  location.pathname === item.path
                    ? "bg-emerald-50 text-emerald-700"
                    : "text-slate-600 hover:bg-slate-50 hover:text-emerald-600"
                )}
              >
                <item.icon className="w-4 h-4" />
                {item.name}
              </Link>
            ))}
            <button 
              onClick={() => setLang(lang === 'en' ? 'hi' : 'en')}
              className="ml-4 p-2 rounded-full bg-slate-100 text-slate-600 hover:bg-emerald-100 hover:text-emerald-700 transition-colors flex items-center gap-1 text-xs font-bold"
            >
              <Globe className="w-4 h-4" />
              {lang === 'en' ? 'HI' : 'EN'}
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-2">
            <button 
              onClick={() => setLang(lang === 'en' ? 'hi' : 'en')}
              className="p-2 rounded-full bg-slate-100 text-slate-600 text-xs font-bold"
            >
              {lang === 'en' ? 'HI' : 'EN'}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 focus:outline-none"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-emerald-100 overflow-hidden"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "block px-3 py-2 rounded-md text-base font-medium flex items-center gap-3",
                    location.pathname === item.path
                      ? "bg-emerald-50 text-emerald-700"
                      : "text-slate-600 hover:bg-slate-50 hover:text-emerald-600"
                  )}
                >
                  <item.icon className="w-5 h-5" />
                  {item.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Footer = () => (
  <footer className="bg-slate-900 text-slate-300 py-12">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="col-span-1 md:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
              <Leaf className="text-white w-5 h-5" />
            </div>
            <span className="text-xl font-bold text-white">AgriSmart AI</span>
          </div>
          <p className="text-slate-400 max-w-md">
            Empowering farmers with cutting-edge AI technology to make informed decisions, 
            increase yields, and ensure sustainable agricultural growth.
          </p>
        </div>
        <div>
          <h3 className="text-white font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/dashboard" className="hover:text-emerald-400">Farmer Dashboard</Link></li>
            <li><Link to="/assistant" className="hover:text-emerald-400">AI Assistant</Link></li>
            <li><Link to="/market" className="hover:text-emerald-400">Market Prices</Link></li>
            <li><Link to="/schemes" className="hover:text-emerald-400">Govt Schemes</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-white font-semibold mb-4">Support</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/about" className="hover:text-emerald-400">About Us</Link></li>
            <li><a href="#" className="hover:text-emerald-400">Contact Support</a></li>
            <li><a href="#" className="hover:text-emerald-400">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-emerald-400">Terms of Service</a></li>
          </ul>
        </div>
      </div>
      <div className="mt-12 pt-8 border-t border-slate-800 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} AgriSmart AI. All rights reserved.
      </div>
    </div>
  </footer>
);

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/assistant" element={<AIAssistant />} />
            <Route path="/crops" element={<CropRecommendation />} />
            <Route path="/diseases" element={<DiseaseDetection />} />
            <Route path="/market" element={<MarketIntelligence />} />
            <Route path="/schemes" element={<GovernmentSchemes />} />
            <Route path="/simulation" element={<Simulation />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
