
export interface Recipe {
  id: string;
  title: string;
  image: string;
  readyInMinutes: number;
  servings: number;
  summary: string;
  instructions: string[];
  ingredients: string[];
  category: 'Breakfast' | 'Lunch' | 'Dinner' | 'Dessert' | 'Snack';
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

export interface ChatMessage {
  role: 'user' | 'model';
  content: string;
}

export type AppView = 'home' | 'recipe-detail' | 'ai-chef';
