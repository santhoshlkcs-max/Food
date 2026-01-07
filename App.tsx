
import React, { useState, useMemo } from 'react';
import Header from './components/Header';
import RecipeCard from './components/RecipeCard';
import CategoryBar from './components/CategoryBar';
import RecipeModal from './components/RecipeModal';
import AIChef from './components/AIChef';
import { FEATURED_RECIPES } from './constants';
import { Recipe } from './types';

const App: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [isAIChefOpen, setIsAIChefOpen] = useState(false);

  const filteredRecipes = useMemo(() => {
    return FEATURED_RECIPES.filter((recipe) => {
      const matchesCategory = selectedCategory === 'All' || recipe.category === selectedCategory;
      const matchesSearch = recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          recipe.summary.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen pb-20">
      <Header 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery} 
        onAIChefOpen={() => setIsAIChefOpen(true)}
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        {/* Hero Section */}
        <div className="relative rounded-3xl overflow-hidden mb-12 h-64 sm:h-96 group">
          <img 
            src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=1200" 
            alt="Hero Food" 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-8 sm:p-12">
            <h1 className="text-3xl sm:text-5xl font-bold text-white mb-4">Discover Your Next Favorite Meal</h1>
            <p className="text-slate-200 text-lg max-w-xl">
              Explore thousands of curated recipes or let our AI Chef create something unique just for you.
            </p>
          </div>
        </div>

        <CategoryBar 
          activeCategory={selectedCategory} 
          onSelectCategory={setSelectedCategory} 
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {filteredRecipes.length > 0 ? (
            filteredRecipes.map(recipe => (
              <RecipeCard 
                key={recipe.id} 
                recipe={recipe} 
                onClick={() => setSelectedRecipe(recipe)}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-20 bg-white rounded-2xl border border-dashed border-slate-300">
              <p className="text-slate-500 text-lg">No recipes found. Try a different search or category!</p>
            </div>
          )}
        </div>
      </main>

      {/* Modals */}
      {selectedRecipe && (
        <RecipeModal 
          recipe={selectedRecipe} 
          onClose={() => setSelectedRecipe(null)} 
        />
      )}

      {/* AI Floating Button & Side Panel */}
      <AIChef 
        isOpen={isAIChefOpen} 
        onClose={() => setIsAIChefOpen(false)} 
        onRecipeGenerated={(recipe) => {
          setSelectedRecipe(recipe);
          setIsAIChefOpen(false);
        }}
      />

      <footer className="mt-20 py-12 border-t border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-slate-500 text-sm">© 2024 FlavorFind AI. Crafted with love for foodies everywhere.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
