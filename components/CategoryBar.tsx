
import React from 'react';
import { CATEGORIES } from '../constants';

interface CategoryBarProps {
  activeCategory: string;
  onSelectCategory: (category: string) => void;
}

const CategoryBar: React.FC<CategoryBarProps> = ({ activeCategory, onSelectCategory }) => {
  return (
    <div className="flex gap-2 overflow-x-auto pb-4 no-scrollbar">
      {CATEGORIES.map((category) => (
        <button
          key={category}
          onClick={() => onSelectCategory(category)}
          className={`px-6 py-2 rounded-full whitespace-nowrap font-medium text-sm transition-all ${
            activeCategory === category
              ? 'bg-orange-500 text-white shadow-lg shadow-orange-200'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryBar;
