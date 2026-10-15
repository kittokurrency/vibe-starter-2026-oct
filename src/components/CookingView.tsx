import React, { useState } from 'react';
import { Clock, Star, Bookmark, ChefHat } from 'lucide-react';

interface Recipe {
  id: string;
  title: string;
  author: string;
  time: string;
  rating: number;
  reviewsCount: number;
  description: string;
  image: string;
  ingredients: string[];
  tags: string[];
}

const RECIPES: Recipe[] = [
  {
    id: 'r1',
    title: 'Crispy Sheet-Pan Lemon Herb Chicken With Roasted Fennel',
    author: 'Melissa Clark',
    time: '45 minutes',
    rating: 4.8,
    reviewsCount: 1420,
    description: 'Tender chicken thighs roast atop a bed of caramelized fennel wedges, sweet shallots, and fragrant oregano.',
    image: 'https://www.gstatic.com/labs-code/stitch/stitch-placeholder-300x300.svg',
    ingredients: [
      '2 lbs bone-in, skin-on chicken thighs',
      '2 large fennel bulbs, cut into wedges',
      '3 large shallots, peeled and quartered',
      '2 tbsp extra-virgin olive oil',
      '1 organic lemon, thinly sliced',
      '4 sprigs fresh oregano and rosemary'
    ],
    tags: ['Dinner', 'Sheet Pan', 'Chicken']
  },
  {
    id: 'r2',
    title: 'Classic Creamy Bucatini Cacio e Pepe',
    author: 'Ali Slagle',
    time: '20 minutes',
    rating: 4.9,
    reviewsCount: 3890,
    description: 'A minimalist Roman classic relying solely on freshly cracked Tellicherry black pepper, Pecorino Romano, and pasta cooking water.',
    image: 'https://www.gstatic.com/labs-code/stitch/stitch-placeholder-300x300.svg',
    ingredients: [
      '1 lb bucatini or spaghetti',
      '2 tbsp whole black peppercorns, coarsely crushed',
      '1 1/2 cups finely grated Pecorino Romano cheese',
      'Kosher salt to taste'
    ],
    tags: ['Pasta', 'Quick', 'Vegetarian']
  },
  {
    id: 'r3',
    title: 'Brown Butter Chocolate Chunk Skillet Cookie',
    author: 'Yewande Komolafe',
    time: '35 minutes',
    rating: 4.9,
    reviewsCount: 2105,
    description: 'Nutty brown butter meets pools of molten bittersweet chocolate and Maldon sea salt in a cast-iron skillet.',
    image: 'https://www.gstatic.com/labs-code/stitch/stitch-placeholder-300x300.svg',
    ingredients: [
      '1 cup unsalted butter, browned and cooled',
      '1 cup dark brown sugar',
      '1/2 cup granulated sugar',
      '2 large eggs at room temperature',
      '8 oz bittersweet chocolate chunks',
      'Flaky sea salt for finishing'
    ],
    tags: ['Dessert', 'Baking', 'Comfort']
  }
];

export const CookingView: React.FC = () => {
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [savedRecipes, setSavedRecipes] = useState<Set<string>>(new Set());

  const toggleSave = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSavedRecipes(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="max-w-[1280px] mx-auto px-4 py-6">
      {/* Header */}
      <div className="border-b-2 border-[#121212] pb-4 mb-6">
        <span className="text-[11px] font-bold uppercase tracking-widest text-[#326891]">
          NYT Cooking
        </span>
        <h2 className="font-headline font-black text-3xl text-[#121212]">
          Recipes, Guides & What to Cook Tonight
        </h2>
        <p className="font-summary text-sm text-[#555]">
          Curated culinary inspiration tested in The New York Times kitchen.
        </p>
      </div>

      {/* Grid of Recipes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {RECIPES.map((recipe) => (
          <div
            key={recipe.id}
            onClick={() => setSelectedRecipe(recipe)}
            className="group cursor-pointer border border-[#ebebeb] bg-white hover:border-[#121212] transition flex flex-col"
          >
            <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
              <img
                src={recipe.image}
                alt={recipe.title}
                className="w-full h-full object-cover group-hover:scale-102 transition duration-300"
                referrerPolicy="no-referrer"
              />
              <button
                onClick={(e) => toggleSave(recipe.id, e)}
                className="absolute top-2 right-2 bg-white/90 p-1.5 rounded-full hover:bg-white text-[#121212] transition"
                title="Save Recipe"
              >
                <Bookmark className={`w-4 h-4 ${savedRecipes.has(recipe.id) ? 'fill-[#121212]' : ''}`} />
              </button>
            </div>

            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#727272] block mb-1">
                  By {recipe.author}
                </span>
                <h3 className="font-headline font-bold text-lg leading-snug group-hover:text-[#727272] transition mb-2">
                  {recipe.title}
                </h3>
                <p className="font-summary text-xs text-[#555] line-clamp-2 leading-relaxed mb-3">
                  {recipe.description}
                </p>
              </div>

              <div className="border-t border-[#ebebeb] pt-3 flex items-center justify-between text-[11px] text-[#727272]">
                <div className="flex items-center space-x-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{recipe.time}</span>
                </div>
                <div className="flex items-center space-x-1 text-[#121212] font-semibold">
                  <Star className="w-3.5 h-3.5 fill-[#ffda00] text-[#ffda00]" />
                  <span>{recipe.rating}</span>
                  <span className="text-[#727272] font-normal">({recipe.reviewsCount})</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recipe Modal */}
      {selectedRecipe && (
        <div
          className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 backdrop-blur-xs"
          onClick={() => setSelectedRecipe(null)}
        >
          <div
            className="bg-white max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl rounded-sm"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-[#ebebeb] pb-3 mb-4">
              <span className="text-[10.5px] uppercase font-bold tracking-widest text-[#326891]">
                NYT Cooking Recipe Card
              </span>
              <button
                onClick={() => setSelectedRecipe(null)}
                className="text-sm font-bold text-[#727272] hover:text-[#121212]"
              >
                ✕ Close
              </button>
            </div>

            <h3 className="font-headline font-black text-2xl text-[#121212] mb-1">
              {selectedRecipe.title}
            </h3>
            <span className="text-xs text-[#727272] block mb-4">
              Recipe by {selectedRecipe.author} • {selectedRecipe.time}
            </span>

            <p className="font-summary text-sm text-[#333] mb-5 leading-relaxed">
              {selectedRecipe.description}
            </p>

            <h4 className="text-xs font-bold uppercase tracking-wider text-[#121212] mb-3 flex items-center space-x-1.5">
              <ChefHat className="w-4 h-4" />
              <span>Ingredients</span>
            </h4>
            <ul className="space-y-2 mb-6 text-xs text-[#333] font-summary">
              {selectedRecipe.ingredients.map((ing, i) => (
                <li key={i} className="flex items-start space-x-2">
                  <span className="text-[#326891] font-bold">•</span>
                  <span>{ing}</span>
                </li>
              ))}
            </ul>

            <div className="flex justify-end pt-4 border-t border-[#ebebeb]">
              <button
                onClick={() => setSelectedRecipe(null)}
                className="bg-[#121212] text-white text-xs font-bold px-4 py-2 uppercase tracking-wider rounded-sm hover:bg-neutral-800 cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
