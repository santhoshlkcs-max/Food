
import { Recipe } from './types';

export const CATEGORIES = ['All', 'Breakfast', 'Lunch', 'Dinner', 'Dessert', 'Snack'] as const;

export const FEATURED_RECIPES: Recipe[] = [
  {
    id: '1',
    title: 'Avocado Sourdough Toast',
    image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&q=80&w=800',
    readyInMinutes: 15,
    servings: 2,
    summary: 'A creamy, delicious start to your morning with fresh avocado and chili flakes.',
    ingredients: ['2 slices sourdough bread', '1 ripe avocado', 'Red chili flakes', 'Sea salt', 'Lemon juice', 'Poached egg (optional)'],
    instructions: ['Toast the sourdough until golden.', 'Mash avocado with lemon juice and salt.', 'Spread on toast and sprinkle with chili flakes.'],
    category: 'Breakfast',
    difficulty: 'Easy'
  },
  {
    id: '2',
    title: 'Spicy Thai Basil Chicken',
    image: 'https://images.unsplash.com/photo-1562607378-510006326075?auto=format&fit=crop&q=80&w=800',
    readyInMinutes: 25,
    servings: 3,
    summary: 'An authentic street-food classic with a kick of heat and fragrant basil.',
    ingredients: ['500g ground chicken', 'Handful of holy basil', '4 cloves garlic', '3 Thai chilies', 'Fish sauce', 'Soy sauce'],
    instructions: ['Mince garlic and chilies.', 'Stir-fry chicken until browned.', 'Add sauces and basil, toss until wilted.'],
    category: 'Lunch',
    difficulty: 'Medium'
  },
  {
    id: '3',
    title: 'Pan-Seared Salmon with Asparagus',
    image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&q=80&w=800',
    readyInMinutes: 20,
    servings: 2,
    summary: 'Healthy and elegant dinner featuring crisp-skinned salmon and tender greens.',
    ingredients: ['2 salmon fillets', '1 bunch asparagus', 'Butter', 'Garlic', 'Lemon slices', 'Dill'],
    instructions: ['Season salmon and sear skin-side down.', 'Add asparagus and garlic to the pan.', 'Finish with butter and lemon.'],
    category: 'Dinner',
    difficulty: 'Medium'
  },
  {
    id: '4',
    title: 'Berry Smoothie Bowl',
    image: 'https://images.unsplash.com/photo-1494597564530-897f5a211e15?auto=format&fit=crop&q=80&w=800',
    readyInMinutes: 10,
    servings: 1,
    summary: 'Vibrant and nutrient-packed bowl topped with granola and fresh fruits.',
    ingredients: ['1 cup frozen mixed berries', '1 banana', 'Greek yogurt', 'Honey', 'Granola', 'Chia seeds'],
    instructions: ['Blend berries, banana, and yogurt until thick.', 'Pour into a bowl.', 'Top with granola, seeds, and extra fruit.'],
    category: 'Snack',
    difficulty: 'Easy'
  },
  {
    id: '5',
    title: 'Dark Chocolate Lava Cake',
    image: 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?auto=format&fit=crop&q=80&w=800',
    readyInMinutes: 30,
    servings: 2,
    summary: 'Rich, gooey chocolate center that flows out when cut. The ultimate dessert.',
    ingredients: ['100g dark chocolate', '50g butter', '2 eggs', '50g sugar', '2 tbsp flour'],
    instructions: ['Melt chocolate and butter.', 'Whisk eggs and sugar.', 'Fold in chocolate and flour.', 'Bake at 200°C for 12 minutes.'],
    category: 'Dessert',
    difficulty: 'Hard'
  },
  {
    id: '6',
    title: 'Mediterranean Quinoa Salad',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=800',
    readyInMinutes: 20,
    servings: 4,
    summary: 'Refreshing mix of veggies, feta, and quinoa with a zesty lemon dressing.',
    ingredients: ['1 cup quinoa', 'Cucumber', 'Cherry tomatoes', 'Feta cheese', 'Kalamata olives', 'Olive oil'],
    instructions: ['Cook quinoa and let cool.', 'Chop veggies and mix with quinoa.', 'Crumble feta on top and drizzle with oil.'],
    category: 'Lunch',
    difficulty: 'Easy'
  }
];
