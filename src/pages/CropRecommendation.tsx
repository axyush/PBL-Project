import React, { useState } from 'react';
import { Sprout, MapPin, Droplets, CloudSun, Loader2, ChevronRight, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { agriAssistant } from '../services/geminiService';

const CropRecommendation = () => {
  const [formData, setFormData] = useState({
    location: '',
    soil: '',
    season: '',
    water: ''
  });
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const results = await agriAssistant.getCropRecommendation(formData);
      setRecommendations(results);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-3xl font-bold text-slate-900 mb-4">Crop Recommendation System</h1>
        <p className="text-slate-600">Enter your farm details to get personalized crop suggestions for maximum yield and profit.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Form */}
        <div className="lg:col-span-1">
          <form onSubmit={handleSubmit} className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 space-y-6 sticky top-24">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-600" /> Location
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Ludhiana, Punjab"
                className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-emerald-500"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
                <Sprout className="w-4 h-4 text-emerald-600" /> Soil Type
              </label>
              <select
                required
                className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-emerald-500"
                value={formData.soil}
                onChange={(e) => setFormData({ ...formData, soil: e.target.value })}
              >
                <option value="">Select Soil Type</option>
                <option value="Alluvial">Alluvial Soil</option>
                <option value="Black">Black Soil</option>
                <option value="Red">Red Soil</option>
                <option value="Laterite">Laterite Soil</option>
                <option value="Sandy">Sandy Soil</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
                <CloudSun className="w-4 h-4 text-emerald-600" /> Season
              </label>
              <select
                required
                className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-emerald-500"
                value={formData.season}
                onChange={(e) => setFormData({ ...formData, season: e.target.value })}
              >
                <option value="">Select Season</option>
                <option value="Kharif">Kharif (Monsoon)</option>
                <option value="Rabi">Rabi (Winter)</option>
                <option value="Zaid">Zaid (Summer)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
                <Droplets className="w-4 h-4 text-emerald-600" /> Water Availability
              </label>
              <select
                required
                className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-emerald-500"
                value={formData.water}
                onChange={(e) => setFormData({ ...formData, water: e.target.value })}
              >
                <option value="">Select Availability</option>
                <option value="High">High (Abundant)</option>
                <option value="Medium">Medium (Moderate)</option>
                <option value="Low">Low (Scarce)</option>
              </select>
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200 flex items-center justify-center gap-2"
            >
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Get Recommendations'}
            </button>
          </form>
        </div>

        {/* Results */}
        <div className="lg:col-span-2">
          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center h-64 bg-white rounded-3xl border border-slate-100"
              >
                <Loader2 className="w-12 h-12 text-emerald-600 animate-spin mb-4" />
                <p className="text-slate-500 font-medium">Analyzing your data and generating recommendations...</p>
              </motion.div>
            ) : recommendations.length > 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                {recommendations.map((rec, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl hover:shadow-emerald-500/5 transition-all"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center">
                        <Sprout className="w-6 h-6 text-emerald-600" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-slate-900">{rec.crop}</h3>
                        <div className="text-xs font-bold text-emerald-600 uppercase tracking-wider">Top Choice</div>
                      </div>
                    </div>
                    <p className="text-sm text-slate-600 mb-6 leading-relaxed">{rec.reason}</p>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                        <span className="text-xs font-bold text-slate-400 uppercase">Expected Yield</span>
                        <span className="text-sm font-bold text-slate-800">{rec.yield}</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                        <span className="text-xs font-bold text-slate-400 uppercase">Fertilizer</span>
                        <span className="text-sm font-bold text-slate-800">{rec.fertilizer}</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                        <span className="text-xs font-bold text-slate-400 uppercase">Irrigation</span>
                        <span className="text-sm font-bold text-slate-800">{rec.irrigation}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <div className="bg-white p-12 rounded-3xl border border-slate-100 text-center">
                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Sprout className="w-10 h-10 text-slate-300" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">No Recommendations Yet</h3>
                <p className="text-slate-500 max-w-sm mx-auto">Fill out the form on the left to see which crops are best suited for your farm conditions.</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default CropRecommendation;
