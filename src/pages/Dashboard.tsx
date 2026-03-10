import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  CloudSun, 
  TrendingUp, 
  Sprout, 
  Bug, 
  BookOpen, 
  MessageSquare,
  ArrowUpRight,
  ArrowDownRight,
  MapPin,
  Calendar,
  Thermometer,
  Droplets,
  Wind
} from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

const Widget = ({ title, icon: Icon, children, link, color }: any) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col h-full"
  >
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-xl ${color} bg-opacity-10`}>
          <Icon className={`w-5 h-5 ${color.replace('bg-', 'text-')}`} />
        </div>
        <h3 className="font-bold text-slate-800">{title}</h3>
      </div>
      {link && (
        <Link to={link} className="text-xs font-semibold text-emerald-600 hover:underline">
          View All
        </Link>
      )}
    </div>
    <div className="flex-grow">
      {children}
    </div>
  </motion.div>
);

const Dashboard = () => {
  const [prices, setPrices] = useState<any[]>([]);
  const [schemes, setSchemes] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/market-prices').then(res => res.json()).then(setPrices);
    fetch('/api/schemes').then(res => res.json()).then(setSchemes);
  }, []);

  const weatherData = {
    temp: 28,
    condition: 'Partly Cloudy',
    humidity: 65,
    wind: 12,
    location: 'Ludhiana, Punjab',
    forecast: [
      { day: 'Mon', temp: 28 },
      { day: 'Tue', temp: 30 },
      { day: 'Wed', temp: 29 },
      { day: 'Thu', temp: 27 },
      { day: 'Fri', temp: 26 },
    ]
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Farmer Dashboard</h1>
        <p className="text-slate-500">Welcome back, Farmer. Here's what's happening today.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Weather Widget */}
        <Widget title="Weather Forecast" icon={CloudSun} color="bg-blue-500">
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="text-4xl font-bold text-slate-900">{weatherData.temp}°C</div>
              <div className="text-slate-500 text-sm">{weatherData.condition}</div>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-1 text-slate-600 text-sm justify-end">
                <MapPin className="w-3 h-3" /> {weatherData.location}
              </div>
              <div className="text-slate-400 text-xs">Updated 5m ago</div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2 mb-6">
            <div className="bg-slate-50 p-2 rounded-xl text-center">
              <Droplets className="w-4 h-4 mx-auto text-blue-500 mb-1" />
              <div className="text-xs font-bold">{weatherData.humidity}%</div>
              <div className="text-[10px] text-slate-400 uppercase">Humidity</div>
            </div>
            <div className="bg-slate-50 p-2 rounded-xl text-center">
              <Wind className="w-4 h-4 mx-auto text-slate-500 mb-1" />
              <div className="text-xs font-bold">{weatherData.wind}km/h</div>
              <div className="text-[10px] text-slate-400 uppercase">Wind</div>
            </div>
            <div className="bg-slate-50 p-2 rounded-xl text-center">
              <Thermometer className="w-4 h-4 mx-auto text-orange-500 mb-1" />
              <div className="text-xs font-bold">High</div>
              <div className="text-[10px] text-slate-400 uppercase">32°C</div>
            </div>
          </div>
          <div className="h-24">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={weatherData.forecast}>
                <defs>
                  <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <Area type="monotone" dataKey="temp" stroke="#3b82f6" fillOpacity={1} fill="url(#colorTemp)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Widget>

        {/* Market Prices Widget */}
        <Widget title="Market Prices" icon={TrendingUp} color="bg-emerald-500" link="/market">
          <div className="space-y-4">
            {prices.slice(0, 4).map((item, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-slate-50 rounded-2xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
                    <Sprout className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-800 text-sm">{item.crop_name}</div>
                    <div className="text-[10px] text-slate-400 uppercase">{item.market}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-slate-900 text-sm">₹{item.price}/q</div>
                  <div className="flex items-center gap-1 text-[10px] text-emerald-600 font-bold justify-end">
                    <ArrowUpRight className="w-3 h-3" /> +2.4%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Widget>

        {/* AI Assistant Widget */}
        <Widget title="Ask AI Assistant" icon={MessageSquare} color="bg-indigo-500" link="/assistant">
          <div className="bg-indigo-50 p-4 rounded-2xl mb-4">
            <p className="text-sm text-indigo-900 leading-relaxed italic">
              "Which crop should I grow this season in Ludhiana for maximum profit?"
            </p>
          </div>
          <div className="space-y-2">
            <div className="text-xs font-bold text-slate-400 uppercase mb-2">Suggested Questions</div>
            {['Best fertilizer for Wheat?', 'How to control pests?', 'Rice vs Corn profit?'].map((q, i) => (
              <button key={i} className="w-full text-left p-2 text-xs text-slate-600 hover:bg-slate-100 rounded-lg transition-colors border border-slate-100">
                {q}
              </button>
            ))}
          </div>
          <Link to="/assistant" className="mt-4 block w-full py-3 bg-indigo-600 text-white text-center rounded-xl font-bold text-sm hover:bg-indigo-700 transition-all">
            Start New Chat
          </Link>
        </Widget>

        {/* Crop Recommendation Tool */}
        <Widget title="Crop Recommendation" icon={Sprout} color="bg-green-500" link="/crops">
          <div className="flex items-center gap-4 mb-4">
            <div className="flex-grow h-2 bg-slate-100 rounded-full overflow-hidden">
              <div className="w-3/4 h-full bg-green-500"></div>
            </div>
            <span className="text-xs font-bold text-slate-500">75% Complete</span>
          </div>
          <p className="text-sm text-slate-600 mb-6">
            Based on your soil profile, we recommend growing <strong>Basmati Rice</strong> this season.
          </p>
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 border border-slate-100 rounded-2xl text-center">
              <div className="text-xs text-slate-400 mb-1">Estimated Yield</div>
              <div className="font-bold text-slate-800">25-30 q/acre</div>
            </div>
            <div className="p-3 border border-slate-100 rounded-2xl text-center">
              <div className="text-xs text-slate-400 mb-1">Market Demand</div>
              <div className="font-bold text-emerald-600">High</div>
            </div>
          </div>
        </Widget>

        {/* Disease Detection Tool */}
        <Widget title="Disease Detection" icon={Bug} color="bg-orange-500" link="/diseases">
          <div className="border-2 border-dashed border-slate-200 rounded-3xl p-8 text-center hover:border-orange-300 transition-colors cursor-pointer group">
            <div className="w-12 h-12 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <Bug className="w-6 h-6 text-orange-500" />
            </div>
            <div className="text-sm font-bold text-slate-800 mb-1">Upload Leaf Photo</div>
            <div className="text-xs text-slate-400">Identify pests & diseases instantly</div>
          </div>
        </Widget>

        {/* Government Schemes Widget */}
        <Widget title="Govt Schemes" icon={BookOpen} color="bg-red-500" link="/schemes">
          <div className="space-y-4">
            {schemes.slice(0, 2).map((scheme, i) => (
              <div key={i} className="p-4 bg-red-50 rounded-2xl border border-red-100">
                <div className="font-bold text-red-900 text-sm mb-1">{scheme.title}</div>
                <p className="text-xs text-red-700 line-clamp-2 mb-3">
                  {scheme.description}
                </p>
                <a href={scheme.link} target="_blank" className="text-[10px] font-bold text-red-900 uppercase tracking-wider hover:underline">
                  Learn More →
                </a>
              </div>
            ))}
          </div>
        </Widget>
      </div>
    </div>
  );
};

export default Dashboard;
