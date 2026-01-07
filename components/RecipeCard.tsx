
import React from 'react';
import { Recipe } from '../types';

interface RecipeCardProps {
  recipe: Recipe;
  onClick: () => void;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, onClick }) => {
  const getDifficultyColor = (level: string) => {
    switch (level) {
      case 'Easy': return 'text-emerald-600 bg-emerald-50';
      case 'Medium': return 'text-orange-600 bg-orange-50';
      case 'Hard': return 'text-rose-600 bg-rose-50';
      default: return 'text-slate-600 bg-slate-50';
    }
  };

  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-2xl border border-slate-200 overflow-hidden cursor-pointer hover:shadow-xl hover:shadow-slate-200 transition-all group"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img 
          src={recipe.image} 
          alt={recipe.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-3 left-3 flex gap-2">
          <span className="px-2.5 py-1 bg-white/90 backdrop-blur text-[10px] font-bold uppercase tracking-wider rounded-md text-slate-900 shadow-sm">
            {recipe.category}
          </span>
        </div>
      </div>
      <div className="p-5">
        <div className="flex items-center justify-between mb-2">
          <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${getDifficultyColor(recipe.difficulty)}`}>
            {recipe.difficulty}
          </span>
          <div className="flex items-center gap-1 text-slate-500 text-xs font-medium">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {recipe.readyInMinutes}m
          </div>
        </div>
        <h3 className="text-lg font-bold text-slate-900 group-hover:text-orange-600 transition-colors line-clamp-1">
          {recipe.title}
        </h3>
        <p className="mt-2 text-slate-500 text-sm line-clamp-2 leading-relaxed">
          {recipe.summary}
        </p>
      </div>
    </div>
  );
};

export default RecipeCard;
