
import React from 'react';
import { Recipe } from '../types';

interface RecipeModalProps {
  recipe: Recipe;
  onClose: () => void;
}

const RecipeModal: React.FC<RecipeModalProps> = ({ recipe, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-white w-full max-w-4xl max-h-[90vh] rounded-3xl overflow-hidden flex flex-col shadow-2xl animate-in fade-in zoom-in duration-300">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-white/20 hover:bg-white/40 backdrop-blur rounded-full text-white transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="overflow-y-auto flex-1">
          <div className="h-64 sm:h-96 relative">
            <img src={recipe.image} alt={recipe.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
          </div>

          <div className="p-8 -mt-20 relative">
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-100">
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <span className="px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-xs font-bold uppercase">
                  {recipe.category}
                </span>
                <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-bold uppercase">
                  {recipe.difficulty}
                </span>
                <div className="flex items-center gap-1 text-slate-500 text-sm">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {recipe.readyInMinutes} mins
                </div>
                <div className="flex items-center gap-1 text-slate-500 text-sm">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  Serves {recipe.servings}
                </div>
              </div>

              <h2 className="text-3xl font-extrabold text-slate-900 mb-4">{recipe.title}</h2>
              <p className="text-slate-600 text-lg leading-relaxed mb-8">{recipe.summary}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div>
                  <h4 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <span className="w-8 h-8 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-sm">01</span>
                    Ingredients
                  </h4>
                  <ul className="space-y-3">
                    {recipe.ingredients.map((ing, i) => (
                      <li key={i} className="flex items-center gap-3 text-slate-700">
                        <div className="w-1.5 h-1.5 rounded-full bg-orange-400" />
                        {ing}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <span className="w-8 h-8 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-sm">02</span>
                    Instructions
                  </h4>
                  <div className="space-y-6">
                    {recipe.instructions.map((step, i) => (
                      <div key={i} className="flex gap-4">
                        <span className="font-bold text-slate-300 text-2xl leading-none">{i + 1}</span>
                        <p className="text-slate-700 leading-relaxed">{step}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeModal;
