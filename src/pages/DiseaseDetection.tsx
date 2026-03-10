import React, { useState, useRef } from 'react';
import { Bug, Upload, Loader2, CheckCircle2, AlertCircle, RefreshCcw, Camera } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { agriAssistant } from '../services/geminiService';

const DiseaseDetection = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [result, setResult] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        setResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeImage = async () => {
    if (!selectedImage) return;
    setIsLoading(true);
    try {
      const base64 = selectedImage.split(',')[1];
      const data = await agriAssistant.detectDisease(base64);
      setResult(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-3xl font-bold text-slate-900 mb-4">Crop Disease Detection</h1>
        <p className="text-slate-600">Upload a photo of your crop leaf to identify diseases instantly and get expert treatment advice.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Upload Section */}
        <div className="space-y-6">
          <div 
            onClick={() => fileInputRef.current?.click()}
            className={`relative border-4 border-dashed rounded-[40px] p-12 text-center transition-all cursor-pointer group overflow-hidden h-[400px] flex flex-col items-center justify-center ${
              selectedImage ? 'border-emerald-500 bg-emerald-50/30' : 'border-slate-200 hover:border-emerald-400 hover:bg-slate-50'
            }`}
          >
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleImageUpload} 
              accept="image/*" 
              className="hidden" 
            />
            
            {selectedImage ? (
              <img src={selectedImage} alt="Preview" className="absolute inset-0 w-full h-full object-cover" />
            ) : (
              <>
                <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Camera className="w-10 h-10 text-emerald-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Click to Upload or Drag & Drop</h3>
                <p className="text-slate-500 text-sm">Supports JPG, PNG (Max 5MB)</p>
              </>
            )}
            
            {selectedImage && (
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="text-white font-bold flex items-center gap-2">
                  <RefreshCcw className="w-5 h-5" /> Change Photo
                </div>
              </div>
            )}
          </div>

          <button
            onClick={analyzeImage}
            disabled={!selectedImage || isLoading}
            className="w-full py-5 bg-emerald-600 text-white rounded-3xl font-bold text-lg hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-200 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : <Bug className="w-6 h-6" />}
            {isLoading ? 'Analyzing Image...' : 'Detect Disease'}
          </button>
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
                  <Bug className="absolute inset-0 m-auto w-10 h-10 text-emerald-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Scanning for Diseases</h3>
                <p className="text-slate-500">Our AI is analyzing leaf patterns and identifying potential issues...</p>
              </motion.div>
            ) : result ? (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm space-y-8"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-orange-100 rounded-2xl flex items-center justify-center">
                      <AlertCircle className="w-8 h-8 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-slate-900">{result.diseaseName}</h3>
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-24 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-emerald-500" style={{ width: `${result.confidence * 100}%` }}></div>
                        </div>
                        <span className="text-xs font-bold text-emerald-600">{(result.confidence * 100).toFixed(0)}% Confidence</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6">
                  <div className="p-6 bg-slate-50 rounded-3xl">
                    <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">Cause</h4>
                    <p className="text-slate-700 leading-relaxed">{result.cause}</p>
                  </div>
                  <div className="p-6 bg-emerald-50 rounded-3xl border border-emerald-100">
                    <h4 className="text-sm font-bold text-emerald-700 uppercase tracking-wider mb-3">Recommended Treatment</h4>
                    <p className="text-emerald-900 leading-relaxed">{result.treatment}</p>
                  </div>
                  <div className="p-6 bg-blue-50 rounded-3xl border border-blue-100">
                    <h4 className="text-sm font-bold text-blue-700 uppercase tracking-wider mb-3">Prevention Measures</h4>
                    <p className="text-blue-900 leading-relaxed">{result.prevention}</p>
                  </div>
                </div>

                <button 
                  onClick={() => { setSelectedImage(null); setResult(null); }}
                  className="w-full py-4 border-2 border-slate-100 rounded-2xl font-bold text-slate-600 hover:bg-slate-50 transition-all"
                >
                  Start New Scan
                </button>
              </motion.div>
            ) : (
              <div className="bg-white p-12 rounded-[40px] border border-slate-100 shadow-sm h-full flex flex-col items-center justify-center text-center">
                <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mb-8">
                  <Bug className="w-12 h-12 text-slate-200" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">No Analysis Yet</h3>
                <p className="text-slate-500 max-w-sm">Upload a clear photo of the affected crop leaf to begin the AI diagnostic process.</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default DiseaseDetection;
