import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  Mic, 
  Image as ImageIcon, 
  User, 
  Bot, 
  Loader2, 
  X,
  ChevronRight,
  MessageSquare,
  History
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { agriAssistant } from '../services/geminiService';
import ReactMarkdown from 'react-markdown';

const AIAssistant = () => {
  const [messages, setMessages] = useState<any[]>([
    { role: 'bot', content: 'Hello! I am your AI Agricultural Advisor. How can I help you today? You can ask me about crop selection, fertilizers, market prices, or upload a photo of your crop for disease detection.' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const messagesEndRef = useRef<null | HTMLDivElement>(null);
  const fileInputRef = useRef<null | HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() && !selectedImage) return;

    const userMessage = { role: 'user', content: input, image: selectedImage };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setSelectedImage(null);
    setIsLoading(true);

    try {
      let response;
      if (userMessage.image) {
        const base64 = userMessage.image.split(',')[1];
        const result = await agriAssistant.detectDisease(base64);
        response = `**Disease Detected:** ${result.diseaseName}\n\n**Confidence:** ${(result.confidence * 100).toFixed(1)}%\n\n**Cause:** ${result.cause}\n\n**Treatment:** ${result.treatment}\n\n**Prevention:** ${result.prevention}`;
      } else {
        response = await agriAssistant.chat(userMessage.content);
      }
      
      setMessages(prev => [...prev, { role: 'bot', content: response }]);
      
      // Save to server history
      await fetch('/api/save-query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: userMessage.content,
          response: response,
          type: userMessage.image ? 'image' : 'text'
        })
      });
    } catch (error) {
      setMessages(prev => [...prev, { role: 'bot', content: 'Sorry, I encountered an error. Please try again.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const startVoice = () => {
    setIsRecording(true);
    // Mock voice recognition
    setTimeout(() => {
      setIsRecording(false);
      setInput('Which crop is best for Punjab in winter?');
    }, 2000);
  };

  const suggestions = [
    "Which crop should I grow this season?",
    "Why are my crop leaves turning yellow?",
    "What fertilizer should I use for wheat?",
    "When should I sell my crop?"
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 h-[calc(100vh-120px)] flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <MessageSquare className="text-emerald-600" /> AI Farming Assistant
          </h1>
          <p className="text-sm text-slate-500">Expert agricultural advice at your fingertips</p>
        </div>
        <button className="p-2 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors">
          <History className="w-5 h-5" />
        </button>
      </div>

      {/* Chat Area */}
      <div className="flex-grow overflow-y-auto mb-6 space-y-6 pr-2 custom-scrollbar">
        {messages.map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex gap-3 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm ${
                msg.role === 'user' ? 'bg-emerald-600 text-white' : 'bg-white border border-slate-100 text-emerald-600'
              }`}>
                {msg.role === 'user' ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
              </div>
              <div className={`p-4 rounded-3xl shadow-sm ${
                msg.role === 'user' 
                  ? 'bg-emerald-600 text-white rounded-tr-none' 
                  : 'bg-white border border-slate-100 text-slate-800 rounded-tl-none'
              }`}>
                {msg.image && (
                  <img src={msg.image} alt="Uploaded" className="w-full max-w-xs rounded-xl mb-3 border border-white/20" />
                )}
                <div className="prose prose-sm max-w-none prose-p:leading-relaxed prose-headings:mb-2 prose-headings:mt-4 first:prose-headings:mt-0">
                  <ReactMarkdown>{msg.content}</ReactMarkdown>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="flex gap-3 max-w-[85%]">
              <div className="w-10 h-10 rounded-2xl bg-white border border-slate-100 flex items-center justify-center flex-shrink-0 shadow-sm">
                <Bot className="w-5 h-5 text-emerald-600" />
              </div>
              <div className="p-4 rounded-3xl bg-white border border-slate-100 flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin text-emerald-600" />
                <span className="text-sm text-slate-500">AI is thinking...</span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="bg-white p-4 rounded-3xl shadow-xl border border-slate-100">
        {/* Suggestions */}
        {messages.length < 3 && (
          <div className="flex gap-2 overflow-x-auto pb-4 no-scrollbar">
            {suggestions.map((s, i) => (
              <button
                key={i}
                onClick={() => setInput(s)}
                className="whitespace-nowrap px-4 py-2 bg-slate-50 border border-slate-100 rounded-full text-xs text-slate-600 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-200 transition-all"
              >
                {s}
              </button>
            ))}
          </div>
        )}

        {selectedImage && (
          <div className="relative inline-block mb-4">
            <img src={selectedImage} alt="Preview" className="w-20 h-20 object-cover rounded-xl border-2 border-emerald-500" />
            <button 
              onClick={() => setSelectedImage(null)}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-lg"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        )}

        <div className="flex items-center gap-2">
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleImageUpload} 
            accept="image/*" 
            className="hidden" 
          />
          <button 
            onClick={() => fileInputRef.current?.click()}
            className="p-3 rounded-2xl bg-slate-50 text-slate-500 hover:bg-emerald-50 hover:text-emerald-600 transition-colors"
          >
            <ImageIcon className="w-6 h-6" />
          </button>
          <button 
            onClick={startVoice}
            className={`p-3 rounded-2xl transition-colors ${isRecording ? 'bg-red-100 text-red-600 animate-pulse' : 'bg-slate-50 text-slate-500 hover:bg-emerald-50 hover:text-emerald-600'}`}
          >
            <Mic className="w-6 h-6" />
          </button>
          <div className="flex-grow relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type your question here..."
              className="w-full py-4 px-6 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-emerald-500 text-slate-800 placeholder:text-slate-400"
            />
          </div>
          <button
            onClick={handleSend}
            disabled={isLoading || (!input.trim() && !selectedImage)}
            className="p-4 bg-emerald-600 text-white rounded-2xl hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-emerald-200 transition-all"
          >
            <Send className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;
