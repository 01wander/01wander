import { Clock, Users, ChefHat } from 'lucide-react';
import { Recipe } from '../types';
import { useNavigate } from 'react-router-dom';

interface RecipeCardProps {
  recipe: Recipe;
}

const difficultyConfig = {
  easy: { label: '新手入门', color: 'bg-green-100 text-green-700' },
  medium: { label: '进阶厨艺', color: 'bg-yellow-100 text-yellow-700' },
  hard: { label: '大厨挑战', color: 'bg-red-100 text-red-700' },
};

const cuisineLabels: Record<string, string> = {
  chinese: '中餐',
  western: '西餐',
  japanese: '日料',
  korean: '韩式',
  thai: '泰式',
  italian: '意式',
  french: '法式',
  indian: '印度',
};

export const RecipeCard = ({ recipe }: RecipeCardProps) => {
  const navigate = useNavigate();
  const difficulty = difficultyConfig[recipe.difficulty];

  return (
    <div
      onClick={() => navigate(`/recipes/${recipe._id}`)}
      className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
    >
      <div className="relative aspect-video overflow-hidden">
        <img
          src={recipe.images[0]}
          alt={recipe.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${difficulty.color}`}>
            {difficulty.label}
          </span>
        </div>
        <div className="absolute top-3 right-3">
          <span className="px-3 py-1 rounded-full text-sm font-medium bg-white/90 text-gray-700">
            {cuisineLabels[recipe.cuisine] || recipe.cuisine}
          </span>
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-800 group-hover:text-orange-500 transition-colors">
          {recipe.name}
          <span className="text-sm font-normal text-gray-400 ml-2">{recipe.nameEn}</span>
        </h3>
        <p className="text-gray-500 text-sm mt-1 line-clamp-2">{recipe.description}</p>
        <div className="flex items-center gap-4 mt-3 text-sm text-gray-400">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{recipe.cookTime}分钟</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span>{recipe.servings}人份</span>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mt-3">
          {recipe.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 bg-orange-50 text-orange-600 text-xs rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
