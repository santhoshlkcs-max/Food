
import React, { useState, useRef } from 'react';
import { gemini } from '../services/gemini';
import { Recipe, ChatMessage } from '../types';

interface AIChefProps {
  isOpen: boolean;
  onClose: () => void;
  onRecipeGenerated: (recipe: Recipe) => void;
}

const AIChef: React.FC<AIChefProps> = ({ isOpen, onClose, onRecipeGenerated }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [mode, setMode] = useState<'chat' | 'generate'>('chat');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;
    
    const userMsg = inputValue.trim();
    setInputValue('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsLoading(true);

    try {
      if (mode === 'chat') {
        const response = await gemini.chat(userMsg);
        setMessages(prev => [...prev, { role: 'model', content: response }]);
      } else {
        const recipe = await gemini.generateRecipe(userMsg);
        onRecipeGenerated(recipe);
      }
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', content: "Oops, I burnt the toast! Try again in a moment." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsLoading(true);
    setMode('generate');
    
    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64 = reader.result as string;
      try {
        const recipe = await gemini.generateRecipe("Generate a recipe based on this image.", base64);
        onRecipeGenerated(recipe);
      } catch (err) {
        alert("Could not recognize ingredients in this image.");
      } finally {
        setIsLoading(false);
      }
    };
    reader.readAsDataURL(file);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold">
              CF
            </div>
            <div>
              <h3 className="font-bold text-slate-900 leading-tight">Chef Flavor</h3>
              <p className="text-xs text-emerald-600 font-medium">Online & Ready to Cook</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-full transition-colors">
            <svg className="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex p-2 bg-slate-100 gap-1 mx-4 mt-4 rounded-lg">
          <button 
            onClick={() => setMode('chat')}
            className={`flex-1 py-1.5 text-xs font-bold rounded-md transition-all ${mode === 'chat' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500'}`}
          >
            CHAT
          </button>
          <button 
            onClick={() => setMode('generate')}
            className={`flex-1 py-1.5 text-xs font-bold rounded-md transition-all ${mode === 'generate' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500'}`}
          >
            GENERATE RECIPE
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.length === 0 && (
            <div className="text-center space-y-6 py-10">
              <div className="w-16 h-16 bg-orange-100 rounded-3xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1a1 1 0 112 0v1a1 1 0 11-2 0zM13.536 14.95a1 1 0 010-1.414l.707-.707a1 1 0 011.414 1.414l-.707.707a1 1 0 01-1.414 0zM6.464 14.95l-.707-.707a1 1 0 011.414-1.414l.707.707a1 1 0 01-1.414 1.414z" />
                </svg>
              </div>
              <h4 className="text-lg font-bold text-slate-900">How can I help you today?</h4>
              <div className="grid grid-cols-1 gap-2">
                <button 
                  onClick={() => setInputValue("Give me a quick 15-min snack idea")}
                  className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-600 hover:bg-orange-50 hover:border-orange-200 hover:text-orange-700 transition-all text-left"
                >
                  "Quick 15-min snack idea"
                </button>
                <button 
                  onClick={() => setInputValue("What goes well with salmon?")}
                  className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-600 hover:bg-orange-50 hover:border-orange-200 hover:text-orange-700 transition-all text-left"
                >
                  "What goes well with salmon?"
                </button>
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  className="p-3 bg-orange-500 text-white rounded-xl text-sm font-bold hover:bg-orange-600 transition-all flex items-center justify-center gap-2 shadow-lg shadow-orange-100"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Scan Ingredients from Photo
                </button>
              </div>
            </div>
          )}

          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed ${
                msg.role === 'user' 
                  ? 'bg-orange-500 text-white rounded-tr-none' 
                  : 'bg-slate-100 text-slate-800 rounded-tl-none'
              }`}>
                {msg.content}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-slate-100 p-4 rounded-2xl rounded-tl-none flex gap-1">
                <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" />
                <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce delay-75" />
                <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce delay-150" />
              </div>
            </div>
          )}
        </div>

        <div className="p-4 border-t border-slate-100">
          <div className="relative">
            <input 
              type="text"
              placeholder={mode === 'chat' ? "Ask the chef anything..." : "Ingredients you have (e.g. egg, spinach, feta)..."}
              className="w-full pl-4 pr-12 py-3 bg-slate-100 rounded-2xl text-sm focus:ring-2 focus:ring-orange-500 outline-none transition-all"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <button 
              onClick={handleSendMessage}
              disabled={isLoading || !inputValue.trim()}
              className="absolute right-2 top-2 p-2 bg-orange-500 text-white rounded-xl hover:bg-orange-600 disabled:bg-slate-300 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>
        </div>
        
        <input 
          type="file" 
          ref={fileInputRef} 
          className="hidden" 
          accept="image/*" 
          onChange={handleImageUpload} 
        />
      </div>
    </div>
  );
};

export default AIChef;
