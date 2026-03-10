import React, { useState, useEffect } from 'react';
import { TrendingUp, ArrowUpRight, ArrowDownRight, Search, MapPin, Calendar, Filter, Download, BarChart3 } from 'lucide-react';
import { motion } from 'motion/react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, LineChart, Line } from 'recharts';

const MarketIntelligence = () => {
  const [prices, setPrices] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    fetch('/api/market-prices').then(res => res.json()).then(setPrices);
  }, []);

  const filteredPrices = prices.filter(p => 
    (p.crop_name.toLowerCase().includes(search.toLowerCase()) || p.market.toLowerCase().includes(search.toLowerCase())) &&
    (filter === 'All' || p.crop_name === filter)
  );

  const chartData = [
    { name: 'Jan', Wheat: 2100, Rice: 2500, Corn: 1800 },
    { name: 'Feb', Wheat: 2250, Rice: 2450, Corn: 1900 },
    { name: 'Mar', Wheat: 2300, Rice: 2600, Corn: 2000 },
    { name: 'Apr', Wheat: 2150, Rice: 2700, Corn: 2100 },
    { name: 'May', Wheat: 2400, Rice: 2650, Corn: 2050 },
    { name: 'Jun', Wheat: 2500, Rice: 2800, Corn: 2200 },
  ];

  const crops = Array.from(new Set(prices.map(p => p.crop_name)));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Market Price Intelligence</h1>
          <p className="text-slate-600">Real-time crop prices and market trends from nearby mandis.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-600 flex items-center gap-2 hover:bg-slate-50 transition-all">
            <Download className="w-4 h-4" /> Export Data
          </button>
          <button className="px-4 py-2 bg-emerald-600 text-white rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200">
            <TrendingUp className="w-4 h-4" /> Price Alerts
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {[
          { label: 'Highest Price Today', value: '₹2,800/q', crop: 'Rice', trend: '+4.2%', up: true },
          { label: 'Lowest Price Today', value: '₹1,550/q', crop: 'Corn', trend: '-1.5%', up: false },
          { label: 'Market Sentiment', value: 'Bullish', crop: 'Wheat', trend: 'Strong Demand', up: true },
        ].map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100"
          >
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">{stat.label}</div>
            <div className="flex items-end justify-between">
              <div>
                <div className="text-3xl font-bold text-slate-900 mb-1">{stat.value}</div>
                <div className="text-sm font-medium text-slate-600">{stat.crop}</div>
              </div>
              <div className={`flex items-center gap-1 text-sm font-bold ${stat.up ? 'text-emerald-600' : 'text-red-600'}`}>
                {stat.up ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                {stat.trend}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <div className="lg:col-span-2 bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold text-slate-900">Price Trends (Last 6 Months)</h3>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                <span className="text-xs text-slate-500">Wheat</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-xs text-slate-500">Rice</span>
              </div>
            </div>
          </div>
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  itemStyle={{ fontSize: '12px', fontWeight: 'bold' }}
                />
                <Line type="monotone" dataKey="Wheat" stroke="#10b981" strokeWidth={4} dot={{ r: 4, fill: '#10b981', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 6 }} />
                <Line type="monotone" dataKey="Rice" stroke="#3b82f6" strokeWidth={4} dot={{ r: 4, fill: '#3b82f6', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm">
          <h3 className="text-xl font-bold text-slate-900 mb-8">Market Demand</h3>
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData.slice(-1)}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" hide />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="Wheat" fill="#10b981" radius={[10, 10, 0, 0]} />
                <Bar dataKey="Rice" fill="#3b82f6" radius={[10, 10, 0, 0]} />
                <Bar dataKey="Corn" fill="#f59e0b" radius={[10, 10, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 text-center text-sm text-slate-500">
            Current demand levels for major crops
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h3 className="text-xl font-bold text-slate-900">Nearby Market Prices</h3>
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search crop or market..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 pr-4 py-2 bg-slate-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 w-64"
              />
            </div>
            <select 
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-4 py-2 bg-slate-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-emerald-500"
            >
              <option value="All">All Crops</option>
              {crops.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-slate-500 text-xs font-bold uppercase tracking-wider">
              <tr>
                <th className="px-8 py-4">Crop Name</th>
                <th className="px-8 py-4">Market (Mandi)</th>
                <th className="px-8 py-4">Price (per Quintal)</th>
                <th className="px-8 py-4">Date</th>
                <th className="px-8 py-4">Trend</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredPrices.map((item, i) => (
                <tr key={i} className="hover:bg-slate-50 transition-colors">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-emerald-50 rounded-lg flex items-center justify-center">
                        <BarChart3 className="w-4 h-4 text-emerald-600" />
                      </div>
                      <span className="font-bold text-slate-900">{item.crop_name}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-1 text-slate-600">
                      <MapPin className="w-3 h-3" /> {item.market}
                    </div>
                  </td>
                  <td className="px-8 py-6 font-bold text-slate-900">₹{item.price}</td>
                  <td className="px-8 py-6 text-slate-500 text-sm">{item.date}</td>
                  <td className="px-8 py-6">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${
                      i % 3 === 0 ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {i % 3 === 0 ? <ArrowUpRight className="w-3 h-3 mr-1" /> : <ArrowDownRight className="w-3 h-3 mr-1" />}
                      {i % 3 === 0 ? '+2.5%' : '-1.2%'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MarketIntelligence;
