import React, { useState } from 'react';
import { BarChart3, Zap, Droplets, TrendingUp, Loader2, ChevronRight, Info, AlertTriangle, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { agriAssistant } from '../services/geminiService';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const Simulation = () => {
  const [scenario, setScenario] = useState('');
  const [result, setResult] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSimulate = async () => {
    if (!scenario.trim()) return;
    setIsLoading(true);
    try {
      const data = await agriAssistant.simulateScenario(scenario);
      setResult(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const exampleScenarios = [
    "If I grow Rice instead of Wheat in Punjab",
    "If I use Organic fertilizer instead of Chemical",
    "If I switch to Drip Irrigation for my Potato crop",
    "If I sell my crop in June instead of April"
  ];

  const chartData = result ? [
    { name: 'Yield', value: 85, color: '#10b981' },
    { name: 'Profit', value: 70, color: '#3b82f6' },
    { name: 'Water', value: 40, color: '#f59e0b' },
    { name: 'Risk', value: 20, color: '#ef4444' },
  ] : [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-3xl mx-auto text-center mb-16">
        <h1 className="text-3xl font-bold text-slate-900 mb-4">What-If Farming Simulation</h1>
        <p className="text-slate-600">Test your farming decisions in a virtual environment. Our AI estimates the outcomes of different choices before you implement them on your field.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Input Section */}
        <div className="space-y-8">
          <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm">
            <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <Zap className="text-emerald-600" /> Define Your Scenario
            </h3>
            <div className="space-y-4">
              <textarea
                value={scenario}
                onChange={(e) => setScenario(e.target.value)}
                placeholder="Describe your scenario (e.g., If I grow rice instead of wheat...)"
                className="w-full h-40 p-6 bg-slate-50 border-none rounded-3xl focus:ring-2 focus:ring-emerald-500 text-slate-800 placeholder:text-slate-400 resize-none"
              />
              <div className="flex flex-wrap gap-2">
                {exampleScenarios.map((ex, i) => (
                  <button
                    key={i}
                    onClick={() => setScenario(ex)}
                    className="text-xs px-3 py-2 bg-slate-50 text-slate-600 rounded-full border border-slate-100 hover:bg-emerald-50 hover:text-emerald-700 transition-all"
                  >
                    {ex}
                  </button>
                ))}
              </div>
              <button
                onClick={handleSimulate}
                disabled={isLoading || !scenario.trim()}
                className="w-full py-5 bg-emerald-600 text-white rounded-3xl font-bold text-lg hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-200 flex items-center justify-center gap-3 disabled:opacity-50"
              >
                {isLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : <BarChart3 className="w-6 h-6" />}
                Run Simulation
              </button>
            </div>
          </div>

          <div className="bg-blue-50 p-8 rounded-[40px] border border-blue-100">
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                <Info className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h4 className="font-bold text-blue-900 mb-2">How it works</h4>
                <p className="text-sm text-blue-800 leading-relaxed">
                  Our simulation engine uses historical data, current market trends, and regional agricultural models to predict outcomes. While highly accurate, these are estimates and should be used as a guide alongside local expert advice.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="relative">
          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="bg-white p-12 rounded-[40px] border border-slate-100 shadow-sm h-full flex flex-col items-center justify-center text-center"
              >
                <div className="relative mb-8">
                  <div className="w-24 h-24 border-4 border-emerald-100 rounded-full"></div>
                  <div className="absolute inset-0 w-24 h-24 border-4 border-emerald-600 rounded-full border-t-transparent animate-spin"></div>
                  <BarChart3 className="absolute inset-0 m-auto w-10 h-10 text-emerald-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Processing Simulation</h3>
                <p className="text-slate-500">Calculating yields, profits, and resource requirements for your scenario...</p>
              </motion.div>
            ) : result ? (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm space-y-8"
              >
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-6 bg-emerald-50 rounded-3xl border border-emerald-100">
                    <div className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider mb-1">Expected Yield</div>
                    <div className="text-xl font-bold text-emerald-900">{result.yield}</div>
                  </div>
                  <div className="p-6 bg-blue-50 rounded-3xl border border-blue-100">
                    <div className="text-[10px] font-bold text-blue-600 uppercase tracking-wider mb-1">Estimated Profit</div>
                    <div className="text-xl font-bold text-blue-900">{result.profit}</div>
                  </div>
                </div>

                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} layout="vertical" margin={{ left: -20 }}>
                      <XAxis type="number" hide />
                      <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontWeight: 'bold', fontSize: 12 }} />
                      <Tooltip cursor={{ fill: 'transparent' }} />
                      <Bar dataKey="value" radius={[0, 10, 10, 0]} barSize={30}>
                        {chartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">Resource Requirements</h4>
                    <div className="flex flex-wrap gap-2">
                      {result.resources.map((res: string, i: number) => (
                        <span key={i} className="px-4 py-2 bg-slate-50 text-slate-700 rounded-xl text-xs font-medium border border-slate-100">
                          {res}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="p-6 bg-orange-50 rounded-3xl border border-orange-100">
                    <h4 className="text-sm font-bold text-orange-700 uppercase tracking-wider mb-2 flex items-center gap-2">
                      <TrendingUp className="w-4 h-4" /> Comparison Analysis
                    </h4>
                    <p className="text-orange-900 text-sm leading-relaxed">{result.comparison}</p>
                  </div>
                </div>

                <button 
                  onClick={() => setResult(null)}
                  className="w-full py-4 border-2 border-slate-100 rounded-2xl font-bold text-slate-600 hover:bg-slate-50 transition-all"
                >
                  Reset Simulation
                </button>
              </motion.div>
            ) : (
              <div className="bg-white p-12 rounded-[40px] border border-slate-100 shadow-sm h-full flex flex-col items-center justify-center text-center">
                <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mb-8">
                  <BarChart3 className="w-12 h-12 text-slate-200" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">No Simulation Data</h3>
                <p className="text-slate-500 max-w-sm">Describe a farming scenario on the left to see predicted outcomes and comparisons.</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Simulation;
